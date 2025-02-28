import AppRouter from '../AppRouter'
import { useEffect } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import firebase from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'

const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])

  const firestore = getFirestore(firebase)  // Määritellään firestore täällä

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'type'), orderBy('type')),
      (snapshot) => {
        const newTypelist = []
        snapshot.forEach((doc) => {
          newTypelist.push(doc.data().type)
        })
        setTypelist(newTypelist)
      }
    )

    return unsubscribe  // Palautetaan unsubscribe, jotta se puhdistuu, kun komponentti poistuu
  }, [firestore])  // `firestore` lisätään riippuvuuksiin

  const handleTypeSubmit = async (type) => {
    try {
      await addDoc(collection(firestore, 'type'), { type: type })
    } catch (error) {
      console.error('Error adding type: ', error)
    }
  }

  const handleItemDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'item', id))
    } catch (error) {
      console.error('Error deleting item: ', error)
    }
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
    setData([...copy])  // Varmistetaan uuden taulukon asettaminen
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

