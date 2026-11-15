import bpy, math, os
from mathutils import Vector
root = os.getcwd()
s = bpy.context.scene
# Preserve all original geometry and materials.
for o in bpy.data.objects:
    if o.type == 'LIGHT':
        if 'natural' in o.name: o.data.energy = 1300; o.data.color = (1,.88,.72); o.data.size = 4
        elif 'Preenchimento' in o.name: o.data.energy = 450; o.data.color = (1,.95,.85)
        elif 'parede' in o.name: o.data.energy = 150; o.data.color = (1,.85,.65)
world = s.world
world.use_nodes = True
bg = world.node_tree.nodes.get('Background')
if bg: bg.inputs['Color'].default_value = (.75,.8,.9,1); bg.inputs['Strength'].default_value = .25
cam = bpy.data.objects.get('Camera | recepcao')
s.camera = cam
cam.location = (.15,-1.65,1.85)
target = Vector((.15,2.28,1.85))
cam.rotation_euler = (target-cam.location).to_track_quat('-Z','Y').to_euler()
cam.data.type = 'PERSP'; cam.data.lens = 40
s.render.engine = 'CYCLES'; s.cycles.samples = 24
s.cycles.use_denoising = True
s.render.resolution_x = 1200; s.render.resolution_y = 675; s.render.resolution_percentage = 100
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type == 'VIEW_3D':
            area.spaces.active.shading.type = 'MATERIAL'
            area.spaces.active.shading.use_scene_lights = True
            area.spaces.active.shading.use_scene_world = True
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'public/assets/3D/spina-clinic-recepcao.blend'))
s.render.filepath = os.path.join(root,'work/recepcao-preview.png')
bpy.ops.render.render(write_still=True)
# glTF supports punctual lights, not Blender area lights.
for o in bpy.data.objects:
    if o.type == 'LIGHT' and o.data.type == 'AREA':
        energy = o.data.energy
        o.data.type = 'SPOT'
        o.data.energy = energy * .12
        o.data.spot_size = math.radians(110)
        o.data.spot_blend = .8
bpy.ops.export_scene.gltf(filepath=os.path.join(root,'public/assets/3D/spina-clinic-recepcao.glb'),export_format='GLB',export_cameras=True,export_lights=True,export_extras=True)
