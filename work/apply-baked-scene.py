from pathlib import Path
p=Path('src/main.js'); t=p.read_text(encoding='utf-8'); t=t.replace("import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'\n",'')
a=t.index('// Calibração da exportação'); b=t.index('// Ajuste estes valores',a)
t=t[:a]+t[b:]
t=t.replace('renderer.toneMapping = THREE.ACESFilmicToneMapping','renderer.toneMapping = THREE.AgXToneMapping').replace('renderer.toneMappingExposure = 1','renderer.toneMappingExposure = Math.pow(2, -0.25)')
t=t.replace('scene.environmentIntensity = blenderLighting.environmentIntensity','scene.environmentIntensity = 0.3')
a=t.index('    scene.add(new THREE.HemisphereLight'); b=t.index('    resize()',a)
t=t[:a]+'''    // Iluminação e sombras foram gravadas na textura pelo Blender.
    // O ambiente acima é utilizado apenas pelo vidro, preservado como PBR.

'''+t[b:]
t=t.replace('?v=blender-recepcao-3','?v=baked-recepcao-4')
a=t.index('    model.traverse(object => {'); b=t.index('    status.hidden',a)
t=t[:a]+t[b:]
p.write_text(t,encoding='utf-8')
