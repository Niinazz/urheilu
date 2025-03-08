import { useEffect, useState } from 'react'
import AppRouter from '../AppRouter'
import useLocalStorage from '../../shared/uselocalstorage'
import { firestore, auth } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from "../StartUp/Startup"


const App = () => {
  const [data, setData] = useLocalStorage('urheilu-data', [])
  const [typelist, setTypelist] = useLocalStorage('urheilu-typelist', [])
  const [user, setUser] = useState(null)

  // 🔹 Käyttäjän tilan seuranta (autentikointi)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("👤 Käyttäjä vaihtui:", user ? user.email : "Ei käyttäjää")
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  // 🔥 Haetaan käyttäjän urheilusuoritukset Firestoresta
  useEffect(() => {
    if (user) {
      console.log("📡 Firestore-kuuntelija käynnistyy... (data)")
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user.uid}/item`), orderBy('Date', 'desc')),
        (snapshot) => {
          const newData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))
          console.log("📥 Haetut suoritukset Firestoresta:", newData)
          setData(newData)
        },
        (error) => console.error("❌ Virhe haettaessa suorituksia:", error)
      )
      return () => unsubscribe()
    } else {
      setData([])  // Tyhjennetään lista, jos käyttäjää ei ole
    }
  }, [user])

  // 🔥 Haetaan käyttäjän urheilutyypit Firestoresta
  useEffect(() => {
    if (user) {
      console.log("📡 Firestore-kuuntelija käynnistyy... (typelist)")
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user.uid}/type`), orderBy('type')),
        (snapshot) => {
          const newTypes = snapshot.docs.map(doc => doc.data().type)
          console.log("📥 Haetut tyypit Firestoresta:", newTypes)
          setTypelist(newTypes)  // 🔥 Päivitetään typelist ilman väliaikaista tyhjennystä
        },
        (error) => console.error("❌ Virhe haettaessa tyyppejä:", error)
      )
      return () => unsubscribe()
    }
  }, [user])  // 🔹 Ei tyhjennetä typelist erikseen

 // Urheilutyypin lisääminen Firestoreen
const handleTypeSubmit = async (newType) => {
  if (user && newType && !typelist.includes(newType)) {
    try {
      console.log("🔥 Lisätään Firestoreen:", newType)
      // Lisätään uusi tyyppi Firestoreen
      await addDoc(collection(firestore, `user/${user.uid}/type`), { type: newType })
      
      // Sen jälkeen päivitämme typelistin manuaalisesti (ilman Firestore kuuntelijaa) 
      setTypelist(prevList => [...prevList, newType])  // Lisää uusi tyyppi listaan

    } catch (error) {
      console.error('❌ Virhe tyypin lisäämisessä:', error)
    }
  } else {
    alert('Urheilutyyppi on jo listalla tai tyhjä!')
  }
}

  // 🛠 Urheilusuorituksen poistaminen Firestoresta
  const handleItemDelete = async (id) => {
    if (user) {
      try {
        console.log("🗑 Poistetaan suoritus:", id)
        await deleteDoc(doc(firestore, `user/${user.uid}/item`, id))
      } catch (error) {
        console.error("❌ Virhe poistettaessa suoritusta:", error)
      }
    }
  }

  // 🛠 Urheilusuorituksen lisääminen/päivittäminen Firestoreen
  const handleItemSubmit = async (newItem) => {
    if (user) {
      try {
        console.log("💾 Tallennetaan suoritus:", newItem)
        const itemRef = doc(firestore, `user/${user.uid}/item`, newItem.id)
        await setDoc(itemRef, newItem)
      } catch (error) {
        console.error("❌ Virhe tallennettaessa suoritusta:", error)
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


