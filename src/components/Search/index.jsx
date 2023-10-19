import { useContext, useState } from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)

  function handlerSearchValue(e) {
    setSearchValue(e.target.value)
  }

  return <input className={styles.root} value={searchValue} onChange={e => handlerSearchValue(e)} placeholder="Поиск пиццы ..." />
}

export default Search
