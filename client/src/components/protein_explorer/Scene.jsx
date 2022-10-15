import { FreeCamera, Vector3, Curve3, HemisphericLight, MeshBuilder, PointsCloudSystem, Color3, Color4, StandardMaterial } from "@babylonjs/core"
import { useState } from "react";
import Canvas from "./Canvas"
import parse_mmCIF from 'mmcif-parser'




export default function Scene() {

    const [pdb, setPdb] = useState('1AXC')

    const onSceneReady = (scene) => {

        scene.clearColor = new Color3(0.05, 0.05, 0.05)

        fetch('https://files.rcsb.org/view/' + pdb + '.cif', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.text())
        .then(data => parse_mmCIF(data))
        .then(parsed => {
            console.log(parsed)
            const atoms = parsed.atoms.map((atom) => {
                return (
                    new Vector3(atom.x, atom.y, atom.z)
                )
            })

            const pointCloud = new PointsCloudSystem('pointCloud', 0, scene)
            atoms.forEach((atom) => {
                pointCloud.addPoints(1, (particle) => {
                    particle.position = atom
                })
            })

            pointCloud.buildMeshAsync()

            const chainAMaterial = new StandardMaterial('material', scene)
                        chainAMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainAMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                        chainAMaterial.emissiveColor = new Color3(.1, .6, .7);
                        chainAMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

            const chainBMaterial = new StandardMaterial('material', scene)
                        chainBMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainBMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                        chainBMaterial.emissiveColor = new Color3(0, 0, 1);
                        chainBMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

            const chainCMaterial = new StandardMaterial('material', scene)
                        chainCMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainCMaterial.specularColor = new Color3(1, 0.6, 0.87);
                        chainCMaterial.emissiveColor = new Color3(1, 0, 0);
                        chainCMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

            const chainDMaterial = new StandardMaterial('material', scene)
                        chainDMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainDMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                        chainDMaterial.emissiveColor = new Color3(0, 1, 0);
                        chainDMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
            const chainEMaterial = new StandardMaterial('material', scene)
                        chainEMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainEMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                        chainEMaterial.emissiveColor = new Color3(0.5, 0.5, 0);
                        chainEMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
            const chainFMaterial = new StandardMaterial('material', scene)
                        chainFMaterial.diffuseColor = new Color3(.5, .5, .7);
                        chainFMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                        chainFMaterial.emissiveColor = new Color3(0.5, 0, 0.5);
                        chainFMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

            parsed.backbones.forEach((chain, index) => {
                const splinePoints = chain.map((atom) => {
                    return (
                        new Vector3(atom.x, atom.y, atom.z)
                    )
                })
                // const myColors = chain.map(() => {
                //     return (
                //         new Color4(1, 1, 0, 1)
                //     )
                // })
                    // const myCurve = Curve3.CreateCatmullRomSpline(splinePoints, 20, false)
                    const tube = MeshBuilder.CreateTube('tube', {path: splinePoints, radius: 1, cap: 3}, scene)
                          switch (index) {
                            case 0:
                                tube.material = chainAMaterial
                                break;
                            case 1:
                                tube.material = chainBMaterial
                                break;
                            case 2:
                                tube.material = chainCMaterial
                                break;
                            case 3:
                                tube.material = chainDMaterial
                                break;
                            case 4:
                                    tube.material = chainEMaterial
                                    break;
                            case 5:
                                tube.material = chainFMaterial
                                break;
                            // default:
                            //     tube.material = chainAMaterial
                            //     break;
                          }
                    // MeshBuilder.CreateLines(`chain ${index}`, {points: myCurve.getPoints() }, scene)
            })

            camera.setTarget(atoms[100])
        })


    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(100, 100, 100), scene);

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1
    light.intensity = 1


    };

    // Will run on every frame
    const onRender = (scene) => {
   
    }

    function handleSubmit(event) {
        event.preventDefault()
        setPdb(document.getElementById('pdb-input').value)
        document.getElementById('pdb-input').value = ''
    }


    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Canvas antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
            <form onSubmit={handleSubmit}>
                <input id="pdb-input" type='text' placeholder="PDB ID.." style={{ position: 'absolute', width: 100, height: 20, right: 40, bottom: 20 }}></input>
            </form>
        </div>
    )
}