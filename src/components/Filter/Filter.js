import { useDispatch, useSelector } from 'react-redux'

import { setFilter } from '../../actions'

import classes from './Filter.module.scss'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const handleInputChange = (event) => {
    const value = event.target.checked
    const name = event.target.name
    dispatch(setFilter(name, value))
  }

  let elements = []

  for (const prop in filter) {
    if (Object.hasOwn(filter, prop)) {
      const element = (
        <li key={prop} className={classes['filter-item']}>
          <input
            className={classes['filter-checkbox']}
            name={prop}
            type="checkbox"
            checked={filter[prop].value}
            onChange={handleInputChange}
            id={prop}
          />
          <label htmlFor={prop}>{filter[prop].display}</label>
        </li>
      )
      elements.push(element)
    }
  }

  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-header']}>Количество пересадок</h2>
      <ul className={classes['filter-list']}>{elements}</ul>
    </div>
  )
}

export default Filter
