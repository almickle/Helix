import { MeshBuilder, Color3, StandardMaterial, Curve3 } from "@babylonjs/core"
import computeCircumcenter from "../utilities/computeCircumcenter"
import computeCircumradius from "../utilities/computeCircumradius"
import computeLamda from "../utilities/computeLamda"
import computeOrigin from "../utilities/computeOrigin"
import checkInside from "../utilities/checkInside"

export default function renderDelauney(points, alpha, scene) {
    
    const circumcircle = Curve3.ArcThru3Points(points[0], points[1], points[2], 50, false, true)
    MeshBuilder.CreateLines('circumcircle', {points: circumcircle.getPoints()}, scene)

    points.forEach((point) => MeshBuilder.CreateSphere('point', {segments: 4, diameter: 0.3}, scene).position = point)

    const circumcenter = computeCircumcenter(points)
    MeshBuilder.CreateSphere('circumcenter', {segments: 4, diameter: 0.3}, scene).position = circumcenter

    const lamda = computeLamda(computeCircumradius(points), points, alpha)
    MeshBuilder.CreateLines('lamda', {points: [circumcenter, circumcenter.add(lamda.scale(alpha*2))]})
    MeshBuilder.CreateLines('lamda', {points: [circumcenter, circumcenter.add(lamda.scale(-alpha*2))]})

    const sphereMaterial = new StandardMaterial('mat', scene)
                sphereMaterial.diffuseColor = new Color3(.5, .5, .7);
                sphereMaterial.specularColor = new Color3(1, 0.6, 0.87);
                sphereMaterial.emissiveColor = new Color3(1, 0, 0);
                sphereMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
                sphereMaterial.alpha = 0.4
                sphereMaterial.wireframe = true

    const originA = computeOrigin(circumcenter, computeCircumradius(points), points, alpha)[0]
    MeshBuilder.CreateSphere('origin', {segments: 4, diameter: 0.3}, scene).position = originA
    const sphereA = MeshBuilder.CreateSphere('origin', {segments: 10, diameter: 2*alpha}, scene)
    sphereA.position = originA
    sphereA.material = sphereMaterial

    const originB = computeOrigin(circumcenter, computeCircumradius(points), points, alpha)[1]
    MeshBuilder.CreateSphere('origin', {segments: 4, diameter: 0.3}, scene).position = originB
    const sphereB = MeshBuilder.CreateSphere('origin', {segments: 10, diameter: 2*alpha}, scene)
    sphereB.position = originB
    sphereB.material = sphereMaterial

}
