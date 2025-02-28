import AppRouter from '../AppRouter'
import { useEffect, useState } from 'react'  // Tuodaan useState
import useLocalStorage from '../../shared/uselocalstorage'
import firebase, { auth } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from "../Startup";

const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])
  const [user, setUser] = useState(null)  // Määritellään user-tila

  const firestore = getFirestore(firebase)  // Määritellään firestore täällä

  useEffect(() => {
    // Autentikaation tila
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribeAuth() // Palautetaan unsubscribe auth-muutoksista
  }, [])  // Tyhjä riippuvuuslista, suoritetaan vain kerran komponentin elinkaaressa

  useEffect(() => {
    // Vain jos käyttäjä on kirjautunut sisään
    if (user) {
      const unsubscribeItems = onSnapshot(
        query(collection(firestore, `user/${user.uid}/item`), orderBy('Date', 'desc')),
        (snapshot) => {
          const newData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))
          setData(newData)
        }
      )
      return () => unsubscribeItems()  // Puhdistetaan tilaus, kun komponentti poistuu
    } else {
      setData([]) // Tyhjennetään data, jos käyttäjä ei ole kirjautunut sisään
    }
  }, [user, firestore])  // Käytetään user- ja firestore-riippuvuutta

  // Tyypin lisääminen Firestoreen
  const handleTypeSubmit = async (type) => {
    if (user) {
      await addDoc(collection(firestore, `user/${user.uid}/type`), { type })
    }
  }

  // Esineen poistaminen Firestoresta
  const handleItemDelete = async (id) => {
    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/item`, id))
    }
  }

  // Esineen lisääminen tai päivittäminen Firestoreen
  const handleItemSubmit = async (newitem) => {
    if (user) {
      await setDoc(doc(firestore, `user/${user.uid}/item`, newitem.id), newitem)
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


