import { PointsCloudSystem } from "@babylonjs/core"

export default function renderPointcloud (atomVectors, size, scene) {

    const pointCloud = new PointsCloudSystem('pointCloud', size, scene)
            atomVectors.forEach((atom) => {
                pointCloud.addPoints(1, (particle) => {
                    particle.position = atom
                })
            })

    pointCloud.buildMeshAsync()

    return
}