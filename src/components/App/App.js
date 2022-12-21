import React from 'react'

import Header from '../Header'
import Filter from '../Filter'
import Sort from '../Sort'
import TicketList from '../TicketList'

import classes from './App.module.scss'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={classes.container}>
        <div className={classes['left-section']}>
          <Filter />
        </div>
        <div className={classes['right-section']}>
          <Sort />
          <TicketList />
          <button className={classes.button} title="">
            Показать еще 5 билетов!
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
