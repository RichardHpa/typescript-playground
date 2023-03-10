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

import type {
  TableCellProps,
  TableRowProps,
  TableHeaderRowProps,
  ColumnProps as VirtualizedColumnProps,
} from 'react-virtualized'

import type { ReactNode } from 'react'
import './Styles.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>
type Model = AnyObject
type Collection = Model[]

interface ColumnProps extends VirtualizedColumnProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any, rawValue?: string | number, formatted?: string | number) => ReactNode
}
interface TableVirtualizedProps {
  columns: ColumnProps[]
  data: Collection
  loading?: boolean
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
    className: `${props.className} row`,
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
            className="cell"
          >
            {renderCell(cellData, rowIndex, columnIndex)}
          </div>
        )}
      </CellMeasurer>
    )
  }

  if (loading) return <div>Loading...</div>
  return (
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
            className="table"
          >
            {columns.map(({ dataKey, ...rest }) => (
              <Column
                {...rest}
                key={dataKey}
                dataKey={dataKey}
                cellRenderer={cellRenderer}
                className="column"
              />
            ))}
          </Table>
        )
      }}
    </AutoSizer>
  )
}
