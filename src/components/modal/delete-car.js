import { useState } from 'react'
import { Box, Button, Typography, Modal, MenuItem } from '@mui/material'
import { Delete, Check, Clear } from '@mui/icons-material'
import functions from '../functions/functions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 300,
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
}

export default function ModalDelete({ setCars, cars, car, closeActionMenu }) {
    const [open, setOpen] = useState(false)

    function handleOpenModalWindow() {
        setOpen(true)
    }

    function handleCloseModalWindow() {
        setOpen(false)
    }

    function handleConfirmDeleteCar() {
        setCars(functions.removeCarFromList(cars, car?.id))
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        Are you sure you want to delete this car?
                    </Typography>

                    <Box style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '80%',
                        margin: '0 auto',
                        marginTop: '20px'
                    }}>
                        <Button
                            variant="contained"
                            color='inherit'
                            onClick={handleConfirmDeleteCar}
                            style={{
                                minWidth: '90px'
                            }}
                        >
                            <Check />
                            Yes
                        </Button>

                        <Button
                            variant="contained"
                            color='primary'
                            onClick={handleCloseModalWindow}
                            style={{
                                minWidth: '90px'
                            }}
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