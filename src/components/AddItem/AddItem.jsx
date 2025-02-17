import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'


function AddItem(props) {

  return (
    <div className={styles.additem}>
      <h2>Uuden urheilumerkinnän lisääminen</h2>
      <ItemForm />
    </div> 
  )

}

export default AddItem
