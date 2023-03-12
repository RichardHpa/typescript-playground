import { render, screen } from '@testing-library/react'

import * as useGetNameHook from 'hooks/useGetName'

import { UseGetNameTest } from './UseGetNameTest'

const mockUseGetName = (username: string | undefined) => {
  jest
    .spyOn(useGetNameHook, 'useGetName')
    .mockImplementation(() => ({ name: username } as jest.Mock))
}

describe('UseGetNameTest', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.spyOn(console, 'error').mockRestore()
    jest.spyOn(useGetNameHook, 'useGetName').mockRestore()
  })

  test.skip('this works if there are  no mock ', () => {
    render(<UseGetNameTest />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('this uses a local mock', () => {
    mockUseGetName('Local Mock Name')
    render(<UseGetNameTest />)
    expect(screen.getByText('Local Mock Name')).toBeInTheDocument()
  })

  test('this uses the global mock', () => {
    render(<UseGetNameTest />)
    expect(screen.getByText('Global Mock Name')).toBeInTheDocument()
  })

  test('this uses a local mock a second time', () => {
    mockUseGetName('Second try')
    render(<UseGetNameTest />)
    expect(screen.getByText('Second try')).toBeInTheDocument()
  })

  test('throws an error if no name is found', () => {
    mockUseGetName(undefined)
    expect(() => render(<UseGetNameTest />)).toThrowError('No name found')
  })
})
