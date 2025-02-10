import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'



function App() {

  return (
    <>
      <div className={styles.app}>
      <Header />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  )

}

export default App
