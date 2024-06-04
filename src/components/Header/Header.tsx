import { AppBar, Box, Container, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const pages = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Request Button',
    path: '/request-button',
  },
  {
    name: 'React Modal',
    path: '/react-modal',
  },
  {
    name: 'Table Virtualized',
    path: '/table-virtualized',
  },
  {
    name: 'List Virtualized',
    path: '/list-virtualized',
  },
  {
    name: 'Table Virtualized Data',
    path: '/table-virtualized-data',
  },
  {
    name: 'React Autosuggest',
    path: '/react-autosuggest',
  },
]

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.path}
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
