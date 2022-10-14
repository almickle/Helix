import { FreeCamera, Vector3, Curve3, HemisphericLight, MeshBuilder } from "@babylonjs/core"
import Canvas from "./Canvas"
import parsePDB from 'parse-mmcif'



export default function Scene() {


    const onSceneReady = (scene) => {

        fetch('https://files.rcsb.org/view/1AXC.cif', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.text())
        .then(data => parsePDB(data))
        .then(parsed => {
            const atoms = parsed.atoms.map((atom) => {
                return (
                    [atom.x, atom.y, atom.z]
                )
            })
            const splinePoints = atoms.map((atom) => {
                return (
                    new Vector3(atom[0], atom[1], atom[2])
                )
            })
        
            const myCurve = Curve3.CreateCatmullRomSpline(splinePoints, 20, false)
        
            MeshBuilder.CreateLines("spline", {points: myCurve.getPoints()}, scene)

            camera.setTarget(splinePoints[100])
        })


    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(100, 100, 100), scene);

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    };

    // Will run on every frame
    const onRender = (scene) => {
   
    }


    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Canvas antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </div>
    )
}