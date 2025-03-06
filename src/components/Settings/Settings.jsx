import styles from './Settings.module.scss'
import Button from '../../shared/buttons'
import { signOut } from 'firebase/auth'

function Settings(props) {

  const handleTypeSubmit = (event) => {
    event.preventDefault()
    const newType = event.target.elements.type.value
    // Lähetetään uusi tyyppi App-komponenttiin, mutta ennen sitä tarkistetaan, ettei se ole jo listalla
    if (!props.typelist.includes(newType) && newType.trim() !== "") {
      props.onTypeSubmit(newType)
      event.target.elements.type.value = ''
    } else {
      alert('Urheilutyyppi on jo listalla tai tyhjä!')
    }
  }

  const logout = () => {
    signOut(props.auth)
  }

  return (
    <div className={styles.settings}>
      <h2>Profiili</h2>
      <div className={styles.settings_profile}>
        <div className={styles.settings_user}>
          <div><img src={props.user.photoURL} alt="User" /></div>
          <div>{props.user.displayName}<br />
               {props.user.email}</div>
        </div>
        <div>
          <Button primary onClick={logout}>Kirjaudu ulos</Button>
        </div>
      </div>

      <h3>Lisää listalle uusia✦Urheilutyyppejä✦</h3>
      <div className={styles.settings_types}>
        {props.typelist.length === 0 ? (
          <p>Ei urheilutyyppejä</p>
        ) : (
          props.typelist.map((type) => <div key={type}>{type}</div>)
        )}
        <form onSubmit={handleTypeSubmit}>
          <div className={styles.settings_form}>
            <input type='text' name='type' placeholder='Uusi urheilutyyppi' />
            <Button type='submit' primary>Lisää</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings;



