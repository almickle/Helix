import { Curve3, Mesh, MeshBuilder, Vector3 } from "@babylonjs/core"


export default function renderTube (backboneVectors, scene, centroid) {

    // console.log(backboneVectors.A)

    const peptidePoints = backboneVectors.map((chain) => {
        const empties = []
        const residues = chain.map((residue, i, array) => {
            if(residue) {
                return residue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
            } else {
                if(i !== 0) {
                    if(array[i-1]) empties.push(array[i-1]) 
                    else empties.push(null)
                    if(array[i+1]) empties.push(array[i+1])
                    else empties.push(null)
                } else empties.push(null)
            }
        })
        const object = {residues: residues, empties: empties}
        return (
            object
        )
    })


    const emptyRanges = peptidePoints.map((chain, index) => {
        const range = []
        let n = 0
        chain.empties.forEach((entry, i, array) => {
            if(array[0] === null && i === 0) {
                range.push([null])
                n++
            } 
            if(entry !== null && array[i+1] === null) {
                range.push([entry[1], entry[2]])
                n++                
            }
            if(entry !== null && array[i-1] === null) range[n-1].push(entry[0], entry[1])
            if(i === array.length-1 && entry === null) range[n-1].push(null)
        })

        return range
    })

    emptyRanges.forEach((range) => {
        range.forEach((group) => {
            if(group[0] !== null && group[1] !== null && group[2] !== null && group[3] !== null) {
                const scale = 4
                const tangentA = group[1].subtract(group[0]).scaleInPlace(scale)
                const tangentB = group[3].subtract(group[2]).scaleInPlace(scale)
                const hermiteSpline = Curve3.CreateHermiteSpline(group[1], tangentA, group[2], tangentB, 30)
                // MeshBuilder.CreateDashedLines('empty', {points: hermiteSpline.getPoints(), dashSize: 100, gapSize: 1, dashNb: 100}, scene)
                MeshBuilder.CreateLines('empty', {points: hermiteSpline.getPoints()}, scene)
            }
        })
    })

    // const hermite = Curve3.CreateHermiteSpline(
    //     centroid,
    //     new Vector3(-30, 30, -140).add(centroid),
    //     new Vector3(20, 10, 40).add(centroid),
    //     new Vector3(90, -30, -30).add(centroid),
    //     60);

    //     // MeshBuilder.CreateDashedLines('empty', {points: hermite.getPoints(), dashSize: 1000, gapSize: 1000, dashNb: 5}, scene)

    //     MeshBuilder.CreateLines("hermite", {points: hermite.getPoints()}, scene)
    // console.log(emptyRanges[0])

    // const testVector = new Vector3(1, 1, 1).subtract()

    // const tube = MeshBuilder.CreateTube('tube', { path: peptidePoints, radius: 1, cap: 3 }, scene)
}