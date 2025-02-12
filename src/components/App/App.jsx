import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import Button from '../../shared/buttons'







function App() {

  return (
    <>
      <div className={styles.app}>
      <Header />
        <Item />
        <Item />
        <Item />
        <Item />
        <Button>LISÄÄ UUSI RIVI</Button>
        <Content/>
        <Menu/>
      </div>
    </>
  )

}

export default App
