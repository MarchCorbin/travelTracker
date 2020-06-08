class Agency {
  constructor() {
    this.pendingTrips = []
    this.userRepos = []
    this.tripRepo = []
    this.destinationRepo = []
  }

  fixDates() {
    this.tripRepo.allTrips.map(trip => {
      let splitter = trip.date.split('/')
      let goodDate = `${splitter[1]}/${splitter[2]}/${splitter[0]}`
      trip.date = goodDate
      // console.log(this.pendingTrips, 'pending')
      // console.log(this.userRepos, 'userrepos')
      // console.log(this.tripRepo, 'triprepos');
    })
    this.addPending()
  }
  
  addPending() {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    currentDate = currentDate.valueOf()
    let givenDates = this.tripRepo.allTrips.filter(trip => {
      let givDate = new Date(trip.date.valueOf())
      if (givDate > currentDate) {
        return trip
      }
    })
    let filtered =  givenDates.filter(trip => trip.status === 'pending')
    this.pendingTrips = filtered
    console.log(this.pendingTrips);
    
  }



}

module.exports = Agency;