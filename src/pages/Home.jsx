import axios from 'axios'

import { useContext, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

const Home = () => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filterSlice.categoryId)
  const sortType = useSelector(state => state.filterSlice.sort.sortProperty)
  const currentPage = useSelector(state => state.filterSlice.currentPage)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const onChangeCategory = id => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const { searchValue } = useContext(SearchContext)

  const search = searchValue ? `&search=${searchValue}` : ''

  useEffect(() => {
    setIsLoaded(false)

    axios
      .get(
        `https://63480c73db76843976b90f11.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}&order=desc${search}`
      )
      .then(res => {
        setItems(res.data)
        setIsLoaded(true)
      })
  }, [categoryId, sortType, search, currentPage])

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((item, index) => (
              <PizzaBlock
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
                key={index}
              />
            ))
          : new Array(12).fill(1).map((_, index) => <Skeleton key={index} />)}
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home
