import { MeshBuilder, PointsCloudSystem, Vector3, Color3, StandardMaterial, Curve3, Mesh, VertexData } from "@babylonjs/core"
// import alphaShape from 'alpha-shape'

export default function renderMesh (atomVectors, scene) {

    const alpha = 3
    const nearPoints = atomVectors.map((vector) => atomVectors.filter((atom) => Vector3.Distance(atom, vector) <= alpha ))

    const simplices = []
    nearPoints.forEach((points) => {
        uniqueCombos(points, 3).forEach((combo) => {
            points.forEach((point) => {
                const hasVertex = calulateAll(combo, point, alpha)
                if(hasVertex === false) {
                    // simplices.push(combo)
                    simplices.push([combo[0].x, combo[0].y, combo[0].z, combo[1].x, combo[1].y, combo[1].z, combo[2].x, combo[2].y, combo[2].z])
                }
            })
        })
    })

    
    // simplices.forEach((simplex) => mesh = [...mesh, ...simplex])

    console.log('simplices')
    console.log(simplices)

    let mesh = []
    simplices.forEach((simplex) => mesh.push(...simplex))

    const faceCount = mesh.length/3

    const indices = []
    for(let i=0; i <= faceCount; i++) {
        indices.push(i)
    }

    console.log('mesh')
    console.log(mesh)

    console.log('faces')
    console.log(faceCount)

    console.log('indices')
    console.log(indices)

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
                sphereMaterial.wireframe = true

                surfaceMesh.material = sphereMaterial

    
    return
}

function uniqueCombos(array, n) {
    const combos = []
    let i = 0
    let k = 1
    let c = 2

    while(i <= array.length - n) {
        while(k <= array.length - (n-1)) {
            while(c <= array.length - (n-2)) {
                combos.push([array[i], array[k], array[c]])
                c++
            }
            k++
            c=k+1
        }
        i++
        k=i+1
        c=k+1
    }

    return combos
}

function computeCircumcenter(points) {
    const A = points[0]
    const B = points[1]
    const C = points[2]

    const a = A.subtract(C)
    const b = B.subtract(C)
    const asq = a.lengthSquared()
    const bsq = b.lengthSquared()
    const abcross = a.cross(b)

    const p = ((b.scale(asq).subtract(a.scale(bsq))).cross(abcross)).scale(1/(abcross.lengthSquared()*2)).add(C)

    return p

}

function computeCircumradius(points) {
    const A = points[0]
    const B = points[1]
    const C = points[2]

    const a = A.subtract(C)
    const b = B.subtract(C)
    
    const r = (a.length()*b.length()*(a.subtract(b).length()))/(a.cross(b).length()*2)

    return r
}

function computeOrigin(circumcenter, circumradius, points, radius) {
    const U = points[0].subtract(points[1])
    const W = points[0].subtract(points[2])
    const V = U.cross(W)
    const planeNormal = V.normalize()
    const lamda = Math.sqrt(radius*radius-circumradius*circumradius)
    const origin = circumcenter.add(planeNormal.scale(lamda))

    return origin
}

function computeLamda(circumradius, points, radius) {
    const U = points[0].subtract(points[1])
    const W = points[0].subtract(points[2])
    const V = U.cross(W)
    const planeNormal = V.normalize()
    const lamda = Math.sqrt(radius*radius-circumradius*circumradius)

    
    return planeNormal
}

function checkInside(pointA, origin, radius) {
    const distanceToOrigin = pointA.subtract(origin).length()
    if(distanceToOrigin < radius) {
        return true
    } else return false
}

function calulateAll(points, vertex, alpha) {
    const circumcenter = computeCircumcenter(points)
    const circumradius = computeCircumradius(points)
    const origin = computeOrigin(circumcenter, circumradius, points, alpha)

    return checkInside(vertex, origin, alpha)
}







// const x1 = points[0].x
//     const y1 = points[0].y
//     const z1 = points[0].z
//     const x2 = points[1].x
//     const y2 = points[1].y
//     const z2 = points[1].z
//     const x3 = points[2].x
//     const y3 = points[2].y
//     const z3 = points[2].z


// const numbers = [1, 2, 3, 4, 5]
    // console.log('nums:')
    // console.log(uniqueCombos(numbers, 3))



// const test = atomVectors.map((vector, index, array) => {
    //     const simplices = []
    //     atomVectors.forEach((atom, i) => {
    //         atomVectors.forEach((atom, k) => {
    //             if(index <= atomVectors.length-3 && i <= atomVectors.length-2 && k <= atomVectors.length-1) {
    //                 simplices.push([vector, atomVectors[i+1], atomVectors[i+2+k]])
    //             }
    //         })
    //     })

    //     return simplices
    // })

    // console.log(test)

