const functions = {
    'removeCarFromList': function removeCarFromList(carsArray, carsId) {
        return carsArray.filter(item => item?.id !== carsId)
    },

    'editCarsData': function editCarsData(carsArray, carData) {
        return carsArray.map(item => {
            if (item?.id === carData?.id) {
                return carData;
            }
            return item;
        })
    },

    'maxIndexFind': function maxIndexFind(carsArray) {
        console.log('carsArray: ', carsArray)
        return Math.max(...carsArray?.map(item => item?.id)) + 1
    },

    'createCarDataItem': function createCarDataItem(dataArray) {
        const carDataItem = {}

        dataArray.map(item => {
            if (item?.id !== 'Actions') {
                carDataItem[item?.id] = ''

                if (item?.id === 'availability') {
                    carDataItem[item?.id] = false
                }
            }
        })

        return carDataItem
    },

    'search': function search() {

    }
}

export default functions