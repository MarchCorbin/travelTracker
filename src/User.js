class User {
  constructor(userInfo) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelerType = userInfo.travelerType
    this.pastTrips = []
  }
  getTotalSpent() {

  }

  filterTrips(searchType, searchValue) {

  }

  requestTrip(date, duration, numberOfTravelers) {

  }
}

module.exports = User;