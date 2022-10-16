import { FreeCamera, Vector3, Curve3, HemisphericLight, MeshBuilder, PointsCloudSystem, Color3, Color4, StandardMaterial, ArcRotateCamera } from "@babylonjs/core"
import { useState } from "react";
import Canvas from "./Canvas"
import parse_mmCIF from 'mmcif-parser'
import Ramachandran from "./Ramachandran";




export default function Scene() {

    const [pdb, setPdb] = useState('1AXC')

    const onSceneReady = (scene) => {

        scene.clearColor = new Color3(0.05, 0.05, 0.05)

        const centroid_camera = []

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
            let total_X = 0
            let total_Y = 0
            let total_Z = 0
            atoms.forEach((atom) => {
                 total_X += atom.x
                 total_Y += atom.y
                 total_Z += atom.z
            })
            const centroid = new Vector3(total_X/atoms.length, total_Y/atoms.length, total_Z/atoms.length)
            centroid_camera.push(centroid)

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

            const offset = 1
            for(const chain in parsed.backbones) {
                const splinePoints = parsed.backbones[chain].map((atom) => {
                    return (
                        new Vector3(atom.x, atom.y, atom.z)
                    )
                })
                const offsetPoints = parsed.backbones[chain].map((atom) => {
                    return (
                        new Vector3(atom.x+offset, atom.y, atom.z)
                    )
                })
                
                // const myColors = chain.map(() => {
                //     return (
                //         new Color4(1, 1, 0, 1)
                //     )
                // })
                    const myCurve = Curve3.CreateCatmullRomSpline(splinePoints, 10, false)
                    const offsetCurve = Curve3.CreateCatmullRomSpline(offsetPoints, 10, false)
                    // MeshBuilder.CreateLines(`chain ${index}`, {points: myCurve.getPoints() }, scene)

                    // console.log(myCurve.getPoints)

                    const ribbon = MeshBuilder.CreateRibbon('ribbon', { pathArray: [myCurve.getPoints(), offsetCurve.getPoints()], offset: 0, closeArray: true }, scene)
                    // const tube = MeshBuilder.CreateTube('tube', { path: splinePoints, radius: 1, cap: 3 }, scene)
                    // const tube2 = MeshBuilder.CreateTube('tube', { path: myCurve.getPoints(), radius: 0.8, cap: 3 }, scene)
                    //       tube.setPivotPoint(centroid)

                    const myMesh = ribbon
                          switch (chain) {
                            case 'A':
                                myMesh.material = chainAMaterial
                                break;
                            case 'B':
                                myMesh.material = chainBMaterial
                                break;
                            case 'C':
                                myMesh.material = chainCMaterial
                                break;
                            case 'D':
                                myMesh.material = chainDMaterial
                                break;
                            case 'E':
                                    myMesh.material = chainEMaterial
                                    break;
                            case 'F':
                                myMesh.material = chainFMaterial
                                break;
                            default:
                                myMesh.material = chainAMaterial
                                break;
                          }
    
            }
            camera.setTarget(centroid)
            camera.attachControl(canvas, true);
        })


    // This creates and positions a free camera (non-mesh)
    var camera = new ArcRotateCamera('camera', 0.1, 0.1, 160, centroid_camera[0], scene)

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas

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
            <Ramachandran pdb={pdb}/>
            <form onSubmit={handleSubmit}>
                <input id="pdb-input" type='text' placeholder="PDB ID.." style={{ position: 'absolute', width: 100, height: 20, right: 40, bottom: 20 }}></input>
            </form>
        </div>
    )
}