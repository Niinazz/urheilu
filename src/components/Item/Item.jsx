import styles from './Item.module.scss'
import { MdNavigateNext } from 'react-icons/md'


  
function Item({data, ...props}) {
  const locale = "fi-FI"
  const sportDate = new Date(data.Date).toLocaleDateString(locale)


        return (
            <div className={styles.item}>
              <div className={styles.item_data}>
              <div className={styles.item_type}>{data.type}</div>
              <div className={styles.item_amount}>{data.amount} min</div>
              <div className={styles.item_date}>{sportDate}</div>
              <div className={styles.item_timespan}>{data.periodStart} - {data.periodEnd}</div>
              <div className={styles.item_average}>min/kk</div>
              </div>
              <div className={styles.item_edit}>
        <MdNavigateNext />
      </div>
    </div>
  )
    
  }
  
  export default Item
  