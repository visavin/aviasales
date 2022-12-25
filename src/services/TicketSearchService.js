export default class TicketSearchService {
  _apiBase = 'https://aviasales-test-api.kata.academy'
  // _apiBase = 'https://front-test.dev.aviasales.ru'

  async getResource(url, parameters = '') {
    const res = await fetch(`${this._apiBase}${url}${parameters}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getSearchId() {
    const searchIdObj = await this.getResource('/search')
    return searchIdObj['searchId']
  }

  async getTickets(searchId) {
    return await this.getResource('/tickets', `?searchId=${searchId}`)
  }
}
