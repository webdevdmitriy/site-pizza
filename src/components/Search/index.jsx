import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import debounce from 'lodash.debounce'

import { SearchContext } from '../../App'

import styles from './Search.module.scss'
const Search = () => {
  const [value, setValue] = useState('')

  const { setSearchValue } = useContext(SearchContext)
  const searchRef = useRef(null)

  const updateSearchValue = useCallback(
    debounce(str => {
      setSearchValue(str)
    }, 250),
    []
  )

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const onClickClear = e => {
    setSearchValue(e)
    searchRef.current.focus()
  }

  useEffect(() => {}, [])

  return (
    <div className={styles.root}>
      {!value && (
        <span className={styles.close} onClick={() => onClickClear()}>
          &#10006;
        </span>
      )}

      <input ref={searchRef} value={value} onChange={e => onChangeInput(e)} placeholder="Поиск пиццы ..." />
    </div>
  )
}

export default Search
