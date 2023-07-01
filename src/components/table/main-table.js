import { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material'
import ActionMenu from '../action-menu/action-menu'
import { tableHeaders } from './table-headers'

export default function MainCarTable({ displayData, cars, setCars, matchedCars, setMatchedCars }) {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    function handleChangePage(event, newPage) {
        setPage(newPage)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: 530 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            {tableHeaders?.map((column) => (
                                <TableCell
                                    key={column?.id}
                                    style={{ minWidth: column?.minWidth, textAlign: 'center', fontWeight: 600, backgroundColor: '#f0f8ff' }}
                                >
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
                                                <TableCell
                                                    key={column?.id}
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    {
                                                        typeof value === 'boolean'
                                                            ? (value ? 'Available' : 'Unavailable')
                                                            : (value
                                                                ? value
                                                                : <ActionMenu setCars={setCars} setMatchedCars={setMatchedCars} cars={cars} matchedCars={matchedCars} car={car} />)
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
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '15px 0'
                }}
            />
        </Paper>
    )
}