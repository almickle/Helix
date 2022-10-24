import { Mesh, VertexData } from '@babylonjs/core'
import alphaShape from 'alpha-shape'

export default function renderMesh (points, alpha, scene) {

    const pointsRaw = points.map((point) => [point.x, point.y, point.z])
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

}
