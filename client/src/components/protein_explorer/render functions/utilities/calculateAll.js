import computeCircumcenter from "./computeCircumcenter"
import computeCircumradius from "./computeCircumradius"
import computeOrigin from "./computeOrigin"
import checkInside from "./checkInside"

export default function calculateAll(points, vertex, alpha) {
    const circumcenter = computeCircumcenter(points)
    const circumradius = computeCircumradius(points)
    const origin = computeOrigin(circumcenter, circumradius, points, alpha)

    return checkInside(vertex, origin, alpha)
}