import { useCallback, useState } from 'react'
import { RequestButton } from '../components/RequestButton'
import { Typography } from '@mui/material'
import { getCharacter } from '../apis/characters'

export const RequestButtonPage = () => {
  const [character, setCharacter] = useState('No Character')

  const handleClick = useCallback(async () => {
    const randNum = Math.floor(Math.random() * 10) + 1
    const response = await getCharacter({ characterId: randNum })
    setCharacter(response.name)
  }, [])

  return (
    <>
      <RequestButton variant="contained" onRequest={handleClick}>
        Test
      </RequestButton>
      {character && <Typography>{character}</Typography>}
    </>
  )
}
