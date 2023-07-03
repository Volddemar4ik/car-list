import { useState, useEffect, createContext } from 'react'
import { CircularProgress, IconButton, InputBase, Box } from '@mui/material'
import { Search } from '@mui/icons-material'
import MainCarTable from '../table/main-table'
import ModalEdit from '../modal/add-edit-car'
import functions from '../functions/functions'
import './style.scss'

const url = 'https://myfakeapi.com/api/cars/'

export const CurrentCarsData = createContext()

export default function App() {
  const [cars, setCars] = useState([])
  const [matchedCars, setMatchedCars] = useState([])
  const [loadingCarsData, setloadingCarsData] = useState(false)
  const [searchData, setSearchData] = useState('')
  const [showAllData, setShowAllData] = useState(true)
  console.log('cars: ', cars)

  function handleStartSearchin() {
    if (searchData !== '') {
      setMatchedCars(functions.search(cars, searchData))
      setShowAllData(false)
    }
  }

  useEffect(() => {
    if (localStorage.carsArray) {
      setCars(JSON.parse(localStorage.carsArray))
      setloadingCarsData(true)
    } else {
      const fetchData = async () => {
        try {
          const res = await fetch(url)
          const data = await res.json()
          if (data?.cars) {
            setloadingCarsData(true)
            setCars(data?.cars)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('carsArray', JSON.stringify(cars))
    handleStartSearchin()
  }, [cars])

  return (
    <CurrentCarsData.Provider value={{ cars, setCars, matchedCars, setMatchedCars }}>
      <Box className='car-list-wrapper'>
        <Box className='car-list__search'>
          <InputBase
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => setSearchData(e.target.value.trim())}
            fullWidth
            size='medium'
          />

          <IconButton
            type="button"
            onClick={handleStartSearchin}
            className='car-list__search-icon'
            aria-label="search icon"
          >
            <Search />
          </IconButton>
        </Box>

        {
          !loadingCarsData
            ? <Box className='car-list__load-progress-box'><CircularProgress /></Box>
            : <MainCarTable displayData={showAllData ? cars : matchedCars} />
        }

        <Box className='car-list__create-new-car'>
          <ModalEdit cars={cars} setCars={setCars} type={'add'} />
        </Box>
      </Box >
    </CurrentCarsData.Provider >
  )
}