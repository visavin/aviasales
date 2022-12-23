import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TicketService } from '../context'
import { fetchTickets } from '../../actions'

import classes from './TicketList.module.scss'

const TicketList = () => {
  let timeoutId
  let errorCount
  const dispatch = useDispatch()
  const tickets = useSelector((state) => state.tickets)
  const ticketSearchService = useContext(TicketService)

  useEffect(() => {
    dispatch(fetchTickets(ticketSearchService))
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (tickets.error) {
      errorCount++
      console.log(errorCount)
      if (errorCount < 5) {
        timeoutId = setTimeout(dispatch(fetchTickets(ticketSearchService)), 1000)
      } else console.log('ошибка доступа к базе билетов, повторите запрос позже')
    }
  }, [tickets])

  const elements = tickets.tickets.map((item, index) => {
    const price = () => {
      const str = String(item.price)
      return `${str.slice(0, -3)} ${str.slice(-3)} Р`
    }
    const stopsTitle = (distination) => {
      const stopsArr = item.segments[distination].stops
      if (stopsArr.length === 0) return 'Без пересадок'
      if (stopsArr.length === 1) return '1 пересадка'
      if (stopsArr.length === 2 || stopsArr.length === 3 || stopsArr.length === 4) return `${stopsArr.length} пересадки`
      else return `${stopsArr.length} пересадок`
    }
    const distinationRout = (distination) => {
      return `${item.segments[distination].origin} - ${item.segments[distination].destination}`
    }
    const stopsList = (distination) => {
      return item.segments[distination].stops.length > 0 ? item.segments[distination].stops.join(', ') : '-'
    }
    const duration = (distination) => {
      return `${Math.floor(item.segments[distination].duration / 60)}ч ${Math.floor(
        item.segments[distination].duration % 60
      )}м`
    }
    const formatDate = (date) => {
      return `${String(date).length === 2 ? date : '0' + date}`
    }
    const displayDate = (distination) => {
      const startDate = new Date(item.segments[distination].date)
      const endDate = new Date(item.segments[distination].duration * 60000 + +startDate)
      return (
        formatDate(startDate.getHours()) +
        ':' +
        formatDate(startDate.getMinutes()) +
        ' – ' +
        formatDate(endDate.getHours()) +
        ':' +
        formatDate(endDate.getMinutes())
      )
    }
    const src = `https://pics.avs.io/99/36/${item.carrier}@2x.png`

    return (
      <li key={index} className={classes.ticket}>
        <div className={classes['ticket-header']}>
          <p className={classes['ticket-price']}>{price()}</p>
          <img className={classes['ticket-logo']} src={src} alt="Логотип авиакомпании"></img>
        </div>
        <div className={classes['ticket-info']}>
          <div className={classes['ticket-info_column']}>
            <p className={classes['ticket-info_title']}>{distinationRout(0)}</p>
            <p className={classes['ticket-info_content']}>{displayDate(0)}</p>
            <p className={classes['ticket-info_title']}>{distinationRout(1)}</p>
            <p className={classes['ticket-info_content']}>{displayDate(1)}</p>
          </div>
          <div className={classes['ticket-info_column']}>
            <p className={classes['ticket-info_title']}>В пути</p>
            <p className={classes['ticket-info_content']}>{duration(0)}</p>
            <p className={classes['ticket-info_title']}>В пути</p>
            <p className={classes['ticket-info_content']}>{duration(1)}</p>
          </div>
          <div className={classes['ticket-info_column']}>
            <p className={classes['ticket-info_title']}>{stopsTitle(0)}</p>
            <p className={classes['ticket-info_content']}>{stopsList(0)}</p>
            <p className={classes['ticket-info_title']}>{stopsTitle(1)}</p>
            <p className={classes['ticket-info_content']}>{stopsList(1)}</p>
          </div>
        </div>
      </li>
    )
  })

  return <ul className={classes['ticket-list']}>{elements}</ul>
}

export default TicketList
