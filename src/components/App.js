import { useState, useEffect } from 'react'
import { CircularProgress, IconButton, InputBase, Box } from '@mui/material'
import { Search } from '@mui/icons-material'
import MainCarTable from './table/main-table'
import ModalEdit from './modal/add-edit-car'
import functions from './functions/functions'

const url = 'https://myfakeapi.com/api/cars/'

export default function App() {
  const [cars, setCars] = useState([])
  const [matchedCars, setMatchedCars] = useState([])
  const [loadingCarsData, setloadingCarsData] = useState(false)
  const [searchData, setSearchData] = useState('')
  const [showAllData, setShowAllData] = useState(true)
  // console.log('cars: ', cars)

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
    if (cars?.length !== 0) {
      localStorage.setItem('carsArray', JSON.stringify(cars))
    }

    setMatchedCars(functions.search(cars, searchData))
  }, [cars])

  function handleStartSearchin() {
    setMatchedCars(functions.search(cars, searchData))
    setShowAllData(false)
  }

  return (
    <Box style={{ margin: '0 auto', padding: '10px 50px' }}>
      <Box
        style={{ display: 'flex', justifyContent: 'center', margin: '10px auto', backgroundColor: '#f0f8ff', borderRadius: 4, maxWidth: 500, paddingLeft: 20 }}
      >
        <InputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => setSearchData(e.target.value)}
          fullWidth
          size='medium'
        />

        <IconButton
          type="button"
          onClick={handleStartSearchin}
          sx={{ p: '10px' }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Box>

      {
        !loadingCarsData
          ? <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box>
          : <MainCarTable displayData={showAllData ? cars : matchedCars} cars={cars} setCars={setCars} matchedCars={matchedCars} setMatchedCars={setMatchedCars} />
      }

      <Box style={{ marginTop: 20 }}>
        <ModalEdit cars={cars} setCars={setCars} />
      </Box>
    </Box >
  )
}