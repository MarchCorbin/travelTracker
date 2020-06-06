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
      let goodDate = `${splitter[2]}/${splitter[1]}/${splitter[0]}`
      trip.date = goodDate
    })
    this.parseTime()
  }

  parseTime() {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    currentDate = currentDate.valueOf()
    this.allTrips.filter(trip => {
      let givenDate = new Date(trip.date).valueOf()
      console.log(currentDate)
      if (givenDate < currentDate) {
        // console.log('past working')
        this.pastTrips.push(trip)
      } else if (givenDate === currentDate) {
        this.presentTrips.push(trip)
      } else if (givenDate > currentDate) {
        this.futureTrips.push(trip)
      }
    })
    console.log(this.pastTrips)
    console.log(this.presentTrips)
    console.log(this.futureTrips)
  }
}

module.exports = User;