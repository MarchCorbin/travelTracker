class User {
  constructor(userInfo) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelerType = userInfo.travelerType
    this.allTrips = []
    this.pastTrips = []
    this.presentTrips = []
    this.futureTrips = []
    this.pendingTrips = []
  }
  oraganizeTime() {
    let mapped = this.allTrips.map(trip => {
      let splitter = trip.date.split('/')
      let goodDate = `${splitter[1]}/${splitter[2]}/${splitter[0]}`
      trip.date = goodDate
    })
    this.parseTime()
  }

  parseTime() {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    currentDate = currentDate.valueOf()
    this.allTrips.filter(trip => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
      } else {
        let givenDate = new Date(trip.date).valueOf()
        if (givenDate < currentDate) {
          this.pastTrips.push(trip)
        } else if (givenDate === currentDate) {
          this.presentTrips.push(trip)
        } else if (givenDate > currentDate) {
          this.futureTrips.push(trip)
        }
      }
    })
  }
}

module.exports = User;