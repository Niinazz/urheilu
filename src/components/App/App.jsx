import AppRouter from '../AppRouter'
import { useEffect } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import firebase from './firebase.js'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'

const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])

  useEffect(() => {
    const firestore = getFirestore(firebase) // Siirretään firestore tähän

    const unsubscribe = onSnapshot(collection(firestore, 'item'), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setData([...newData]) // Varmistetaan, että päivitetään uuteen taulukkoon
    })

    return () => unsubscribe()
  }, []) // Tyhjä riippuvuuslista, koska firestore ei muutu

  const handleTypeSubmit = (type) => {
    const copy = [...typelist, type].sort()
    setTypelist(copy)
  }

  const handleItemDelete = (id) => {
    const copy = data.filter((item) => item.id !== id)
    setData([...copy]) // Varmistetaan uusi taulukko
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
