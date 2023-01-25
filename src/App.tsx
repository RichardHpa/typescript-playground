import { Routes, Route } from 'react-router-dom'
import { HomePage, RequestButtonPage, ReactModalPage } from './pages'
import { Header } from './components/Header'
import { Container, Box } from '@mui/material'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/request-button" element={<RequestButtonPage />} />
            <Route path="react-modal" element={<ReactModalPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
