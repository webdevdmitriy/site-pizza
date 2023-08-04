import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'

import pizzas from './assets/pizzas.json'

import './scss/app.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(item => (
              <PizzaBlock title={item.title} price={item.price} imageUrl={item.imageUrl} sizes={item.sizes} types={item.types} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
