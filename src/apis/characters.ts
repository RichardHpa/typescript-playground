import axios from 'axios'

interface Character {
  characterId: string | number
}
export const getCharacter = async ({ characterId }: Character) => {
  const res = await axios.get(`https://swapi.dev/api/people/${characterId}/`)
  return res.data
}

export const getCharacters = async () => {
  const res = await axios.get('https://swapi.dev/api/people/')
  return res.data
}
