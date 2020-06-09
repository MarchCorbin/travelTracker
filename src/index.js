// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
var User = require('./User.js')
var TravelerRepo = require('./Traveler-repo.js')
var TripRepo = require('./Trip-repo.js')
var Agency = require('./Agency.js')
import './css/base.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import domUpdates from './DomUpdates';

console.log('This is the JavaScript entry file - your code begins here.');

const loginWindow = document.querySelector('.login-window')
const loginUserName = document.querySelector('.login-username')
const loginPassword = document.querySelector('.login-password')
const loginBtn = document.querySelector('.login-btn')
const travelerDash = document.querySelector('.traveler-dash')
const agencyDash = document.querySelector('.agency-dash')
const requestTripBtn = document.querySelector('.request-trip-btn')

agencyDash.addEventListener('click', function(event) {
  let idNum = Number(event.target.dataset.id)
  let status = event.target.dataset.status
  if (event.target.classList.contains('accepting')) {
    modifySingleTrip(idNum, status)
  } else if (event.target.classList.contains('delete')) {
    deleteTrip(idNum)
  }
})
loginBtn.addEventListener('click', login)



let user;
let travelersRepo;
let tripRepo;
let allDestinations;
let agency;

document.onLoad = onLoadHandler()

function onLoadHandler() {
  getAllTrips()
  getAllDestinations()
  getAllTravelers()
  // modifySingleTrip()
}

function getAllTrips() {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
    .then(response => response.json())
    .then(trip => createTripRepo(trip.trips))
    .catch(err => console.error(err.message))
}

function deleteTrip(idNum) {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      "id": idNum
    })
  })
    .then(response => response.json())
    .then(trip => console.log(trip, 'trip'))
    .catch(err => console.error(err.message))
}
 
function modifySingleTrip(id, status) {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      id,
      status
    })
  })
    .then(response => response.json())
    .then(trip => console.log(trip, 'trip'))
    .catch(err => console.error(err.message))
}



function getAllTravelers() {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
    .then(response => response.json())
    .then(data => createTravelersRepo(data.travelers))
    .catch(err => console.error(err.message))
}

function getSingleUser(id) {
  fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
    .then(response => response.json())
    .then(data => createNewUser(data))
    .catch(err => console.error(err.message))
}

function getAllDestinations() {
  fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations`)
    .then(response => response.json())
    .then(data => createDestinationRepo(data.destinations))
    .catch(err => console.error(err.message))
}

function createTravelersRepo(travelersData) {
  travelersRepo = new TravelerRepo(travelersData)

}

function createDestinationRepo(destinations) {
  allDestinations = destinations
}

function createNewUser(data) {
  let user = new User(data)
  getPastTrips(data.id, user)
  domUpdates.welcomeMsg(user)
  user.oraganizeTime()
  domUpdates.showPastTrips(user, allDestinations)

}



function getPastTrips(id, user) {
  let alltrips = tripRepo.allTrips
  let filtered = alltrips.filter(trip => trip.userID === id)
  user.allTrips = filtered
}

function createTripRepo(data) {
  tripRepo = new TripRepo(data)
}

// LOG IN
function login() {
  let name = loginUserName.value
  let password = loginPassword.value
  if (password !== 'travel2020') {
    alert('Invalid Credentials')
  } else if (name.includes('traveler')) {
    travelerLogin()
  } else if (name.includes('agency')) {
    agencyLogin()
  }
}

function offLogin(destination) {
  loginWindow.classList.add('hide')
  destination.classList.remove('hide')
}

function agencyLogin() {
  offLogin(agencyDash)
  let agency = new Agency()
  agency.userRepos = travelersRepo
  agency.destinationRepo = allDestinations
  agency.tripRepo = tripRepo
  agency.fixDates()
  domUpdates.showPendingTripsAll(agency)
}

function travelerLogin() {
  let id = loginUserName.value.slice(8)
  offLogin(travelerDash)
  getSingleUser(id)
  getAllDestinations()
}



// username: agency
// password: travel2020

// username: traveler50(where 50 is the ID of the user)
// password: travel2020