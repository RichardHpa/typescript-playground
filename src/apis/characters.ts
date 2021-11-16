import axios from 'axios'

interface Character {
  characterId: string | number
}
export const getCharacter = ({ characterId }: Character) => {
  return axios.get(`https://swapi.dev/api/people/${characterId}/`).then((res) => res.data)
}
