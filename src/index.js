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
// QUERY SELECTORS
const loginWindow = document.querySelector('.login-window')
const loginUserName = document.querySelector('.login-username')
const loginPassword = document.querySelector('.login-password')
const loginBtn = document.querySelector('.login-btn')
const travelerDash = document.querySelector('.traveler-dash')
const agencyDash = document.querySelector('.agency-dash')
const requestTripBtn = document.querySelector('.request-trip-btn')
const submitBtn = document.querySelector('.submit-btn')
const submitTrip = document.querySelector('.submit-trip')
const costsPage = document.querySelector('.costs-page')
const travelSpent = document.querySelector('.travel-spent')


// EVENT LISTENERS
loginBtn.addEventListener('click', login)
requestTripBtn.addEventListener('click', requestTrip)
submitBtn.addEventListener('click', requestTripSubmit)
submitTrip.addEventListener('click', submitTripProtocol)
agencyDash.addEventListener('click', function(event) {
  let idNum = Number(event.target.dataset.id)
  let status = event.target.dataset.status
  if (event.target.classList.contains('accepting')) {
    modifySingleTrip(idNum, status)
  } else if (event.target.classList.contains('delete')) {
    deleteTrip(idNum)
  }
})
  
  
let user;
let travelersRepo;
let tripRepo;
let allDestinations;
let agency;
let allTrips
let id;

document.onLoad = onLoadHandler()

function onLoadHandler() {
  getAllTrips()
  getAllDestinations()
  getAllTravelers()
}


// FETCH AND POST FUNCTIONS
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

function updateTripData(country, givDate, duration, userInfo, numTravs) {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "id": Date.now(),
      "userID": userInfo.userID,
      "destinationID": Number(country),
      "travelers": Number(numTravs),
      "date": `${givDate}`,
      "duration": Number(duration),
      "status": "pending", 
      "suggestedActivities": []
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


// CREATE REPOSITORIES
function createTravelersRepo(travelersData) {
  travelersRepo = new TravelerRepo(travelersData)
}

function createDestinationRepo(destinations) {
  allDestinations = destinations
}

function createNewUser(data) {
  user = new User(data)
  getPastTrips(data.id, user)
  domUpdates.welcomeMsg(user)
  user.organizeTime()
  domUpdates.populateUser(user, allDestinations)

}

function getPastTrips(id, user) {
  console.log(id, 'id')
  allTrips = tripRepo.allTrips
  let filtered = allTrips.filter(trip => trip.userID == id)
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
  agency = new Agency()
  agency.userRepos = travelersRepo
  agency.destinationRepo = allDestinations
  agency.tripRepo = tripRepo
  agency.fixDates()
  domUpdates.showPendingTripsAll(agency)
}

function travelerLogin() {
  id = loginUserName.value.slice(8)
  offLogin(travelerDash)
  getSingleUser(id)
  getAllDestinations()
}

// ADDING A NEW TRIP
function requestTrip() {
  const travelerRequestForm = document.querySelector('.traveler-request-form')
  travelerRequestForm.classList.remove('hide')
  travelerDash.classList.add('hide')
}

function submitTripProtocol() {
  travelerDash.classList.remove('hide')
  costsPage.classList.add('hide')
  travelSpent.innerHTML = ''
  domUpdates.showPendingTrips(user, allDestinations)
}

function requestTripSubmit() {
  const countryChoice = document.querySelector('.country-choice')
  const inputDuration = document.querySelector('.duration')
  const inputDate = document.querySelector('.date')
  const numTravs = document.querySelector('.num-of-travs')
  let country = countryChoice.value
  let date = inputDate.value
  let duration = inputDuration.value
  let numTravelers = numTravs.value
  let userInfo = tripRepo.allTrips.find(trip => trip.userID === user.id)
  let newDate = date.split('-').join('/')
  updateTripData(country, newDate, duration, userInfo, numTravelers)
  domUpdates.updateTrips(country, duration, allDestinations, numTravelers)
  updatePending(country, newDate, duration, userInfo,  numTravelers)
}

function updatePending(country, givDate, duration, userInfo, numTravs) {
  user.pendingTrips = []
  user.pendingTrips.push({
    "id": Date.now(),
    "userID": Number(userInfo.userID),
    "destinationID": Number(country),
    "travelers": Number(numTravs),
    "date": givDate,
    "duration": Number(duration),
    "status": "pending", 
    "suggestedActivities": []})
}