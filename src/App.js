import Categories from './components/Categories'
import Header from './components/Header'

import Sort from './components/Sort'

import pizzas from './assets/pizzas.json'

import './scss/app.scss'

import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Cart from './pages/Cart'
import React, { useState } from 'react'

export const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
