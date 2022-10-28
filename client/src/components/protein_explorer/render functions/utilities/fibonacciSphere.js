import { Vector3 } from "@babylonjs/core"


export default function fibonacciSphere(point, number, radius) {
    const goldenRatio = (1+Math.sqrt(5))/2
    
    const indices = []
    for(let i=0; i < number; i++) {
        indices.push(i)
    }

    const points = indices.map((index) => {
        const j = index + 0.5
        const theta = Math.PI * 2 * j / goldenRatio
        const phi = Math.acos(1 - 2*j/number)
        const x = Math.cos(theta) * Math.sin(phi)
        const y = Math.sin(theta) * Math.sin(phi)
        const z = Math.cos(phi)

        const baseVector = new Vector3(x, y, z)

        return baseVector.add(point)
    })

    return points
}