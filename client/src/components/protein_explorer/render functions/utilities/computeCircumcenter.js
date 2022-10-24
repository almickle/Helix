

export default function computeCircumcenter(points) {
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