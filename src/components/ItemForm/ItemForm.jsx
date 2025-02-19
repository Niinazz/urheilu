import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {
  const navigate = useNavigate()

  // Funktio, joka määrittää kuukauden alku- ja loppupäivät
  const getMonthStartAndEndDates = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Kuukauden ensimmäinen päivä
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Kuukauden viimeinen päivä

    return {
      monthStart: monthStart.toISOString().split("T")[0], // Muutetaan muodoksi YYYY-MM-DD
      monthEnd: monthEnd.toISOString().split("T")[0] // Muutetaan muodoksi YYYY-MM-DD
    };
  }

  // Määritetään kuukauden alku ja loppu, jos niitä ei ole annettu lomakkeelle
  const { monthStart, monthEnd } = getMonthStartAndEndDates();

  // Lomakkeen lähetyksen käsittelijä
  const submit = () => {
    let storedValues = Object.assign({}, values)
    storedValues.amount = parseFloat(storedValues.amount)  // Tämä kenttä voidaan poistaa, jos et halua sitä.
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID()
    storedValues.duration = parseFloat(storedValues.duration) || 0;  // Tallennetaan kesto (minuuteissa)
    storedValues.periodStart = storedValues.periodStart || monthStart;  // Käytetään automaattisesti kuukauden alkupäivää, jos kenttä on tyhjä
    storedValues.periodEnd = storedValues.periodEnd || monthEnd;  // Käytetään automaattisesti kuukauden loppupäivää, jos kenttä on tyhjä
    props.onItemSubmit(storedValues)
    navigate(-1)
  }

  const initialState = props.formData ? props.formData : {
    type: "",
    amount: 0,  // Tämä kenttä voidaan poistaa, jos et halua sitä.
    Date: "",
    duration: "", // Suorituksen kesto
    periodStart: monthStart, // Alkuperäinen kuukausi
    periodEnd: monthEnd // Loppukuukausi
  }

  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false)

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
                {props.typelist.map(
                  type => <option key={type}>{type}</option>
                )}
              </select>
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='duration'>Suorituksen kesto (minuuteissa)</label>
              <input
                type='number'
                name='duration'
                step='1'
                onChange={handleChange}
                value={values.duration} // Arvo sidotaan durationiin
              />
            </div>
            <div>
              <label htmlFor='Date'>Urheilupäivä</label>
              <input
                type='date'
                name='Date'
                onChange={handleChange}
                value={values.Date}
              />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='periodStart'>Urheilukuukauden alku</label>
              <input
                type='date'
                name='periodStart'
                onChange={handleChange}
                value={values.periodStart} // Tämä kenttä käyttää automaattisesti kuukauden alkua
              />
            </div>
            <div>
              <label htmlFor='periodEnd'>Urheilukuukauden loppu</label>
              <input
                type='date'
                name='periodEnd'
                onChange={handleChange}
                value={values.periodEnd} // Tämä kenttä käyttää automaattisesti kuukauden loppua
              />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button
                primary
                disabled={values.type && values.duration && values.Date ? "" : "disabled"}
                type='submit'
              >
                {props.formData ? "TALLENNA" : "LISÄÄ"}
              </Button>
            </div>
          </div>
          {props.onItemDelete ? (
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default ItemForm


