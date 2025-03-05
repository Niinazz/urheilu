import AppRouter from '../AppRouter'
import { useEffect, useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import firebase, { auth } from './firebase.js'
import { 
  addDoc, collection, deleteDoc, doc, getFirestore, 
  onSnapshot, orderBy, query, setDoc 
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from "../Startup";

const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])
  const [user, setUser] = useState(null)

  const firestore = getFirestore(firebase)

  // Käyttäjän tilan seuranta
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe() // Cleanup unsubscribe
  }, [])

  // Haetaan käyttäjän urheilusuoritukset Firestoresta
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user.uid}/item`), orderBy('Date', 'desc')),
        (snapshot) => {
          const newData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))
          setData(newData)
        },
        (error) => console.error("Error fetching items:", error)
      )
      return () => unsubscribe() // Cleanup
    } else {
      setData([])
    }
  }, [user, firestore])

  // Haetaan käyttäjän urheilutyypit Firestoresta
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user.uid}/type`), orderBy('type')),
        (snapshot) => {
          const newTypes = snapshot.docs.map(doc => doc.data().type)
          setTypelist(newTypes)
        },
        (error) => console.error("Error fetching types:", error)
      )
      return () => unsubscribe() // Cleanup
    } else {
      setTypelist([])
    }
  }, [user, firestore])

  // Urheilutyypin lisääminen Firestoreen
  const handleTypeSubmit = async (newType) => {
    if (user) {
      try {
        await addDoc(collection(firestore, `user/${user.uid}/type`), { type: newType })
      } catch (error) {
        console.error('Virhe tyypin lisäämisessä:', error)
      }
    }
  }

  // Urheilusuorituksen poistaminen Firestoresta
  const handleItemDelete = async (id) => {
    if (user) {
      try {
        await deleteDoc(doc(firestore, `user/${user.uid}/item`, id))
      } catch (error) {
        console.error("Error deleting item:", error)
      }
    }
  }

  // Urheilusuorituksen lisääminen / päivittäminen Firestoreen
  const handleItemSubmit = async (newItem) => {
    if (user) {
      try {
        await setDoc(doc(firestore, `user/${user.uid}/item`, newItem.id), newItem)
      } catch (error) {
        console.error("Error saving item:", error)
      }
    }
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
          user={user}
        />
      ) : (
        <Startup auth={auth} />
      )}
    </>
  )
}

export default App


