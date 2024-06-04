import { useState, useCallback, useMemo, useEffect } from 'react'
import useAxios from 'axios-hooks'
import Autosuggest from 'react-autosuggest'

import './style.css'

import type { ReactNode } from 'react'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
}

const useGetAllUsers = () => {
  const [{ data, loading, error }, refetch] = useAxios('https://reqres.in/api/users?delay=2', {
    manual: true,
  })

  const users = useMemo<User[]>(() => {
    if (loading) {
      return [
        {
          id: 9999999,
          email: '',
          first_name: 'Loading...',
          last_name: '',
        },
      ]
    }

    if (!data) return []

    return data.data
  }, [data, loading])

  return { users, loading, error, fetchUsers: refetch }
}

const getSuggestionValue = (suggestion: User) => `${suggestion.first_name} ${suggestion.last_name}`

export const ReactAutosuggest = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<User[]>([])

  const { users, fetchUsers, loading } = useGetAllUsers()

  useEffect(() => {
    if (users) {
      setSuggestions(users)
    }
  }, [users])

  console.log(suggestions)

  const onChange = useCallback((_event, { newValue }) => {
    setValue(newValue)
  }, [])

  const getSuggestions = useCallback(
    (val: string) => {
      const inputValue = val.trim().toLowerCase()
      const inputLength = inputValue.length

      return inputLength === 0
        ? users
        : users.filter(
            (user) =>
              `${user.first_name} ${user.last_name}`.toLowerCase().slice(0, inputLength) ===
              inputValue
          )
    },
    [users]
  )

  const onSuggestionsFetchRequested = useCallback(
    ({ value: val }) => {
      const newSuggestions = getSuggestions(val)
      setSuggestions(newSuggestions)
    },
    [getSuggestions]
  )

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([])
  }, [])

  const renderSuggestion = (suggestion: User) => <div>{suggestion.first_name}</div>

  const renderSuggestionsContainer = ({
    containerProps,
    children,
    query,
  }: {
    containerProps: object
    children: ReactNode
    query: string
  }) => {
    return (
      <div {...containerProps}>
        {value.length === 0 && !loading && <div className="header">All Users</div>}

        {children}
      </div>
    )
  }

  const handleOnFocus = useCallback(() => {
    if (!users.length) {
      fetchUsers()
    }
  }, [fetchUsers, users.length])

  const inputProps = {
    placeholder: 'Type a user name',
    value,
    onChange: onChange,
    onFocus: handleOnFocus,
  }

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
        shouldRenderSuggestions={() => true}
      />
    </>
  )
}
