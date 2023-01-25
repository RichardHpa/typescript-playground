import { useState } from 'react'

import { Button } from '@mui/material'
import ReactModal from 'react-modal'

export const ReactModalPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button onClick={handleToggle}>Toggle Modal</Button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleToggle}
        contentLabel="Example Modal"
        appElement={document.getElementById('root') as HTMLElement}
      >
        <h2>Modal Title</h2>
        <p>Modal Body</p>
        <div>
          <Button onClick={handleToggle}>Close Modal</Button>
        </div>
      </ReactModal>
    </>
  )
}
