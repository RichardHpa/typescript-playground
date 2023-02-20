import { useState } from 'react'

import { Button } from '@mui/material'
import ReactModal from 'react-modal'

const selectorCache: {
  [key: string]: HTMLElement
} = {}

const cachedSelector = (lookup: string | HTMLElement): HTMLElement | null => {
  if (lookup instanceof HTMLElement) return lookup
  if (selectorCache[lookup] instanceof HTMLElement) {
    return selectorCache[lookup]
  }
  // console.log(lookup)
  // console.log(document.querySelector(lookup))
  console.log(document.querySelector('#root'))
  return document.querySelector(lookup)
}

const ReactModalAdapter = (props: any) => {
  const { appElement, ...otherProps } = props
  return <ReactModal {...otherProps} appElement={cachedSelector(appElement)} />
}

export const ReactModalPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button onClick={handleToggle}>Toggle Modal</Button>

      <ReactModalAdapter
        isOpen={isOpen}
        onRequestClose={handleToggle}
        contentLabel="Example Modal"
        appElement="#root"
      >
        <h2>Modal Title</h2>
        <p>Modal Body</p>
        <div>
          <Button onClick={handleToggle}>Close Modal</Button>
        </div>
      </ReactModalAdapter>
    </>
  )
}
