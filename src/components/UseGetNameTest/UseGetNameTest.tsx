import { useGetName } from 'hooks/useGetName'

export const UseGetNameTest = () => {
  const person = useGetName()

  if (!person.name) {
    throw new Error('No name found')
  }

  return <div>{person.name}</div>
}
