import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Steps, Result } from 'antd'

import { TicketService } from '../context'
import { fetchSearchId, fetchTickets, setDisplayCount } from '../../actions'
import Ticket from '../Ticket'
import { compareOptimal, comparePrice, compareTime } from '../../services/sortService'

import classes from './TicketList.module.scss'

const TicketList = () => {
  const dispatch = useDispatch()
  const displayCount = useSelector((state) => state.display.displayCount)
  const tickets = useSelector((state) => state.tickets)
  const sortMode = useSelector((state) => state.sort)
  const filterMode = useSelector((state) => state.filter)
  const ticketSearchService = useContext(TicketService)

  useEffect(() => {
    dispatch(fetchSearchId(ticketSearchService))
  }, [])

  useEffect(() => {
    if (!tickets.stop || tickets.error) {
      dispatch(fetchTickets(ticketSearchService, tickets.searchId))
    }
  }, [tickets])

  let filterTickets = []
  if (filterMode.nonStopsChecked.value) {
    filterTickets = filterTickets.concat(
      tickets.tickets.filter((item) => item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0)
    )
  }
  if (filterMode.oneStopsChecked.value) {
    filterTickets = filterTickets.concat(
      tickets.tickets.filter((item) => item.segments[0].stops.length === 1 && item.segments[1].stops.length === 1)
    )
  }
  if (filterMode.twoStopsChecked.value) {
    filterTickets = filterTickets.concat(
      tickets.tickets.filter((item) => item.segments[0].stops.length === 2 && item.segments[1].stops.length === 2)
    )
  }
  if (filterMode.threeStopsChecked.value) {
    filterTickets = filterTickets.concat(
      tickets.tickets.filter((item) => item.segments[0].stops.length === 3 && item.segments[1].stops.length === 3)
    )
  }
  if (filterMode.allStopsChecked.value) filterTickets = [].concat(tickets.tickets)

  if (sortMode.cheapestChecked.value) filterTickets.sort(comparePrice)
  if (sortMode.fastestChecked.value) filterTickets.sort(compareTime)
  if (sortMode.optimalChecked.value) filterTickets.sort(compareOptimal)

  const elements = filterTickets.map((item, index) => {
    return (
      <li key={index} className={classes.ticket}>
        <Ticket item={item} />
      </li>
    )
  })

  const emptyContent =
    tickets.tickets.length && !filterTickets.length ? (
      <Result title="Рейсов, подходящих под заданные фильтры, не найдено." />
    ) : null

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />

  const spinner = !tickets.tickets.length ? <Spin indicator={antIcon} /> : null

  const onMoreButtonClick = () => dispatch(setDisplayCount(5))

  const spliceList = elements.splice(displayCount)

  const onMoreButton = spliceList.length ? (
    <button className={classes.button} title="" onClick={onMoreButtonClick}>
      Показать еще 5 билетов!
    </button>
  ) : null

  const currentLoaderStep = !tickets.tickets.length ? 0 : !tickets.stop ? 1 : 2

  return (
    <React.Fragment>
      <Steps
        progressDot
        current={currentLoaderStep}
        items={[
          {
            title: 'Отправили запрос на сервер',
          },
          {
            title: 'Загрузка в процессе',
          },
          {
            title: 'Все билеты загружены',
          },
        ]}
      />
      {spinner}
      <ul className={classes['list']}>{elements}</ul>
      {emptyContent}
      {onMoreButton}
    </React.Fragment>
  )
}

export default TicketList
