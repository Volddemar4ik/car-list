import { useState, useContext } from 'react'
import { Box, Button, Typography, Modal, MenuItem } from '@mui/material'
import { Delete, Check, Clear } from '@mui/icons-material'
import functions from '../functions/functions'
import { CurrentCarsData } from '../app/App'
import './style.scss'

export default function ModalDelete({ car, closeActionMenu }) {
    const [open, setOpen] = useState(false)

    const currentCarsData = useContext(CurrentCarsData)

    function handleOpenModalWindow() {
        setOpen(true)
    }

    function handleCloseModalWindow() {
        setOpen(false)
        closeActionMenu()
    }

    function handleConfirmDeleteCar() {
        currentCarsData.setCars(functions.removeCarFromList(currentCarsData.cars, car?.id))
        currentCarsData.setMatchedCars(functions.removeCarFromList(currentCarsData.matchedCars, car?.id))
        closeActionMenu()
    }

    return (
        <Box>
            <MenuItem onClick={handleOpenModalWindow}>
                <Delete />
                Delete
            </MenuItem>

            <Modal
                open={open}
                aria-labelledby="modal window for delete car"
                aria-describedby="modal window for delete car"
            >
                <Box className='modal-window delete-modal-window'>
                    <Typography variant="h6" component="h2" align='center' className='modal-window__title'>
                        Are you sure you want to delete this car?
                    </Typography>

                    <Box className='delete-modal-window__action-box'>
                        <Button
                            variant="contained"
                            color='inherit'
                            onClick={handleConfirmDeleteCar}
                            className='delete-modal-window__button'
                        >
                            <Check />
                            Yes
                        </Button>

                        <Button
                            variant="contained"
                            color='primary'
                            onClick={handleCloseModalWindow}
                            className='delete-modal-window__button'
                        >
                            <Clear />
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}