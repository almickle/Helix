

export default function computeCircumradius(points) {
    const A = points[0]
    const B = points[1]
    const C = points[2]

    const a = A.subtract(C)
    const b = B.subtract(C)
    
    const r = (a.length()*b.length()*(a.subtract(b).length()))/(a.cross(b).length()*2)

    return r
}