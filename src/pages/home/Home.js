import React from 'react'
import { Search } from '../../components'
import HomeSass from './Home.module.sass'

const Home = () => {
  return (
    <div className={HomeSass.container}>
        <Search />
        Home
    </div>
  )
}

export default Home
