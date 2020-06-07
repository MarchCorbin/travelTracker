
let domUpdates = {

  welcomeMsg(user) {
    const welcomeMsg = document.querySelector('.welcome-traveler')
    const fnHTML = `<h2>welcome ${user.name} you are a very good ${user.travelerType}!</h2>`
    welcomeMsg.insertAdjacentHTML("afterbegin", fnHTML)
  },

  showPastTrips(user, allTrips) {
    const destIDs = user.pastTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    const pastTrips = document.querySelector('.past-trips')
    userTrips.forEach(trip => { 
      pastTrips.insertAdjacentHTML("afterbegin", `
      <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
    })
    this.showPresentTrips(user, allTrips)
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
    this.showFutureTrips(user, allTrips)
  },
   
  showFutureTrips(user, allTrips) {
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
    this.showPendingTrips(user, allTrips)
        
        
  },
  showPendingTrips(user, allTrips) {
    const destIDs = user.pendingTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    const pendingTrips = document.querySelector('.pending-trips')
    userTrips.forEach(trip => {
      pendingTrips.insertAdjacentHTML('afterbegin', `
    <section class="vacation-box">
      <h4 class="destination-text">${trip.destination}</h4>
      <img class="location-img"src="${trip.image}" alt="location image"></section>`)
    })

    this.financials(user, allTrips)
  },

  financials(user, allTrips) {
    let numTravs = user.allTrips.map(trip => trip.travelers)
    const destIDs = user.allTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })
    let costPerPerson = userTrips.map(trip => trip.estimatedFlightCostPerPerson)
    var sum = 0;
    for (var i = 0; i < costPerPerson.length; i++) {
      sum += costPerPerson[i] * numTravs[i];
    }
    let percent = sum * 0.1
    let grandTotal = sum += percent
    console.log(grandTotal, 'grandtotal');
    const travelSpent = document.querySelector('.travel-spent')
    travelSpent.insertAdjacentHTML("beforebegin", `<h2 class=cost-text>$${grandTotal}</h2>`)
  }
  
};

export default domUpdates;