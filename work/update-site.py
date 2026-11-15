from pathlib import Path
p=Path('src/main.js'); t=p.read_text(encoding='utf-8'); a=t.index('    const sunlight ='); b=t.index('    resize()',a); t=t[:a]+t[b:]; t=t.replace("'/assets/3D/spina-clinic-recepcao.glb',", "'/assets/3D/spina-clinic-recepcao.glb?v=lighting-2',")
t=t.replace('    scene.add(model)', '''    scene.add(model)
    // The camera and lights come from the original Blender document.
    model.updateMatrixWorld(true)
    const sourceCamera = gltf.cameras.find(c => c.name.includes('recepcao'))
    if (sourceCamera) {
      sourceCamera.getWorldPosition(cameraSettings.position)
      const direction = new THREE.Vector3()
      sourceCamera.getWorldDirection(direction)
      cameraSettings.target.copy(cameraSettings.position).addScaledVector(direction, 4)
      cameraSettings.fov = sourceCamera.fov
      camera.position.copy(cameraSettings.position)
      camera.lookAt(cameraSettings.target)
    }
    model.traverse(object => {
      if (object.isSpotLight || object.isDirectionalLight) {
        object.castShadow = true
        object.shadow.mapSize.set(1024, 1024)
        object.shadow.normalBias = 0.025
      }
    })'''); p.write_text(t,encoding='utf-8')
