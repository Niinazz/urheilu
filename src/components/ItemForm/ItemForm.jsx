import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'




function ItemForm(props) {

    const navigate = useNavigate()


    const submit = () => {
        console.log(values)
        alert("SUBMIT")
      }

      const initialState = {
        type: "",
        amount: 0,
        Date: "",
        periodStart: "",
        periodEnd: "",
      }
    
      const {values, handleChange, handleSubmit } = useForm(submit, initialState, false)

      const handleCancel = () => {
        navigate('/')
      }
    
    

    

  return (

    <div>
              <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
                    <div className={styles.itemform_row}>
            <div>
            <label htmlFor='type'>Urheilutyyppi</label>
            <select name='type' onChange={handleChange} value={values.type}>
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
              <input type='number' name='amount' step='0.01' onChange={handleChange} value={values.amount} />
            </div>
            <div>
              <label htmlFor='Date'>Urheilupäivä</label>
              <input type='date' name='Date' onChange={handleChange} value={values.Date} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='periodStart'>Urheilukuukauden alku</label>
              <input type='date' name='periodStart' onChange={handleChange} value={values.periodStart} />
            </div>
            <div>
              <label htmlFor='periodEnd'>Urheilukuukauden loppu</label>
              <input type='date' name='periodEnd' onChange={handleChange} value={values.periodEnd} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
            <Button onClick={handleCancel}>PERUUTA</Button>
          </div> 
          <div>
          <Button primary type='submit'>LISÄÄ</Button>   
        </div>
        </div>
        </div>
        </form>

    </div>
  )

}

export default ItemForm
