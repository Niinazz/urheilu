import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'




function ItemForm(props) {

    const navigate = useNavigate()


    const submit = () => {
        let storedValues = Object.assign({}, values)
        storedValues.amount = parseFloat(storedValues.amount)
        storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID()
        props.onItemSubmit(storedValues)
        navigate(-1)
      }
    
    

      const initialState = props.formData ? props.formData : {
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
    
    
      const handleDelete = () => {
        props.onItemDelete(values.id)
        navigate(-1)
      }
    
    

  return (

    <div>
              <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
                    <div className={styles.itemform_row}>
            <div>
            <label htmlFor='type'>Urheilutyyppi</label>
            <select name='type' onChange={handleChange} value={values.type}>
                <option value="">(valitse)</option>
                { props.typelist.map(
                  type => <option key={type}>{type}</option>
                )}
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
          <Button primary
                      disabled={values.type &&
                                values.amount &&
                                values.Date ? "" : "disabled"}
                      type='submit'>
                { props.formData ? "TALLENNA" : "LISÄÄ" }
              </Button>
              </div>
</div>
              { props.onItemDelete ? 
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
              <div></div>
            </div>
            : null }

        </div>
        
        </form>
    </div>
  )

}

export default ItemForm

