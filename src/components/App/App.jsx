import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import { FloatingButton } from '../../shared/buttons'
import { ButtonContainer } from '../../shared/buttons'









function App() {

  return (
    <>
    <ButtonContainer>
      <div className={styles.app}>
      <Header />
        <Item />
        <Item />
        <Item />
        <Item />
        <FloatingButton secondary>+</FloatingButton>
        <Content/>
        <Menu/>
      </div>
      </ButtonContainer>
    </>
  )

}

export default App
