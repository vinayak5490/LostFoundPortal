import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import LostItemForm from './pages/LostItemForm'
import Home from './pages/Home'
import ItemCardDetail from './components/ItemCardDetail'
import Profile from './pages/Profile'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <div className="p-4">
        <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/createnew' element = {<LostItemForm/>}/>
          <Route path='/item/:id' element = {<ItemCardDetail/>} />
          <Route path='/profile' element = {<Profile/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
