import bpy, math, os, json
from mathutils import Vector
root=os.getcwd(); s=bpy.context.scene
# Reuse the supplied scene; only camera, lighting and export preparation change.
cam=bpy.data.objects.get('Camera | recepcao'); s.camera=cam
cam.location=(-2.25,-5.4,3.05)
target=Vector((0,.25,1.35))
cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler()
cam.data.type='PERSP'; cam.data.lens=32
s.render.engine='CYCLES'; s.cycles.samples=32; s.cycles.use_denoising=True
s.render.resolution_x=1440; s.render.resolution_y=810; s.render.resolution_percentage=100
s.world.use_nodes=True
bg=s.world.node_tree.nodes.get('Background'); bg.inputs['Color'].default_value=(.8,.85,1,1); bg.inputs['Strength'].default_value=.22
for o in bpy.data.objects:
    if o.type=='LIGHT':
        if 'natural' in o.name: o.data.energy=850; o.data.color=(1,.87,.69); o.data.size=3
        elif 'Preenchimento' in o.name: o.data.energy=330; o.data.color=(1,.94,.82); o.data.size=4
        elif 'parede' in o.name: o.data.energy=65; o.data.size=2
s.view_settings.view_transform='AgX'; s.view_settings.exposure=-.25
for screen in bpy.data.screens:
    for a in screen.areas:
        if a.type=='VIEW_3D':
            a.spaces.active.shading.type='MATERIAL'; a.spaces.active.shading.use_scene_lights=True; a.spaces.active.shading.use_scene_world=True
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'public/assets/3D/spina-clinic-recepcao.blend'))
s.render.filepath=os.path.join(root,'work/recepcao-final-preview.png')
bpy.ops.render.render(write_still=True)
print('PREVIEW_READY',flush=True)
# Freeze generated coordinates before joining, preserving procedural material scale.
meshes=[]; glass=[]
for o in list(s.objects):
    if o.type not in {'MESH','CURVE','FONT','SURFACE'} or o.hide_render: continue
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active=o
    bpy.ops.object.convert(target='MESH'); o=bpy.context.object
    if any(m and 'Vidro' in m.name for m in o.data.materials): glass.append(o); continue
    attr=o.data.attributes.new('original_generated','FLOAT_VECTOR','POINT')
    mn=Vector([min(v.co[k] for v in o.data.vertices) for k in range(3)])
    mx=Vector([max(v.co[k] for v in o.data.vertices) for k in range(3)])
    for v,d in zip(o.data.vertices,attr.data): d.vector=tuple((v.co[k]-mn[k])/max(mx[k]-mn[k],.000001) for k in range(3))
    meshes.append(o)
for m in bpy.data.materials:
    if not m.use_nodes: continue
    nodes=m.node_tree.nodes; links=m.node_tree.links
    at=nodes.new('ShaderNodeAttribute'); at.attribute_name='original_generated'
    for l in list(links):
        if l.from_node.type=='TEX_COORD' and l.from_socket.name=='Generated': links.new(at.outputs['Vector'],l.to_socket)
    for n in list(nodes):
        if n.type=='TEX_NOISE' and not n.inputs['Vector'].is_linked: links.new(at.outputs['Vector'],n.inputs['Vector'])
bpy.ops.object.select_all(action='DESELECT')
for o in meshes: o.select_set(True)
bpy.context.view_layer.objects.active=meshes[0]; bpy.ops.object.join(); merged=bpy.context.object; merged.name='Recepcao original | materiais e luz preservados'
bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
while merged.data.uv_layers: merged.data.uv_layers.remove(merged.data.uv_layers[0])
merged.data.uv_layers.new(name='UVMap')
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.uv.smart_project(angle_limit=math.radians(66),island_margin=.003); bpy.ops.object.mode_set(mode='OBJECT')
img=bpy.data.images.new('Recepcao | aparencia Blender',width=4096,height=4096,alpha=False)
for m in merged.data.materials:
    if not m: continue
    n=m.node_tree.nodes.new('ShaderNodeTexImage'); n.image=img; m.node_tree.nodes.active=n
s.cycles.samples=16; s.render.bake.margin=8
s.render.bake.use_pass_glossy=False; s.render.bake.use_pass_transmission=False
print('BAKING_START',flush=True)
bpy.ops.object.bake(type='COMBINED')
img.pack()
# Unlit baked material retains Blender shadows and indirect illumination in WebGL.
mat=bpy.data.materials.new('Recepcao | luz e texturas do Blender'); mat.use_nodes=True
nd=mat.node_tree.nodes; nd.clear(); output=nd.new('ShaderNodeOutputMaterial'); emission=nd.new('ShaderNodeEmission'); tex=nd.new('ShaderNodeTexImage'); tex.image=img
mat.node_tree.links.new(tex.outputs['Color'],emission.inputs['Color']); mat.node_tree.links.new(emission.outputs[0],output.inputs['Surface'])
merged.data.materials.clear(); merged.data.materials.append(mat)
for p in merged.data.polygons: p.material_index=0
bpy.ops.object.select_all(action='DESELECT'); merged.select_set(True); cam.select_set(True)
for o in glass: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join(root,'public/assets/3D/spina-clinic-recepcao.glb'),export_format='GLB',use_selection=True,export_cameras=True,export_lights=False)
print('EXPORT_READY',flush=True)
