import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Button, Menu } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import ModalDelete from '../modal/delete-car'
import ModalEdit from '../modal/add-edit-car'

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 140,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}))

export default function ActionMenu({ setCars, setMatchedCars, cars, matchedCars, car }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleOpenActionMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseActionMenu = () => {
        setAnchorEl(null)
    }

    return (
        <React.Fragment>
            <Button
                size='small'
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleOpenActionMenu}
                endIcon={<KeyboardArrowDown />}
            >
                Options
            </Button>

            <StyledMenu
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseActionMenu}
            >
                <ModalEdit type={'edit'} setCars={setCars} setMatchedCars={setMatchedCars} cars={cars} matchedCars={matchedCars} car={car} closeActionMenu={handleCloseActionMenu} />

                <ModalDelete setCars={setCars} setMatchedCars={setMatchedCars} cars={cars} matchedCars={matchedCars} car={car} closeActionMenu={handleCloseActionMenu} />
            </StyledMenu>
        </React.Fragment>
    )
}