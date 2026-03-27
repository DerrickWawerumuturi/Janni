import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Create from './pages/Create.tsx'
import Blog from './pages/Blog.tsx'
import Explore from './pages/Explore.tsx'
import Admin from './pages/Admin.tsx'


function App() {


  return (
    <div className="main">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/edit/:id" element={<Create />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
