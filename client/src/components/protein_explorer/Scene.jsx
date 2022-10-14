import { FreeCamera, Vector3, Curve3, HemisphericLight, MeshBuilder, PointsCloudSystem, Color3 } from "@babylonjs/core"
import { useState } from "react";
import Canvas from "./Canvas"
import parsePDB from 'parse-mmcif'




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
        .then(data => parsePDB(data))
        .then(parsed => {
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

            // const splinePoints = atoms.map((atom) => {
            //     return (
            //         new Vector3(atom[0], atom[1], atom[2])
            //     )
            // })
        
            // const myCurve = Curve3.CreateCatmullRomSpline(splinePoints, 20, false)
        
            // MeshBuilder.CreateLines("spline", {points: myCurve.getPoints()}, scene)

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
                <input id="pdb-input" type='text' placeholder="PDB ID.." style={{ position: 'absolute', width: 100, height: 20, right: 40, bottom: 40 }}></input>
            </form>
        </div>
    )
}