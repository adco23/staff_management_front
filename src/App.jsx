import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Unauthorized from './pages/Unauthorized'
import Register from './pages/Register'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  )
}

export default App
