import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'

import { ReactModalPage } from './ReactModal'

describe('ReactModalPage', () => {
  test('renders ReactModalPage component', () => {
    render(<ReactModalPage />)
    // console.log(document.querySelector('#root'))
    // expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /toggle modal/i })
    expect(button).toBeInTheDocument()

    userEvent.click(button)

    // expect(screen.queryByRole('button', { name: /toggle modal/i })).not.toBeInTheDocument()
    // expect(screen.getByRole('dialog')).toBeInTheDocument()
    // expect(screen.getByRole('heading', { name: /modal title/i })).toBeInTheDocument()

    screen.debug()
  })
})
