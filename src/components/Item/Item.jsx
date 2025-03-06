import styles from './Item.module.scss'
import { MdNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Item({ data, ...props }) {
  const locale = "fi-FI"
  const sportDate = new Date(data.Date).toLocaleDateString(locale)

  let duration;

  // Käytetään pelkkää duration-arvoa, ei aikaväliä
  if (data.duration) {
    const durationInMinutes = data.duration;  // Suorituksen kesto minuutteina

    // Näytetään pelkät minuutit ilman lisäyksiä
    duration = durationInMinutes;
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_date}>
          <div className={styles.date_header}>Suorituspäivä</div>
          <div>{sportDate}</div>
        </div>
        <div className={styles.item_duration}>{duration} minuuttia</div> {/* Kesto yksinkertaisena */}
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}><MdNavigateNext /></Link>
      </div>
    </div>
  )
}

export default Item

