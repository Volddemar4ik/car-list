import { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material'
import ActionMenu from '../action-menu/action-menu'
import { tableHeaders } from './table-headers'
import './style.scss'

export default function MainCarTable({ displayData }) {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    function handleChangePage(event, newPage) {
        setPage(newPage)
    }

    return (
        <Paper className='main-table-wrapper'>
            <TableContainer className='main-table'>
                <Table stickyHeader aria-label="main table woth car list">
                    <TableHead>
                        <TableRow >
                            {tableHeaders?.map((column) => (
                                <TableCell className='main-table__header-cell' key={column?.id}>
                                    {column?.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayData
                            ?.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                            ?.map((car) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={car?.id}
                                    >
                                        {tableHeaders?.map((column) => {
                                            const value = car[column?.id]

                                            return (
                                                <TableCell className='main-table__body-cell' key={column?.id} >
                                                    {
                                                        typeof value === 'boolean'
                                                            ? (value ? 'Available' : 'Unavailable')
                                                            : (value
                                                                ? value
                                                                : <ActionMenu car={car} />)
                                                    }
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                count={Math.ceil(displayData?.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                boundaryCount={1}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                className='main-table__pagination'
            />
        </Paper>
    )
}