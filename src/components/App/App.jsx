import AppRouter from '../AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'


function App() {

  const [data, setData] = useLocalStorage('urheilu-data',[])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist',[])


  
  const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }

  const handleItemDelete = (id) => {
    let copy = data.slice()
    copy = copy.filter(item => item.id !== id)
    setData(copy)
  }

  const handleItemSubmit = (newitem) => {
    let copy = data.slice()

    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }

    copy.sort((a, b) => {
      const aDate = new Date(a.Date)
      const bDate = new Date(b.Date)
      return bDate - aDate
    })
    setData(copy)
  }

  return (
    <>
      <AppRouter 
        data={data} 
        typelist={typelist} 
        onItemSubmit={handleItemSubmit} 
        onItemDelete={handleItemDelete} 
        onTypeSubmit={handleTypeSubmit} 
      />
    </>
  )
}

export default App

