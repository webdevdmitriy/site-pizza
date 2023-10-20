import { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filterSlice.categoryId)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' })

  const onChangeCategory = id => {
    dispatch(setCategoryId(id))
  }

  const searchValue = ''

  const search = searchValue ? `&search=${searchValue}` : ''

  useEffect(() => {
    setIsLoaded(false)
    fetch(
      `https://63480c73db76843976b90f11.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc${search}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoaded(true)
      })
  }, [categoryId, sortType, search, currentPage])

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
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
      <Pagination currentPage={currentPage} onChangePage={number => setCurrentPage(number)} />
    </>
  )
}

export default Home
