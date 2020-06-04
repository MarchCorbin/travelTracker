// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

const loginWindow = document.querySelector('.login-window')
const loginUserName = document.querySelector('.login-username')
const loginPassword = document.querySelector('.login-password')
const loginBtn = document.querySelector('.login-btn')
const travelerDash = document.querySelector('.traveler-dash')
const agencyDash = document.querySelector('.agency-dash')

loginBtn.addEventListener('click', login)


function fetchData() {

}

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
}

function travelerLogin() {
offLogin(travelerDash)
}

// username: agency
// password: travel2020

// username: traveler50(where 50 is the ID of the user)
// password: travel2020