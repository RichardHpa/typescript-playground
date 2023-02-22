import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { Box, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'

import type { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk'
import type { ListRowProps } from 'react-virtualized'

interface ListVirtualizedProps {
  data: Card[]
  loading: boolean
}

const cache = new CellMeasurerCache({
  defaultHeight: 50,
})

export const ListVirtualized = ({ data, loading }: ListVirtualizedProps) => {
  function cellRenderer({ index, key, parent, style }: ListRowProps) {
    const source = data[index]

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ measure, registerChild }) => (
          // 'style' attribute required to position cell (within parent List)
          // @ts-expect-error
          <ListItem ref={registerChild} key={key} style={style} divider onLoad={measure}>
            <ListItemAvatar>
              <Avatar alt={source.name} src={source.images.small} />
            </ListItemAvatar>
            <ListItemText primary={source.name} secondary={source.flavorText} />
          </ListItem>
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
            <List
              rowCount={data.length}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={cellRenderer}
              width={width}
              height={height}
            />
          )
        }}
      </AutoSizer>
    </Box>
  )
}
