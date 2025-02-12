import styles from './App.module.scss'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import { FloatingButton } from '../../shared/buttons'
import { ButtonContainer } from '../../shared/buttons'
import Items from '../Items'










function App() {

  return (
    <>
    <ButtonContainer>
      <div className={styles.app}>
      <Header />
      <Content>
      <Items />
        </Content>
        <Menu/>
      </div>
      </ButtonContainer>
    </>
  )

}

export default App
