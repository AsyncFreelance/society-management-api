export const getUnique = (firstArray: any[] = [], secondArray: any[] = [], identifier = "_id") => {
    const usedIDs = firstArray.map(item => item[identifier])
    secondArray.forEach(item => {
        const index = usedIDs.findIndex(used => used === item[identifier])
        if (index < 0) {
            usedIDs.push(item[identifier])
        }
    })
    return usedIDs.map(_id => {
        const firstIndex = firstArray.findIndex(item => item[identifier] === _id)
        const secondIndex = secondArray.findIndex(item => item[identifier] === _id)
        if (firstIndex >= 0) {
            return firstArray[firstIndex]
        } else if (secondIndex >= 0) {
            return secondArray[secondIndex]
        }
    })
}