class User {
  constructor(userInfo) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelerType = userInfo.travelerType
    this.pastTrips = []
  }
  getTotalSpent() {

  }

  addPastTrips(flights) {
    if (flights.status !== 'pending') {
      this.pastTrips.push(flights)
    }
  }

  requestTrip(date, duration, numberOfTravelers) {

  }
}

module.exports = User;