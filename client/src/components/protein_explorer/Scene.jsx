import { Vector3, Curve3, HemisphericLight, MeshBuilder, PointsCloudSystem, Color3, StandardMaterial, ArcRotateCamera } from "@babylonjs/core"
import { useState } from "react";
import Canvas from "./Canvas"
import parse_mmCIF from 'mmcif-parser'
import Ramachandran from "./Ramachandran";
import { useEffect } from "react";
import renderPointcloud from "./render functions/renderPointcloud";
import renderTube from "./render functions/renderTube";
import renderMissing from "./render functions/renderMissing";
import renderSpheres from "./render functions/renderSpheres";
import renderAminos from "./render functions/renderAminos";
import renderMesh from "./render functions/renderMesh";




export default function Scene() {

    const [PDB, setPDB] = useState('1HUW')
    const [proteinData, setProteinData] = useState({atoms: [{x: 0, y: 0, z: 0}], chains: {A: []}, chain_info: [], backbones: {A: [[{x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}]]}})

    useEffect(() => {
        fetch('https://files.rcsb.org/view/' + PDB + '.cif', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.text())
        .then(data => parse_mmCIF(data))
        .then(parsed => setProteinData(parsed))
    }, [PDB])

    useEffect(() => {
        console.log(proteinData)
    }, [proteinData])
    


    const onSceneReady = (scene) => {

        const canvas = scene.getEngine().getRenderingCanvas()
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
            light.intensity = 0.9

        scene.clearColor = new Color3(0.05, 0.05, 0.05)

        const {backbones, chains, chain_info, torsion_angles, atoms} = proteinData

        let total_X = 0
        let total_Y = 0
        let total_Z = 0
        const atomVectors = atoms.map((atom) => {
             total_X += atom.x
             total_Y += atom.y
             total_Z += atom.z

             return new Vector3(atom.x, atom.y, atom.z)
        })

        const atomPoints = atoms.map((atom) => [atom.x, atom.y, atom.z])

        const atomsX = atoms.map((atom) => atom.x)
        const atomsY = atoms.map((atom) => atom.y)
        const atomsZ = atoms.map((atom) => atom.z)

        const max_x = Math.max(...atomsX)
        const max_y = Math.max(...atomsY)
        const max_z = Math.max(...atomsZ)
        const min_x = Math.min(...atomsX)
        const min_y = Math.min(...atomsY)
        const min_z = Math.min(...atomsZ)

        const size = Math.sqrt((max_x-min_x)*(max_x-min_x)+(max_y-min_y)*(max_y-min_y)+(max_z-min_z)*(max_z-min_z))

        // const centroid = new Vector3(total_X/atoms.length, total_Y/atoms.length, total_Z/atoms.length)
        // const camera = new ArcRotateCamera('camera', 45, 0.1, size, centroid, scene)
        // camera.setTarget(centroid)
        // camera.attachControl(canvas, true)

        const origin = new Vector3(0, 0, 0)
        const camera = new ArcRotateCamera('camera', 45, 0.1, 100, origin, scene)
        camera.setTarget(origin)
        camera.attachControl(canvas, true)



        const backboneKeys = Object.keys(backbones)

        const backboneVectors = backboneKeys.map((key) => {
            return (
                backbones[key].map((residue) => {
                    if(residue) {
                        return residue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
                    } else {
                        return null
                    }
                })
            )
        })


        // renderPointcloud(atomVectors, scene)
        // renderTube(backboneVectors, backboneKeys, scene)
        // renderMissing(backboneVectors, scene)
        // renderSpheres(atomVectors, atoms, scene)
        // renderAminos(chains, backboneKeys, scene)
        renderMesh(atomVectors, scene)
        // console.log(backboneVectors[0])
        
    }

    // Will run on every frame
    const onRender = (scene) => {
   
    }

    function handleSubmit(event) {
        event.preventDefault()
        setPDB(document.getElementById('pdb-input').value)
        document.getElementById('pdb-input').value = ''
    }


    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Canvas antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
            {/* <Ramachandran PDB={PDB}/> */}
            <form onSubmit={handleSubmit}>
                <input id="pdb-input" type='text' placeholder="PDB ID.." style={{ position: 'absolute', width: 100, height: 20, right: 40, bottom: 20 }}></input>
            </form>
        </div>
    )
}