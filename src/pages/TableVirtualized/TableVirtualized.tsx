import { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'

import { TableVirtualized } from '../../components/TableVirtualized'

import { getExpansion } from '../../apis/pokemontcg'

const expansion = 'swsh12pt5gg'

const columns = [
  { dataKey: 'number', label: 'Number', flexGrow: 1 },
  { dataKey: 'name', label: 'Name', flexGrow: 1 },
  { dataKey: 'flavorText', label: 'Flavor Text', flexGrow: 3 },
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
