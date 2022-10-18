import { PointsCloudSystem } from "@babylonjs/core"

export default function renderPointcloud (atomVectors, scene) {

    const pointCloud = new PointsCloudSystem('pointCloud', 0, scene)
            atomVectors.forEach((atom) => {
                pointCloud.addPoints(1, (particle) => {
                    particle.position = atom
                })
            })

    pointCloud.buildMeshAsync()

    return
}