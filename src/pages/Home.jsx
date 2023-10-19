import { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' })

  useEffect(() => {
    setIsLoaded(false)
    fetch(
      `https://63480c73db76843976b90f11.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
        sortType.sortProperty
      }&order=desc`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoaded(true)
      })
  }, [categoryId, sortType])

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={i => setCategoryId(i)} />
        <Sort value={sortType} onClickType={i => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map(item => (
              <PizzaBlock title={item.title} price={item.price} imageUrl={item.imageUrl} sizes={item.sizes} types={item.types} />
            ))
          : new Array(12).fill(1).map(_ => <Skeleton />)}
      </div>
    </>
  )
}

export default Home
