import React from 'react'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const Store = (set => ({
  count : 0,
  increment: () => {
    set((state) => ({
        count: state.count + 1
    }))
  }
  
  
}))
const useStore = create(
    devtools(persist(Store,{name: 'counter'}))
)
export default useStore
