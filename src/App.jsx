import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import Unauthorized from './pages/Unauthorized'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { Roles } from './utils/constants'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[Roles.User]}/>}>
          <Route path="/" element={<Home />} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App
