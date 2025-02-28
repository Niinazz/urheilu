import AppRouter from '../AppRouter'
import { useEffect } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import firebase from './firebase.js'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'


const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])

  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'item'),
                                         orderBy('Date', 'desc')),
                                   snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

  const handleTypeSubmit = (type) => {
    const copy = [...typelist, type].sort()
    setTypelist(copy)
  }

  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }


  const handleItemSubmit = (newitem) => {
    const copy = [...data]
    const index = copy.findIndex((item) => item.id === newitem.id)

    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }

    copy.sort((a, b) => new Date(b.Date) - new Date(a.Date))
    setData([...copy]) // Uusi taulukko Reactin tilapäivityksen varmistamiseksi
  }

  return (
    <AppRouter 
      data={data} 
      typelist={typelist} 
      onItemSubmit={handleItemSubmit} 
      onItemDelete={handleItemDelete} 
      onTypeSubmit={handleTypeSubmit} 
    />
  )
}

export default App
