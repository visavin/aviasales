import classes from './Sort.module.scss'

const Sort = () => {
  return (
    <ul className={classes.sort}>
      <li className={classes['sort-item']}>
        <input
          type="radio"
          id="cheapest"
          className={classes['sort-checkbox']}
          name="sort"
          value="cheapest"
          defaultChecked
        />
        <label htmlFor="cheapest">Самый дешевый</label>
      </li>
      <li className={classes['sort-item']}>
        <input type="radio" id="fastest" className={classes['sort-checkbox']} name="sort" value="fastest" />
        <label htmlFor="fastest">Самый быстрый</label>
      </li>
      <li className={classes['sort-item']}>
        <input type="radio" id="optimal" className={classes['sort-checkbox']} name="sort" value="optimal" />
        <label htmlFor="optimal">Оптимальный</label>
      </li>
    </ul>
  )
}

export default Sort
