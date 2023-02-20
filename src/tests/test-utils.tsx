import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../theme'

import type { ReactNode, ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <div id="root">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  )
}
// @ts-expect-error -- They are not quite 1:1, but we're _pretty sure_ they are!
const customRender: typeof render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  // @ts-expect-error
  let Wrapper: RenderOptions['wrapper'] = Providers
  if (options && typeof options.wrapper === 'function') {
    Wrapper = ({ children }) => (
      // @ts-expect-error -- …pretty sure this is the correct `options.wrapper` call!
      <Providers>{createElement(options.wrapper, { children })}</Providers>
    )
  }

  return render(ui, { ...options, wrapper: Wrapper })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
