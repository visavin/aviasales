import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Divider, Spin, Steps } from 'antd'

import { TicketService } from '../context'
import { fetchSearchId, fetchTickets, setDisplayCount } from '../../actions'

import classes from './TicketList.module.scss'

const TicketList = () => {
  const dispatch = useDispatch()
  const displayCount = useSelector((state) => state.display.displayCount)
  const tickets = useSelector((state) => state.tickets)
  const ticketSearchService = useContext(TicketService)

  useEffect(() => {
    dispatch(fetchSearchId(ticketSearchService))
  }, [])

  useEffect(() => {
    if (!tickets.stop || tickets.error) {
      dispatch(fetchTickets(ticketSearchService, tickets.searchId))
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

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  )

  const spinner = !elements.length ? <Spin indicator={antIcon} /> : null

  const onMoreButtonClick = () => dispatch(setDisplayCount(5))

  const spliceList = elements.splice(displayCount)

  const onMoreButton = spliceList.length ? (
    <button className={classes.button} title="" onClick={onMoreButtonClick}>
      Показать еще 5 билетов!
    </button>
  ) : null

  const currentLoaderStep = !elements.length ? 0 : !tickets.stop ? 1 : 2

  return (
    <React.Fragment>
      <Steps
        progressDot
        current={currentLoaderStep}
        items={[
          {
            title: 'Start Loadind',
          },
          {
            title: 'Loading in Progress',
          },
          {
            title: 'All Tickets Loaded',
          },
        ]}
      />
      <Divider />
      {spinner}
      <ul className={classes['ticket-list']}>{elements}</ul>
      {onMoreButton}
    </React.Fragment>
  )
}

export default TicketList
