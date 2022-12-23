import React from 'react'

export const TicketService = React.createContext()

const { Provider: TicketServiceProvider, Consumer: TicketServiceConsumer } = TicketService

export { TicketServiceProvider, TicketServiceConsumer }
