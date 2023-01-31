import React from 'react'
import { Search } from '../../components'
import HomeSass from './Home.module.sass'
import useStore from '../../Zustand/Store'

const Home = () => {
  const count = useStore(state=>state.count)
  const increment = useStore(state=>state.increment)
  return (
    <div className={HomeSass.container}>
        <Search />
        <button onClick={increment}>Increment</button>
        {count}
    </div>
  )
}

export default Home
