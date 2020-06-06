
let domUpdates = {

  welcomeMsg(user) {
    const welcomeMsg = document.querySelector('.welcome-traveler')
    console.log(user)
    let fnHTML = `<h2>welcome ${user.name} you are a very good ${user.travelerType}!</h2>`
    welcomeMsg.insertAdjacentHTML("afterbegin", fnHTML)
  },

  showPastTrips(user, allTrips) {
    console.log(allTrips)
    console.log(user)
  }
   
    
  
  
};

export default domUpdates;