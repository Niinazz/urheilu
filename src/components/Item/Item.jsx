import styles from './Item.module.scss'

  

function Item() {

        return (
            <div className={styles.item}>
              <div className={styles.item_data}>
                <div className={styles.item_type}>Juoksu</div>
                <div className={styles.item_amount}>45min</div>
                <div className={styles.item_date}>20.3.2023</div>
                <div className={styles.item_timespan}>1.12.2022 - 28.2.2023</div>
                <div className={styles.item_average}>45min</div>
              </div>
            </div>
          )
    
  }
  
  export default Item
  