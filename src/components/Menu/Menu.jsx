import styles from './Menu.module.scss'
import { MdViewList } from 'react-icons/md'
import { MdTimeline} from 'react-icons/md'
import { MdSettings } from 'react-icons/md'




function Menu() {

  return (
    <div className={styles.menu}>
    
     <div><MdViewList /></div>
      <div><MdTimeline /></div>
      <div><MdSettings/></div>
    </div>
  )

}

export default Menu
