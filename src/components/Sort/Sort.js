import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../../actions'

import classes from './Sort.module.scss'

const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.sort)

  const handleInputChange = (event) => {
    const value = event.target.checked
    const name = event.target.name
    dispatch(setSort(name, value))
  }

  let elements = []

  for (const prop in sort) {
    if (Object.hasOwn(sort, prop)) {
      const element = (
        <li key={prop} className={classes['sort-item']}>
          <input
            className={classes['sort-checkbox']}
            name={prop}
            type="radio"
            checked={sort[prop].value}
            onChange={handleInputChange}
            id={prop}
          />
          <label htmlFor={prop}>{sort[prop].display}</label>
        </li>
      )
      elements.push(element)
    }
  }

  return <ul className={classes.sort}>{elements}</ul>
}

export default Sort
