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
