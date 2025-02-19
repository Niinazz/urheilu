import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'

function AddItem(props) {
  // Funktio, joka palauttaa kuukauden ensimmäisen ja viimeisen päivän
  const getMonthStartAndEnd = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Tämän kuukauden viimeinen päivä
    return {
      startOfMonth,
      endOfMonth
    }
  };

  const { startOfMonth, endOfMonth } = getMonthStartAndEnd();

  return (
    <div className={styles.additem}>
      <h2>Uuden urheilumerkinnän lisääminen</h2>
      <ItemForm
        onItemSubmit={props.onItemSubmit}
        typelist={props.typelist}
        periodStart={startOfMonth}
        periodEnd={endOfMonth} // Lähetetään nämä arvot lomakkeelle
      />
    </div> 
  )
}

export default AddItem
