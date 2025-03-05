import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {
  const navigate = useNavigate()

  // Funktio, joka määrittää kuukauden alku- ja loppupäivät
  const getMonthStartAndEndDates = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      monthStart: monthStart.toISOString().split("T")[0],
      monthEnd: monthEnd.toISOString().split("T")[0]
    };
  }

  const { monthStart, monthEnd } = getMonthStartAndEndDates();

  const submit = () => {
    let storedValues = { ...values };
    storedValues.amount = parseFloat(storedValues.amount) || 0;
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID();
    storedValues.duration = parseFloat(storedValues.duration) || 0;
    storedValues.Date = storedValues.Date ? new Date(storedValues.Date) : new Date();
    storedValues.periodStart = storedValues.periodStart || monthStart;
    storedValues.periodEnd = storedValues.periodEnd || monthEnd;
    
    props.onItemSubmit(storedValues);
    navigate(-1);
  }

  const initialState = props.formData ? props.formData : {
    type: "",
    amount: 0,
    Date: "",
    duration: "",
    periodStart: monthStart,
    periodEnd: monthEnd
  }

  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false);

  const handleCancel = () => navigate('/');

  const handleDelete = () => {
    if (props.onItemDelete) {
      props.onItemDelete(values.id);
      navigate(-1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='type'>Urheilutyyppi</label>
              <select name='type' onChange={handleChange} value={values.type}>
                <option value="">(valitse)</option>
                {props.typelist.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
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
                value={values.duration}
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
                value={values.periodStart}
              />
            </div>
            <div>
              <label htmlFor='periodEnd'>Urheilukuukauden loppu</label>
              <input
                type='date'
                name='periodEnd'
                onChange={handleChange}
                value={values.periodEnd}
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
                disabled={!(values.type && values.duration && values.Date)}
                type='submit'
              >
                {props.formData ? "TALLENNA" : "LISÄÄ"}
              </Button>
            </div>
          </div>
          {props.onItemDelete && (
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default ItemForm;



