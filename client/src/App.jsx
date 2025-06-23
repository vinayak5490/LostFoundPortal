import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import LostItemForm from './pages/LostItemForm'

function App() {

  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/createnew' element = {<LostItemForm/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
