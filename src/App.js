import Categories from './components/Categories'
import Header from './components/Header'

import Sort from './components/Sort'

import pizzas from './assets/pizzas.json'

import './scss/app.scss'

import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Cart from './pages/Cart'
import { useState } from 'react'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
