import { useState } from 'react'
import styles from './Search.module.scss'

const Search = ({ searchValue, setSearchValue }) => {
  function handlerSearchValue(e) {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  return <input className={styles.root} value={searchValue} onChange={e => handlerSearchValue(e)} placeholder="Поиск пиццы ..." />
}

export default Search
