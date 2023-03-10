import { Routes, Route } from 'react-router-dom'
import {
  HomePage,
  RequestButtonPage,
  ReactModalPage,
  TableVirtualizedPage,
  ListVirtualizedPage,
  TableVirtualizedDataPage,
} from './pages'
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
            <Route path="table-virtualized" element={<TableVirtualizedPage />} />
            <Route path="list-virtualized" element={<ListVirtualizedPage />} />
            <Route path="table-virtualized-data" element={<TableVirtualizedDataPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
