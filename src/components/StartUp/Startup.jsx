import styles from './Startup.module.scss';
import Button from '../../shared/buttons'; // Oletetaan, että Button-komponentti käyttää omaa buttons.scss-tyyliä
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Startup(props) {
  const google = new GoogleAuthProvider();
  google.setCustomParameters({
    prompt: 'select_account'
  });

  const signInWithGooglePopup = () => signInWithPopup(props.auth, google);

  const signInGoogle = async () => {
    await signInWithGooglePopup();
  };

 

  return (
    <div className={styles.startup}>
      <h1>Urheilupäiväkirja</h1>
      <div>Moi! Tervetuloa käyttämään urheilupäiväkirjaa, mihin voit kirjata kaikki tekemäsi 
        urheilusuoritukset!</div>
      <Button className="button_google-login" onClick={signInGoogle}>Kirjaudu Google-tunnuksilla sisään!</Button>
  
    </div>
  );
}

export default Startup;


