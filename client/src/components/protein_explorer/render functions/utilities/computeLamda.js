

export default function computeLamda(circumradius, points, radius) {
    const U = points[0].subtract(points[1])
    const W = points[0].subtract(points[2])
    const V = U.cross(W)
    const planeNormal = V.normalize()
    const lamda = Math.sqrt(radius*radius-circumradius*circumradius)

    
    return planeNormal
}