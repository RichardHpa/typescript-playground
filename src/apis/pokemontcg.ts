import axios from 'axios'

interface Expansion {
  expansionId: string
}

export const getExpansion = async ({ expansionId }: Expansion) => {
  const res = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${expansionId}`)
  return res.data
}
