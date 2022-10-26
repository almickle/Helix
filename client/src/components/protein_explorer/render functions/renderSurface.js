import { Mesh, VertexData, Vector3, StandardMaterial, Color3 } from '@babylonjs/core'
import alphaShape from 'alpha-shape'
import fibonacciSphere from './utilities/fibonacciSphere'


export default () => {
    // eslint-disable-next-line
    addEventListener('message', (message) => {
        if(message.data.command === 'run') {
            renderSurface(message.data.atoms, message.data.alpha, message.data.scene)
        }
    })
}



function renderSurface (atoms, alpha, scene) {

    const vanDerWaalsSpheres = atoms.map((atom) => {
            const coordinate = new Vector3(atom.x, atom.y, atom.z)

            switch (atom.atom) {
                case 'N':
                    return fibonacciSphere(coordinate, 20, 1.64)
                case 'C':
                    return fibonacciSphere(coordinate, 20, 1.77)
                case 'O':
                    return fibonacciSphere(coordinate, 20, 1.58)
                case 'S':
                    return fibonacciSphere(coordinate, 20, 1.81)
                case 'H':
                    return fibonacciSphere(coordinate, 20, 1.1)
                default:
                    return fibonacciSphere(coordinate, 20, 1)
                    break
            }
    })

    const pointsSpread = []
    vanDerWaalsSpheres.forEach((sphere) => pointsSpread.push(...sphere))
    const pointsRaw = pointsSpread.map((point) => [point.x, point.y, point.z])

    const cells = alphaShape(alpha, pointsRaw)
            const indices = []
            cells.forEach((cell) => indices.push(...cell))
            const positions = []
            pointsRaw.forEach((point) => positions.push(...point))
        
        const surfaceMesh = new Mesh('surface', scene)
        const vertexData = new VertexData()
            vertexData.positions = positions
            vertexData.indices = indices
            vertexData.applyToMesh(surfaceMesh)
            surfaceMesh.forceSharedVertices()

        const surfaceMaterial = new StandardMaterial('mat', scene)
            surfaceMaterial.diffuseColor = new Color3(.5, .5, .7);
            surfaceMaterial.specularColor = new Color3(1, 0.6, 0.87);
            surfaceMaterial.emissiveColor = new Color3(1, 0, 0);
            surfaceMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
            surfaceMaterial.alpha = 0.4
            surfaceMaterial.wireframe = true
            surfaceMesh.material = surfaceMaterial

        postMessage(indices)
}
