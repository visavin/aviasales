import classes from './Filter.module.scss'

const Filter = () => {
  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-header']}>Количество пересадок</h2>
      <ul className={classes['filter-list']}>
        <li className={classes['filter-item']}>
          <input type="checkbox" className={classes['filter-checkbox']} id="all" name="filter" value="all" />
          <label htmlFor="all">Все</label>
        </li>
        <li className={classes['filter-item']}>
          <input type="checkbox" className={classes['filter-checkbox']} id="0" name="filter" value="0" defaultChecked />
          <label htmlFor="0">Без пересадок</label>
        </li>
        <li className={classes['filter-item']}>
          <input type="checkbox" className={classes['filter-checkbox']} id="1" name="filter" value="1" defaultChecked />
          <label htmlFor="1">1 пересадка</label>
        </li>
        <li className={classes['filter-item']}>
          <input type="checkbox" className={classes['filter-checkbox']} id="2" name="filter" value="2" defaultChecked />
          <label htmlFor="2">2 пересадки</label>
        </li>
        <li className={classes['filter-item']}>
          <input type="checkbox" className={classes['filter-checkbox']} id="3" name="filter" value="3" />
          <label htmlFor="3">3 пересадки</label>
        </li>
      </ul>
    </div>
  )
}

export default Filter
