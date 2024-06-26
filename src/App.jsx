
import './App.css'

import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './util/AuthContext'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import PrivateRoutes from './util/PrivateRoutes'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route element={<PrivateRoutes/>}> */}
             <Route path="/" element={<Room />} />
            {/* </Route> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
