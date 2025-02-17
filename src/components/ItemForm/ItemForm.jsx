import styles from './ItemForm.module.scss'

function ItemForm(props) {

  return (

    <div>
        <form>
        <div className={styles.itemform}>
                    <div className={styles.itemform_row}>
            <div>
            <label htmlFor='type'>Urheilutyyppi</label>
              <select name='type'>
                <option>Juoksu</option>
                <option>Uinti</option>
                <option>Kuntosali</option>
                <option>Kävely</option>
              </select>

            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='amount'>Urheilun kesto</label>
              <input type='number' name='amount' step='0.01' />
            </div>
            <div>
              <label htmlFor='Date'>Urheilupäivä</label>
              <input type='date' name='Date' />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='periodStart'>Urheilukuukauden alku</label>
              <input type='date' name='periodStart' />
            </div>
            <div>
              <label htmlFor='periodEnd'>Urheilukuukauden loppu</label>
              <input type='date' name='periodEnd' />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
          </div>    
        </div>
        </div>
        </form>

    </div>
  )

}

export default ItemForm
