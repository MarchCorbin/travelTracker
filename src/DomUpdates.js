
let domUpdates = {

  welcomeMsg(user) {
    const welcomeMsg = document.querySelector('.welcome-traveler')
    const fnHTML = `<h2>welcome ${user.name} you are a very good ${user.travelerType}!</h2>`
    welcomeMsg.insertAdjacentHTML("afterbegin", fnHTML)
  },

  showPastTrips(user, allTrips) {
    // console.log(user.allTrips)
    const destIDs = user.allTrips.map(trip => trip.destinationID)
    const userTrips = allTrips.filter(trip => {
      if (destIDs.includes(trip.id)) {
        return trip
      }
    })

    const pastTrips = document.querySelector('.past-trips')
    userTrips.forEach(trip => { 
    //   console.log(user, 'user')
      // toHere.insertAdjacentHTML("afterbegin", `
      // <img src="${trip.image}" alt="location image">`)
    })
  
  }
   

    
  
  
};

export default domUpdates;