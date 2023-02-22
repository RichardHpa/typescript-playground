import { useEffect, useState } from 'react'
import { Box, Paper, Container } from '@mui/material'

import { ListVirtualized } from 'components/ListVirtualized'

import { getExpansion } from 'apis/pokemontcg'

const expansion = 'swsh12'

export const ListVirtualizedPage = () => {
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
    <Container maxWidth="md">
      <Box height={600}>
        <Paper sx={{ height: '100%' }}>
          <Box p={2} sx={{ height: '100%' }}>
            <ListVirtualized data={pokemonCards} loading={loading} />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
