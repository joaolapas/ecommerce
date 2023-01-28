import React from 'react'
import SearchSass from './Search.module.sass'

const Search = () => {
  return (
    <div className={SearchSass.searchBar}>
        <label htmlFor="search">Search</label>
        <input type="search" placeholder='Search' />
    </div>
  )
}

export default Search
