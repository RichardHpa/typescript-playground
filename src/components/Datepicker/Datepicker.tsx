/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker, DayPickerSingleDateController } from 'react-dates'

export const CustomDatePicker = ({
  value,
  id,
  startFocused = false,
  containerRef,
  ...props
}: any) => {
  const [currentDate, setCurrentDate] = useState(value)
  const [focused, setFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(() => {
    if (id === 1) {
      return true
    }
    return false
  })

  const dateString = currentDate && currentDate.format('YYYY-MM-DD')

  const onDateChange = (date: any) => {
    setCurrentDate(date)
  }

  const onFocusChange = () => {
    setFocused(!focused)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <input
          type="text"
          name="start date"
          value={dateString || ''}
          readOnly
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000000,
            top: 0,
            right: 0,
          }}
        >
          <DayPickerSingleDateController
            {...props}
            onDateChange={onDateChange}
            onFocusChange={onFocusChange}
            focused={focused}
            date={currentDate}
            appendToBody
          />
        </div>
      )}
    </>
  )
}

export const Datepicker = ({ value, id, startFocused = false, ...props }: any) => {
  const [startDate, setStartDate] = useState(value)

  const [focused, setFocused] = useState(false)

  function onDateChange(date: any) {
    setStartDate(date)
  }

  function onFocusChange() {
    setFocused(!focused)
  }
  return (
    <SingleDatePicker
      {...props}
      id={id}
      date={startDate}
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
      small
      appendToBody
    />
  )
}
