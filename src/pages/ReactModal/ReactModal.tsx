import { useState } from 'react'

import { Button } from '@mui/material'
import ReactModal from 'react-modal'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  contentLabel: string
  appElement: string | HTMLElement
  children: React.ReactNode
}

const selectorCache: {
  [key: string]: HTMLElement
} = {}

const cachedSelector = (lookup: string | HTMLElement): HTMLElement => {
  if (lookup instanceof HTMLElement) return lookup
  if (selectorCache[lookup] instanceof HTMLElement) {
    return selectorCache[lookup]
  }

  return document.querySelector(lookup) as HTMLElement
}

const ReactModalAdapter = (props: ModalProps) => {
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
