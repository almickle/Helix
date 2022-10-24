

export default function checkInside(pointA, origin, radius) {
    const distanceToOriginA = pointA.subtract(origin[0]).length()
    const distanceToOriginB = pointA.subtract(origin[1]).length()
    const innerSphereVerts = []
    const outerSphereVerts = []

    if(distanceToOriginA < radius) {
        innerSphereVerts.push(true)
    }
    if(distanceToOriginB < radius) {
        outerSphereVerts.push(true)
    }

    return {inner: innerSphereVerts, outer: outerSphereVerts}
}