import styles from './Menu.module.scss'
import { TbAdjustmentsHeart } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { MdSettingsSuggest } from "react-icons/md";
import { NavLink } from 'react-router-dom'





function Menu() {

  return (
    
    <div className={styles.menu}>
    <div><NavLink to="/menu"><TbAdjustmentsHeart/></NavLink></div>
    <div><NavLink to="/stats"><IoStatsChart/></NavLink></div>
    <div><NavLink to="/settings"><MdSettingsSuggest/></NavLink></div>
  </div>

  )

}

export default Menu
