import { MeshBuilder, Vector3 } from "@babylonjs/core"


export default function renderTube (backboneVectors, scene) {

    console.log(backboneVectors.A)

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

    console.log(peptidePoints[0])

    // const tube = MeshBuilder.CreateTube('tube', { path: peptidePoints, radius: 1, cap: 3 }, scene)
}