const functions = {
    'removeCarFromList': function removeCarFromList(carsArray, carsId) {
        return carsArray.filter(item => item?.id !== carsId)
    },

    'editCarsData': function editCarsData(carsArray, carData) {
        return carsArray.map(item => {
            if (item?.id === carData?.id) {
                return carData
            }
            return item
        })
    },

    'maxIndexFind': function maxIndexFind(carsArray) {
        return Math.max(...carsArray?.map(item => item?.id)) + 1
    },

    'createCarDataItem': function createCarDataItem(dataArray) {
        const carDataItem = {}

        dataArray.map(item => {
            if (item?.id !== 'actions') {
                carDataItem[item?.id] = ''

                if (item?.id === 'availability') {
                    carDataItem[item?.id] = false
                }
            }
        })

        return carDataItem
    },

    'search': function search(carsArray, searchData) {
        const matchedObjects = []
        const regexForSearch = /[ ,.:]+/
        const resultArray = searchData.split(regexForSearch)

        for (const result of resultArray) {
            const foundObjects = carsArray?.filter((car) => {
                for (const key in car) {
                    if (car.hasOwnProperty(key) && String(car[key])?.toLowerCase()?.includes(result.toLowerCase())) {
                        return true
                    }
                }
                return false
            })

            matchedObjects.unshift(...foundObjects)
        }

        return matchedObjects
    },

    'validCarData': function (data) {
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] === '')
                return false
        }
        return true
    }
}

export default functions