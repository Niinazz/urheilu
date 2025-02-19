import styles from './Item.module.scss'
import { MdNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Item({ data, ...props }) {
  const locale = "fi-FI"
  const sportDate = new Date(data.Date).toLocaleDateString(locale)

  const numberFormat = new Intl.NumberFormat('fi-FI');
  const minuteFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'minute',
  });

  const hourFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'hour',
  });

  let duration;
  
  // Käytetään pelkkää duration-arvoa, ei aikaväliä
  if (data.duration) {
    const durationInMinutes = data.duration;  // Suorituksen kesto minuutteina

    const hours = Math.floor(durationInMinutes / 60);  // Täydet tunnit
    const minutes = durationInMinutes % 60;  // Jäljelle jäävät minuutit

    // Näytetään tunnit ja minuutit
    if (durationInMinutes >= 60) {
      duration = `${hourFormatter.format(hours)} tuntia ${minuteFormatter.format(minutes)} minuuttia`;
    } else {
      duration = `${minuteFormatter.format(durationInMinutes)} minuuttia`;
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_date}>
          <div className={styles.date_header}>Suorituspäivä</div>
          <div>{sportDate}</div>
        </div>
        <div className={styles.item_duration}>{duration}</div> {/* Kesto näyttöön */}
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}><MdNavigateNext /></Link>
      </div>
    </div>
  )
}

export default Item
