import { MeshBuilder, PointsCloudSystem, Vector3, Color3, StandardMaterial, Curve3, Mesh, VertexData } from "@babylonjs/core"
import uniqueCombos from "./utilities/uniqueCombos"
import calculateAll from "./utilities/calculateAll"
// import alphaShape from 'alpha-shape'

export default function renderMesh (atomVectors, alpha, scene) {

    const nearPoints = atomVectors.map((vector) => atomVectors.filter((atom) => Vector3.Distance(atom, vector) <= alpha ))

    const simplices = []
    nearPoints.forEach((points) => {
        uniqueCombos(points, 3).forEach((combo) => {
            const insideVerts = []
            atomVectors.forEach((point) => {
                const hasVertex = calculateAll(combo, point, alpha)
                insideVerts.push(hasVertex)
            })
            let hasPoint = false
            insideVerts.forEach((entry) => {
                if(entry.inner.includes(true) && entry.outer.includes(true)) {
                    hasPoint = true
                }
            })
            if(hasPoint === false) { 
                simplices.push([combo[0].x, combo[0].y, combo[0].z, combo[1].x, combo[1].y, combo[1].z, combo[2].x, combo[2].y, combo[2].z])
            }
        })
    })


    let mesh = []
    simplices.forEach((simplex) => mesh.push(...simplex))

    const faceCount = mesh.length/3

    const indices = []
    for(let i=0; i <= faceCount; i++) {
        indices.push(i)
    }

    const surfaceMesh = new Mesh('surface', scene)
    const vertexData = new VertexData()
        vertexData.positions = mesh
        vertexData.indices = indices
        vertexData.applyToMesh(surfaceMesh)

    const sphereMaterial = new StandardMaterial('mat', scene)
                sphereMaterial.diffuseColor = new Color3(.5, .5, .7);
                sphereMaterial.specularColor = new Color3(1, 0.6, 0.87);
                sphereMaterial.emissiveColor = new Color3(1, 0, 0);
                sphereMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
                sphereMaterial.alpha = 0.4
                sphereMaterial.backFaceCulling = false
                sphereMaterial.wireframe = true

                surfaceMesh.material = sphereMaterial
    
    return
}