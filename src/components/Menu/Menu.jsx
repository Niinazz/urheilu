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
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
          <TbAdjustmentsHeart />
        </NavLink>
      </div>

      {/* Tämä vie tilastojen sivulle */}
      <div>
        <NavLink to="/stats" className={({ isActive }) => isActive ? styles.active : ""}>
          <IoStatsChart />
        </NavLink>
      </div>

      {/* Tämä vie asetussivulle */}
      <div>
        <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : ""}>
          <MdSettingsSuggest />
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;


