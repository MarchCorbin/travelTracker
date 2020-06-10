
let domUpdates = {

  welcomeMsg(user) {
    const welcomeMsg = document.querySelector('.welcome-traveler')
    const fnHTML = `<h2>welcome ${user.name} you are a very good ${user.travelerType}!</h2>`
    welcomeMsg.insertAdjacentHTML("afterbegin", fnHTML)
  },

  populateUser(user, allTrips) {
    this.showPastTrips(user, allTrips)
    this.showPresentTrips(user, allTrips)
    this.showPendingTrips(user, allTrips)
    this.showFutureTrips(user, allTrips)
    this.showFinancials(user, allTrips)
  },

  showPastTrips(user, allTrips) {
    const pastTrips = document.querySelector('.past-trips')
    const destIDs = user.pastTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    userTrips.forEach(trip => { 
      pastTrips.insertAdjacentHTML("afterbegin", `
      <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
    })
  },

  showPresentTrips(user, allTrips) {
    const destIDs = user.presentTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    const presentTrips = document.querySelector('.present-trips')
    userTrips.forEach(trip => {
      presentTrips.insertAdjacentHTML('afterbegin', `
          <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
    })
  },
   
  showFutureTrips(user, allTrips) {
    if (user.futureTrips !== undefined) {
      const destIDs = user.futureTrips.map(trip => trip.destinationID)
      const userTrips = allTrips.filter(trip => {
        if (destIDs.includes(trip.id)) {
          return trip
        }
      })
      const futureTrips = document.querySelector('.future-trips')
      userTrips.forEach(trip => {
        futureTrips.insertAdjacentHTML('afterbegin', `
           <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
      })
    }     
  },
  
  showPendingTrips(user, allDestinations) {
    const destIDs = user.pendingTrips.map(trip => trip.destinationID)
    const userTrips = allDestinations.filter(trip => {
      if (destIDs.includes(trip.id) && trip !== undefined) {
        return true
      }
    })
    const pendingTrips = document.querySelector('.pending-trips')
    userTrips.forEach(trip => {
      if (trip !== undefined) {
        pendingTrips.insertAdjacentHTML('afterbegin', `
    <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
      }
    })
  },

  showFinancials(user, allTrips) {
    const travelSpent = document.querySelector('.travel-spent')
    let numTravs = user.allTrips.map(trip => trip.travelers)
    let numDuration = user.allTrips.map(trip => trip.duration)
    const destIDs = user.allTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    let costPerLodging = userTrips.map(trip => trip.estimatedLodgingCostPerDay)
    let costPerPerson = userTrips.map(trip => trip.estimatedFlightCostPerPerson)
    var sum = 0;
    for (var i = 0; i < costPerPerson.length; i++) {
      sum += costPerPerson[i] * numTravs[i]  
    }
    for (var i = 0; i < numDuration.length; i++) {
      sum += numDuration[i] * costPerLodging[i]
    }
    let percent = sum * 0.1
    let grandTotal = sum += percent
    if (!grandTotal == 0) {
      travelSpent.insertAdjacentHTML("beforebegin", `<h2 class=cost-text>$${grandTotal}</h2>`)
    }
  }, 

  showPendingTripsAll(agency) {
    let pendingTripsSection = document.querySelector('.pending-trips-agent')
    let allPendingTrips = agency.pendingTrips.map(trip => { 
      let destination = agency.destinationRepo.find(destination => destination.id === trip.destinationID)
      let traveler = agency.userRepos.userData.find(user => user.id === trip.userID)
      destination['tripID'] = trip.id
      destination['name'] = traveler.name
      destination['numOfTravs'] = trip.travelers
      return destination
    })
    allPendingTrips.forEach(trip => {
      pendingTripsSection.insertAdjacentHTML('afterbegin', `
     <section class="pending-box">ID:${trip.tripID}<br>Name:${trip.name}<br>Where to:${trip.destination}<br># of travelers:${trip.numOfTravs}<button data-id ="${trip.tripID}" data-status="approved" class="accepting">Accept</button><button data-id="${trip.tripID}" class="delete">Deny</button></section>
      `)
    })
    this.showTodayTravelers(agency)
  },

  showTodayTravelers(agency) {
    let travsOnTrips = document.querySelector('.travelers-on-trips')
    let currentDate = new Date().setHours(0, 0, 0, 0);
    currentDate = currentDate.valueOf()
    let result = agency.tripRepo.allTrips.filter(trip => {
      let givDate = new Date(trip.date).valueOf()
      if (givDate === currentDate) {
        return true
      }
    })
    let destination = agency.destinationRepo.filter(place => place.id === result[0].destinationID)
    let ourName = agency.userRepos.userData.filter(person => result[0].userID === person.id)
    result.forEach(trav => {
      travsOnTrips.insertAdjacentHTML("afterbegin", `Today ${ourName[0].name} is currently in ${destination[0].destination}!
     `)
    })
    this.showAgencyGrandTotal(agency)
  },

  showAgencyGrandTotal(agency) {
    const totalIncome = document.querySelector('.total-income')
    let currentDate = new Date().setHours(0, 0, 0, 0);
    let currentYear = new Date().getFullYear().valueOf()
    currentDate = currentDate.valueOf()
    let thisYearTrips = agency.tripRepo.allTrips.filter(trip => {
      let givenYear = trip.date.split('/')
      if (currentYear == givenYear[2]) {
        return true
      }
    })
    let totaling = thisYearTrips.map(trip => {
      let where = agency.destinationRepo.find(location => location.id === trip.destinationID)
      let flightCost = where.estimatedFlightCostPerPerson *= trip.travelers
      let lodgingCost = where.estimatedLodgingCostPerDay *= trip.duration
      return flightCost += lodgingCost
    })
    let grandTotal = totaling.reduce((a, b) => a += b, 0)
    let agencyTotal = Math.floor(grandTotal / 10)
    totalIncome.insertAdjacentHTML("afterbegin", `
      <h3>$${Number(agencyTotal)}</h3>
      `)
  },

  updateTripsFinancials(country, duration, allDestinations, numTravs) {
    const requestForm = document.querySelector('.traveler-request-form')
    const costsPage = document.querySelector('.costs-page')
    requestForm.classList.add('hide')
    costsPage.classList.remove('hide')
    let selectedCountry = allDestinations.find(place => place.id == country)
    let flightCost = selectedCountry.estimatedFlightCostPerPerson * numTravs
    let lodgeCost = selectedCountry.estimatedLodgingCostPerDay * duration
    let agentFee = (flightCost + lodgeCost) / 10
    costsPage.insertAdjacentHTML('afterbegin', `<h3>Flight Costs: $${flightCost}</h3><br> <h3>Lodging Costs: $${lodgeCost}</h3><br><h3> Agents fee: $${agentFee}</h3><br> <h3>Grand Total: $${flightCost + agentFee + lodgeCost}</h3>`)
  }
}

export default domUpdates;