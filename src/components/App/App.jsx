import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'





function App() {

  return (
    <>
      <div className={styles.app}>
      <Header />
        <Item />
        <Item />
        <Item />
        <Item />
        <Content/>
        <Menu/>
      </div>
    </>
  )

}

export default App
