import { useEffect, useState } from 'react'
import { Box, Paper, Avatar } from '@mui/material'

import { TableVirtualized } from 'components/TableVirtualized'

import { getExpansion } from 'apis/pokemontcg'

const expansion = 'swsh8'

const columns = [
  {
    dataKey: 'image.small',
    label: '',
    width: 50,
    render: (row: any) => <Avatar alt={row.name} src={row.images.small} />,
  },
  { dataKey: 'number', label: 'Number', width: 80 },
  { dataKey: 'name', label: 'Name', width: 200 },
  { dataKey: 'flavorText', label: 'Flavor Text', width: 0, flexGrow: 1 },
]

export const TableVirtualizedPage = () => {
  const [pokemonCards, setPokemonCards] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    const fetchCards = async () => {
      await getExpansion({
        expansionId: expansion,
      })
        .then((res) => setPokemonCards(res.data))
        .finally(() => isLoading(false))
    }
    fetchCards()
  }, [])

  return (
    <Box height={600}>
      <Paper sx={{ height: '100%' }}>
        <Box p={2} sx={{ height: '100%' }}>
          <TableVirtualized columns={columns} data={pokemonCards} loading={loading} />
        </Box>
      </Paper>
    </Box>
  )
}
