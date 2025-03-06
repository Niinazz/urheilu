import styles from './Menu.module.scss';
import { TbAdjustmentsHeart } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { MdSettingsSuggest } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className={styles.menu}>
      {/* Tämä vie etusivulle */}
      <div>
        <NavLink 
          to="/" 
          activeClassName={styles.active}  // Käytetään activeClassName, joka lisää aktiivisen luokan
        >
          <TbAdjustmentsHeart />
        </NavLink>
      </div>

      {/* Tämä vie tilastojen sivulle */}
      <div>
        <NavLink 
          to="/stats" 
          activeClassName={styles.active}  // Käytetään activeClassName, joka lisää aktiivisen luokan
        >
          <IoStatsChart />
        </NavLink>
      </div>

      {/* Tämä vie asetussivulle */}
      <div>
        <NavLink 
          to="/settings" 
          activeClassName={styles.active}  // Käytetään activeClassName, joka lisää aktiivisen luokan
        >
          <MdSettingsSuggest />
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;



