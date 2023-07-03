import { useEffect, useState, useContext } from 'react'
import { Box, Button, Typography, Modal, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Check, Clear, Edit, AddCircleOutline } from '@mui/icons-material'
import { tableHeaders } from '../table/table-headers'
import functions from '../functions/functions'
import { CurrentCarsData } from '../app/App'
import './style.scss'

export default function ModalEdit({ type, car, closeActionMenu }) {
    let currentCarData = car || functions.createCarDataItem(tableHeaders)
    const [open, setOpen] = useState(false)
    const [carData, setCarData] = useState(currentCarData)
    const [isCarDataValid, setIsCarDataValid] = useState(false)
    const currentCarsData = useContext(CurrentCarsData)

    useEffect(() => {
        setIsCarDataValid(functions.validCarData(carData))
    }, [carData])

    function handleOpenModalWindow() {
        setOpen(true)
    }

    function handleCloseModalWindow() {
        setOpen(false)
        if (type === 'edit') {
            closeActionMenu()
        }
    }

    function handleConfirm() {
        if (type === 'edit') {
            currentCarsData.setCars(functions.editCarsData(currentCarsData.cars, carData))
            currentCarsData.setMatchedCars(functions.editCarsData(currentCarsData.matchedCars, carData))
            setOpen(false)
            closeActionMenu()
        }

        if (type === 'add') {
            const newIndex = functions.maxIndexFind(currentCarsData.cars)
            const carYear = parseInt(carData?.car_model_year)
            const createNewCar = {
                id: newIndex,
                ...carData,
                car_model_year: carYear
            }

            currentCarsData.setCars(prev => [createNewCar, ...prev])
            setOpen(false)
        }
    }

    return (
        <Box>
            {
                type === 'edit'
                    ? <MenuItem onClick={handleOpenModalWindow}>
                        <Edit />
                        Edit
                    </MenuItem>
                    : <Button
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        onClick={handleOpenModalWindow}
                        size='large'
                    >
                        Add new car
                    </Button>
            }

            <Modal
                open={open}
                aria-labelledby="modal window to update car data"
                aria-describedby="modal window to update car data"
            >
                <Box className='modal-window edit-add-modal-window'>
                    <Typography variant="h6" component="h2" align='center' className='modal-window__title'>
                        Enter new data for car
                    </Typography>

                    {
                        tableHeaders?.map((item) => {
                            const value = carData[item?.id]

                            if (item?.id !== 'actions' && item?.id !== 'availability') {
                                return (
                                    <TextField
                                        key={item?.id}
                                        disabled={!item?.isEdited && type === 'edit'}
                                        type={item?.type}
                                        label={item?.label}
                                        value={value}
                                        onChange={e => setCarData({ ...carData, [item?.id]: e.target.value })}
                                        variant="standard"
                                        fullWidth
                                        size='small'
                                        className='edit-add-modal-window__input'
                                    />
                                )
                            }

                            if (item?.id === 'availability') {
                                return (
                                    <FormControlLabel
                                        key={item?.id}
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={e => setCarData({ ...carData, [item?.id]: e.target.checked })}
                                            />
                                        }
                                        label={item?.label}
                                        labelPlacement="end"
                                    />
                                )
                            }
                        })
                    }

                    <Box className='edit-add-modal-window__action-box'>
                        <Button
                            variant="contained"
                            color='primary'
                            fullWidth
                            disabled={!isCarDataValid}
                            className='edit-add-modal-window__button'
                            onClick={handleConfirm}
                        >
                            <Check />
                            Confirm
                        </Button>

                        <Button
                            variant="contained"
                            color='inherit'
                            onClick={handleCloseModalWindow}
                            className='edit-add-modal-window__button edit-add-modal-window__button-cancell'
                        >
                            <Clear />
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}