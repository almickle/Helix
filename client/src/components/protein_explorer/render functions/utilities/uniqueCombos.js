

export default function uniqueCombos(array, n) {
    const combos = []
    let i = 0
    let k = 1
    let c = 2

    while(i <= array.length - n) {
        while(k <= array.length - (n-1)) {
            while(c <= array.length - (n-2)) {
                combos.push([array[i], array[k], array[c]])
                c++
            }
            k++
            c=k+1
        }
        i++
        k=i+1
        c=k+1
    }

    return combos
}