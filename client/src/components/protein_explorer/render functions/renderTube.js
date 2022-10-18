import { Curve3, Mesh, MeshBuilder } from "@babylonjs/core"


export default function renderTube(backboneVectors, scene) {

    // const backboneCarbonNitrogen = backboneVectors.map((chain) => chain.map((residue, index, array) => {if(residue){ return [residue[0], residue[2]]} else return null}))
    
    const backboneSegments = backboneVectors.map((chain, index, array) => {
        const segments = [[]]
        let n = 0
        chain.forEach((residue, i, array) => {
            // if(index === 0 ) {
            //     console.log(residue)
            // }
            if(residue !== null) {
                segments[n].push(residue)
                if(array[i+1] === null) {
                    segments.push([])
                    n++
                }
            }
            if(array[array.length-1] === null && i === array.length-1) segments.pop()
        })
        return segments
    })


    // backboneSegments.forEach((chain) => {
    //     chain.forEach((segment) => {
    //         segment.forEach((residue, i, array) => {
    //             if(i === 0) {
    //                 const amino = residue
    //                 amino.push(array[i+1][0])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //             if(i === array.length-1) {
    //                 const amino = residue
    //                 // amino.unshift(array[i-1][2])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //             if(i !== array.length-1 && i !== 0) {
    //                 const amino = residue
    //                 amino.push(array[i+1][0]); // amino.unshift(array[i-1][2])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 console.log(spline)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //         })
    //     })
    // })

    backboneSegments.forEach((chain) => {
        chain.forEach((segment) => {
            let array = []
            segment.forEach((residue) => array = [...array, ...residue])
            console.log(array)
            const spline = Curve3.CreateCatmullRomSpline(array, 4)
            MeshBuilder.CreateTube('segment', { path: spline.getPoints(), radius: 0.5}, scene)
        })
    })

    // let array2 = []
    //     array.forEach((residue) => array2 = [...array2, ...residue])
    // console.log('tube')
    // console.log(backboneCarbonNitrogen[0])
    // console.log(backboneSegments[0])
}