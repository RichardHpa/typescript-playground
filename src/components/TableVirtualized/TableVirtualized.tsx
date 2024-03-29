import {
  Column,
  Table,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  defaultTableRowRenderer,
  defaultTableHeaderRowRenderer,
} from 'react-virtualized'
import 'react-virtualized/styles.css'
import { Box } from '@mui/material'

import type {
  TableCellProps,
  TableRowProps,
  TableHeaderRowProps,
  ColumnProps as VirtualizedColumnProps,
} from 'react-virtualized'

import type { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk'
import type { ReactNode } from 'react'

interface ColumnProps extends VirtualizedColumnProps {
  render?: (row: any, rawValue?: string | number, formatted?: string | number) => ReactNode
}
interface TableVirtualizedProps {
  columns: ColumnProps[]
  data: Card[]
  loading: boolean
}

const cache = new CellMeasurerCache({
  defaultHeight: 50,
})

const rowRenderer = ({ style, ...props }: TableRowProps) => {
  return defaultTableRowRenderer({
    ...props,
    style: {
      ...style,
      backgroundColor: props.index % 2 === 0 ? 'white' : '#f2f2f2',
      alignItems: 'flex-start',
    },
  })
}

const headerRowRenderer = ({ style, ...props }: TableHeaderRowProps) => {
  return defaultTableHeaderRowRenderer({
    ...props,
    style: {
      ...style,
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#2c3e50',
      color: 'white',
    },
  })
}

export const TableVirtualized = ({ columns, data, loading }: TableVirtualizedProps) => {
  const renderCell = (
    cellData: TableCellProps['cellData'],
    rowIndex: TableCellProps['rowIndex'],
    columnIndex: TableCellProps['columnIndex']
  ) => {
    const column = columns[columnIndex]
    if (column.render) return column.render(data[rowIndex])

    return cellData
  }

  function cellRenderer({ parent, rowIndex, columnIndex, cellData, ...rest }: TableCellProps) {
    return (
      <CellMeasurer cache={cache} columnIndex={columnIndex} parent={parent} rowIndex={rowIndex}>
        {({ measure, registerChild }) => (
          <div
            // @ts-expect-error
            ref={registerChild}
            style={{
              whiteSpace: 'normal',
              padding: '10px 0',
            }}
            onLoad={measure}
          >
            {renderCell(cellData, rowIndex, columnIndex)}
          </div>
        )}
      </CellMeasurer>
    )
  }

  if (loading) return <div>Loading...</div>
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Table
              width={width}
              height={height}
              headerHeight={50}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              headerRowRenderer={headerRowRenderer}
            >
              {columns.map(({ dataKey, ...rest }) => (
                <Column {...rest} key={dataKey} dataKey={dataKey} cellRenderer={cellRenderer} />
              ))}
            </Table>
          )
        }}
      </AutoSizer>
    </Box>
  )
}