// const boundary = alphaShape(1, atomPoints)
    // const boundaryVectors = boundary.map((point) => new Vector3(point[0], point[1], point[2]))
    // console.log('alpha shape:')
    // console.log(boundary)

    // const surfacePoints = new PointsCloudSystem('alpha shape', 3, scene)
    //     boundaryVectors.forEach((vector) => {
    //         surfacePoints.addPoints(1, (particle) => {
    //             particle.position = vector
    //         })
    //     })

    // surfacePoints.buildMeshAsync()


    // console.log('near points:')
    // console.log(nearPoints)

    // const lengths = nearPoints.filter((array) => array.length < 3)

    // console.log('lengths')
    // console.log(lengths)

    // const sphereWireframe = new StandardMaterial('material', scene)
            

    // const testPoints = [[1, 3, 1], [2, 1, 4], [1, 2, 3]].map((array) => new Vector3(array[0], array[1], array[2]))
    // const pointCloud = new PointsCloudSystem('test', 5, scene)
    //     testPoints.forEach((point) => pointCloud.addPoints(1, (particle) => {
    //         particle.position = point
    //     }))

    // pointCloud.buildMeshAsync()

    // MeshBuilder.CreateSphere('circumcenter', {segments: 4, diameter: 0.3}, scene).position = computeOrigin(testPoints)

    // const sphere = MeshBuilder.CreateSphere('sphere', {segments: 10, diameter: 5.9}, scene).position = computeOrigin(testPoints)
    // sphere.material = sphereWireframe
    // sphereWireframe.wireframe = true

    // console.log('circumradius')
    // console.log(circumradius)
    // console.log('radius')
    // console.log(radius)
    // console.log('lamda')
    // console.log(lamda)
    // console.log('normal')
    // console.log(planeNormal)
    // console.log('circumcenter')
    // console.log(circumcenter)
    // console.log('origin')
    // console.log(origin)


    // TEST
    // const testPoints = [[1, 3, 1], [2, 1, 4], [1, 2, 3]].map((array) => new Vector3(array[0], array[1], array[2]))
    // const pointCloud = new PointsCloudSystem('test', 5, scene)
    //     testPoints.forEach((point) => pointCloud.addPoints(1, (particle) => {
    //         particle.position = point
    //     }))

    // const zero = MeshBuilder.CreateSphere('circumcenter', {segments: 4, diameter: 0.3}, scene).position = new Vector3(0, 0, 0)

    // const circumcircle = Curve3.ArcThru3Points(testPoints[0], testPoints[1], testPoints[2], 100, false, true)
    // MeshBuilder.CreateLines('circumcircle', {points: circumcircle.getPoints()})

    // pointCloud.buildMeshAsync()

    // testPoints.forEach((point) => MeshBuilder.CreateSphere('point', {segments: 4, diameter: 0.3}, scene).position = point)

    // const circumcenter = computeCircumcenter(testPoints)
    // // const circumradius = new Vector3(Math.sqrt((computeCircumradius(testPoints)*computeCircumradius(testPoints))/3), Math.sqrt((computeCircumradius(testPoints)*computeCircumradius(testPoints))/3), Math.sqrt((computeCircumradius(testPoints)*computeCircumradius(testPoints))/3))

    // MeshBuilder.CreateSphere('circumcenter', {segments: 4, diameter: 0.3}, scene).position = circumcenter

    // // const sphere = MeshBuilder.CreateSphere('sphere', {segments: 10, diameter: 5.9}, scene).position = circumcenter
    // // const radius = MeshBuilder.CreateLines('radius', {points: [circumcenter, circumradius]}, scene)

    // const alpha = 5

    // const lamda = computeLamda(computeCircumradius(testPoints), testPoints, alpha)
    // MeshBuilder.CreateLines('lamda', {points: [circumcenter, circumcenter.add(lamda.scale(10))]})

    // const origin = computeOrigin(circumcenter, computeCircumradius(testPoints), testPoints, alpha)

    // const sphereMain = MeshBuilder.CreateSphere('origin', {segments: 10, diameter: 2*alpha}, scene)
    // sphereMain.position = origin
    // const sphereMaterial = new StandardMaterial('mat', scene)
    //             sphereMaterial.diffuseColor = new Color3(.5, .5, .7);
    //             sphereMaterial.specularColor = new Color3(1, 0.6, 0.87);
    //             sphereMaterial.emissiveColor = new Color3(1, 0, 0);
    //             sphereMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
    //             sphereMaterial.alpha = 0.4
    //             sphereMaterial.wireframe = true
    // sphereMain.material = sphereMaterial

    // const testVertex = new Vector3(3, 5, 7)
    // const testSphere = MeshBuilder.CreateSphere('test', {segments: 4, diameter: 0.3}).position = testVertex

    // // console.log('inside')
    // // console.log(checkInside(zero, origin, alpha))
    // // console.log('inside')
    // // console.log(checkInside(testVertex, origin, alpha))

    // console.log('test')
    // console.log(calulateAll(testPoints, testVertex, alpha))
    // console.log(calulateAll(testPoints, zero, alpha))