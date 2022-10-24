import { Vector3, Curve3, HemisphericLight, MeshBuilder, PointsCloudSystem, Color3, StandardMaterial, ArcRotateCamera, VertexBuffer } from "@babylonjs/core"
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
import renderDelauney from "./render functions/debug/renderDelauney";
import surfaceTriangulation from "./render functions/debug/surfaceTriangulation";




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
        const camera = new ArcRotateCamera('camera', 45, 0.1, 20, origin, scene)
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

        // const vanDerWaalsSpheres = atoms.map((atom, i) => {
        //     const coordinate = new Vector3(atom.x, atom.y, atom.z)
        //     let vertices 
        //     let vectors
        //     let indices
        //     switch (atom.atom) {
        //         case 'N':
        //             const nitrogen = MeshBuilder.CreateSphere('nitrogen', {segments: 3, diameter: 1.64}, scene)
        //             nitrogen.setAbsolutePosition(coordinate)
        //             vertices = nitrogen.getVerticesData(VertexBuffer.PositionKind)
        //             indices = nitrogen.getIndices()
        //             nitrogen.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //         case 'C':
        //             const carbon = MeshBuilder.CreateSphere('carbon', {segments: 3, diameter: 1.77}, scene)
        //             carbon.setAbsolutePosition(coordinate)
        //             vertices = carbon.getVerticesData(VertexBuffer.PositionKind)
        //             indices = carbon.getIndices()
        //             carbon.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //         case 'O':
        //             const oxygen = MeshBuilder.CreateSphere('oxygen', {segments: 3, diameter: 1.58}, scene)
        //             oxygen.setAbsolutePosition(coordinate)
        //             vertices = oxygen.getVerticesData(VertexBuffer.PositionKind)
        //             indices = oxygen.getIndices()
        //             oxygen.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //         case 'S':
        //             const sulphur = MeshBuilder.CreateSphere('sulphur', {segments: 3, diameter: 1.81}, scene)
        //             sulphur.setAbsolutePosition(coordinate)
        //             vertices = sulphur.getVerticesData(VertexBuffer.PositionKind)
        //             indices = sulphur.getIndices()
        //             sulphur.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //         case 'H':
        //             const hydrogen = MeshBuilder.CreateSphere('hydrogen', {segments: 3, diameter: 1.10}, scene)
        //             hydrogen.setAbsolutePosition(coordinate)
        //             vertices = hydrogen.getVerticesData(VertexBuffer.PositionKind)
        //             indices = hydrogen.getIndices()
        //             hydrogen.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //         default:
        //             const blank = MeshBuilder.CreateSphere('blank', {segments: 3, diameter: 1.10}, scene)
        //             blank.setAbsolutePosition(coordinate)
        //             vertices = blank.getVerticesData(VertexBuffer.PositionKind)
        //             indices = blank.getIndices()
        //             blank.dispose()
        //             vectors = getVectorsFromVerts(vertices, coordinate)
        //             break;
        //     }

        //     if(i===1) {
        //         // console.log('vectors')
        //         // console.log(vectors)
        //         // console.log('vertices')
        //         // console.log(vertices)
        //         // console.log('indices')
        //         // console.log(indices)
        //     }
        //     return vectors
        // })

        function getVectorsFromVerts(vertices, coordinate) {
            let vectors = []
            let vector = []
            let triplets = []
            let triplet = []
            let n = 0

            vertices.forEach((vertex, i) => {
                triplet.push(vertex)
                n++
                if(n % 3 === 0) {
                    triplets.push(triplet)
                    n = 0
                    triplet = []
                }
            })

            const mergedTriplets = triplets.map((triplet) => {
                const merge = `${triplet[0]} ${triplet[1]} ${triplet[2]}`
                return merge
            })

            const filteredTriplets = mergedTriplets.filter((triplet, i) => mergedTriplets.indexOf(triplet) === i)
            const filteredVectors = filteredTriplets.map((triplet) => triplet.split(' ')).map((triplet) => {
                const baseVector = new Vector3(parseFloat(triplet[0]), parseFloat(triplet[1]), parseFloat(triplet[2]))
                return baseVector.add(coordinate)
            })

            return filteredVectors
        }

        // let vanDerWaalsAtomVectors = []
        // vanDerWaalsSpheres.forEach((sphere) => vanDerWaalsAtomVectors.push(...sphere))

        // const slicedVanDerWaals = vanDerWaalsAtomVectors.slice(0, 1000)


        // const testPoints = [[2, 1, 3], [1, 4, 2], [0, 3, 1], [1, 0, 4], [2, 3, 5], [1, 1, 1], [2, 2, 2]]
        const testPoints = []
        for(let i=1; i < 20; i++) {
            testPoints.push([Math.random()*5-2.5, Math.random()*5-2.5, Math.random()*5-2.5])
        }
        const testVectors = testPoints.map((point) => new Vector3(point[0], point[1], point[2]))

        surfaceTriangulation(testVectors, 3, scene)

        // renderMesh(testVectors, 2, scene)
        // renderPointcloud(testVectors, scene)


        // renderPointcloud(atomVectors, scene)
        // renderPointcloud(vanDerWaalsAtomVectors, scene)
        // renderPointcloud(slicedVanDerWaals, scene)
        // renderTube(backboneVectors, backboneKeys, scene)
        // renderMissing(backboneVectors, scene)
        // renderSpheres(atomVectors, atoms, scene)
        // renderAminos(chains, backboneKeys, scene)
        // renderMesh(atomVectors, scene)
        // renderMesh(vanDerWaalsAtomVectors, 1, scene)
        // renderMesh(slicedVanDerWaals, 1, scene)
        // renderDelauney(atomVectors, scene)
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