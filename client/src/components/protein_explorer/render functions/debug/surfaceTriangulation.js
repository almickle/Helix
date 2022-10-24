import { MeshBuilder, Vector3 } from "@babylonjs/core";
import renderPointcloud from "../renderPointcloud";
import checkInside from "../utilities/checkInside";
import computeCircumcenter from "../utilities/computeCircumcenter";
import computeCircumradius from "../utilities/computeCircumradius";
import computeOrigin from "../utilities/computeOrigin";
import uniqueCombos from "../utilities/uniqueCombos";
import renderDelauney from "./renderDelauney";
import alphaShape from 'alpha-shape'


export default function surfaceTriangulation(points, alpha, scene) {
    renderPointcloud(points, 4, scene)

    const triplets = uniqueCombos(points, 3)

    console.log('triplets')
    console.log(triplets)

    const empty = []
    triplets.forEach((triplet, i) => {
        const circumcenter = computeCircumcenter(triplet)
        const circumradius = computeCircumradius(triplet)
        const origins = computeOrigin(circumcenter, circumradius, triplet, alpha)
        let hasVertices = false
        const insideVerts = {inner: [], outer: []}
        points.forEach((point) => {
           const check = checkInside(point, origins, alpha)
           insideVerts.inner.push(...check.inner)
           insideVerts.outer.push(...check.outer)
        })
        if(insideVerts.inner.includes(true) && insideVerts.outer.includes(true)) {
            hasVertices = true
        }
        // if( i === 0) {
        //     renderDelauney(triplet, alpha, scene)
        //     console.log(insideVerts)
        //     console.log(hasVertices)
        // }
        // if(hasVertices === false) {
        //     empty.push(false)
        //     MeshBuilder.CreateLines('face', {points: [...triplet, triplet[0]]})
        // }
    })

    const testAlpha = 0.5
    const pointsEmpty = points.map((point) => [point.x, point.y, point.z])
    const simplicialComplex = alphaShape(testAlpha, pointsEmpty)
    console.log(simplicialComplex)
    const simplicialVectors = simplicialComplex.map((cell) => cell.map((point) => points[point]))
    console.log(simplicialVectors)
    simplicialVectors.forEach((cell) => MeshBuilder.CreateLines('cell', {points: [...cell, cell[0]]}))
    
}

// const insideVerts = points.map((point) => checkInside(point, origins, alpha))
        // if(insideVerts.inner.includes(true) && insideVerts.outer.includes(true)) {
        //     hasVertices = true
        // }