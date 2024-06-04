import { Box, Paper } from '@mui/material'

import { TableVirtualized } from 'components/TableVirtualized'
import { Datepicker } from 'components/Datepicker'
import moment from 'moment'

const data = [
  {
    id: 1,
    date: '2021-01-01',
    price: 100,
  },
  {
    id: 2,
    date: '2021-01-02',
    price: 200,
  },
  {
    id: 3,
    date: '2021-01-01',
    price: 100,
  },
  {
    id: 4,
    date: '2021-01-02',
    price: 200,
  },
]

const columns = [
  {
    dataKey: 'date',
    label: 'Date',
    width: 250,
    render: (row: { id: number; date: string }) => {
      return <Datepicker id={row.id} value={moment(row.date)} />
      // return <CustomDatePicker id={row.id} value={moment(row.date)} />
    },
  },
  { dataKey: 'price', label: 'Price', width: 200 },
]

export const TableVirtualizedDataPage = () => {
  return (
    <Box height={200}>
      <Paper sx={{ height: '100%' }}>
        <Box p={2} sx={{ height: '100%', overflow: 'visible' }}>
          <TableVirtualized columns={columns} data={data} />
        </Box>
      </Paper>
    </Box>
  )
}
