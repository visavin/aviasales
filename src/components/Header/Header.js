import classes from './Header.module.scss'
import logo from './Logo.svg'

const Header = () => {
  return (
    <div className={classes.header}>
      <img className={classes['header-logo']} src={logo} alt="Avia-sales logo" />
    </div>
  )
}

export default Header
