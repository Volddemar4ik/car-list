import { useState } from 'react'
import { Box, Button, Typography, Modal, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Check, Clear, Edit, AddCircleOutline } from '@mui/icons-material'
import { tableHeaders } from '../table/table-headers'
import functions from '../functions/functions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
}

export default function ModalEdit({ type, setCars, cars, car, closeActionMenu }) {
    let currentCarData = car || functions.createCarDataItem(tableHeaders)
    const [open, setOpen] = useState(false)
    const [carData, setCarData] = useState(currentCarData)

    function handleOpenModalWindow() {
        setOpen(true)
    }

    function handleCloseModalWindow() {
        setOpen(false)
    }

    function handleConfirm() {
        if (type === 'edit') {
            setCars(functions.editCarsData(cars, carData))
            setOpen(false)
            closeActionMenu()
        } else {
            const newIndex = functions.maxIndexFind(cars)
            const carYear = parseInt(carData?.car_model_year)
            const createNewCar = {
                id: newIndex,
                ...carData,
                car_model_year: carYear
            }

            setCars(prev => [createNewCar, ...prev])
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center' style={{ marginBottom: '20px' }}>
                        Enter new data for car
                    </Typography>
                    {
                        tableHeaders?.map((item) => {
                            const value = carData[item?.id]

                            if (item?.id !== 'Actions' && item?.id !== 'availability') {
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
                                        style={{
                                            marginBottom: '10px'
                                        }}
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

                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Button
                            variant="contained"
                            color='primary'
                            fullWidth
                            style={{
                                marginTop: '20px'
                            }}
                            onClick={handleConfirm}
                        >
                            <Check />
                            Confirm
                        </Button>

                        <Button
                            variant="contained"
                            color='inherit'
                            onClick={handleCloseModalWindow}
                            style={{
                                marginTop: '20px',
                                width: '80%'
                            }}
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