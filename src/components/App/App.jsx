import AppRouter from '../AppRouter'
import { useEffect, useState } from 'react'  // Tuodaan useState
import useLocalStorage from '../../shared/uselocalstorage'
import firebase, { auth } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from "../Startup";




const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])
  const [user, setUser] = useState(null)  // Määritellään user-tila

  const firestore = getFirestore(firebase)  // Määritellään firestore täällä

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()  // Palautetaan unsubscribe, jotta se puhdistuu, kun komponentti poistuu
  }, [])  // Tyhjä riippuvuuslista

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
    <>
      {user ? (
        <AppRouter
          data={data}
          typelist={typelist}
          onItemSubmit={handleItemSubmit}
          onItemDelete={handleItemDelete}
          onTypeSubmit={handleTypeSubmit}
                     auth={auth}
                     user={user} />
      ) : (
        <Startup auth={auth} />
      )}
    </>
  )
}

export default App


