import AppRouter from '../AppRouter'
import { useEffect, useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import { firestore, auth } from './firebase.js'  // Tämä rivi on nyt oikein ilman kommenttia
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from "../Startup";



const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])
  const [user, setUser] = useState(null)

  // Käyttäjän tilan seuranta (autentikointi)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()  // Peruutetaan kuuntelija, kun komponentti poistuu
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

      return () => unsubscribe()  // Peruutetaan kuuntelija, kun riippuvuus muuttuu (esim. user)
    } else {
      setData([])  // Jos ei ole käyttäjää, tyhjennä data
    }
  }, [user, firestore])  // Huomioi myös `firestore` riippuvuus, vaikka se ei muutu

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
      return () => unsubscribe()  // Peruutetaan kuuntelija, kun riippuvuus muuttuu
    } else {
      setTypelist([])  // Jos ei ole käyttäjää, tyhjennä typelist
    }
  }, [user, firestore])  // Huomioi myös `firestore` riippuvuus

  // Urheilutyypin lisääminen Firestoreen ilman duplikaatteja
  const handleTypeSubmit = async (newType) => {
    if (user && newType && !typelist.includes(newType)) {
      try {
        await addDoc(collection(firestore, `user/${user.uid}/type`), { type: newType })
      } catch (error) {
        console.error('Virhe tyypin lisäämisessä:', error)
      }
    } else {
      alert('Urheilutyyppi on jo listalla tai tyhjä!')
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

  // Urheilusuorituksen lisääminen/päivittäminen Firestoreen
  const handleItemSubmit = async (newItem) => {
    if (user) {
      try {
        const itemRef = doc(firestore, `user/${user.uid}/item`, newItem.id)
        await setDoc(itemRef, newItem)
      } catch (error) {
        console.error("Error saving item:", error)
      }
    }
  }

  // Käyttäjä kirjautunut sisään? Jos ei, näyttää Startup-komponentin
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
