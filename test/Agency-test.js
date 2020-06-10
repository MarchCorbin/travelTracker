const chai = require('chai');
const expect = chai.expect;
const Agency = require('../src/Agency.js');
const User = require('../src/User.js')


describe('Agency', function() {
  let agency;
  let user;
  let user1;
  let destinationRepo1;
  let tripRepo1

  beforeEach(function() {
    agency = new Agency()
    user1 = {
      "id": 5,
      "name": "Tiffy Grout",
      "travelerType": "thrill-seeker"
    }
    tripRepo1 = {
      "id": 31,
      "userID": 11,
      "destinationID": 33,
      "travelers": 3,
      "date": "2020/12/19",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    },
    destinationRepo1 = {
      "id": 8,
      "destination": "Tokyo, Japan",
      "estimatedLodgingCostPerDay": 125,
      "estimatedFlightCostPerPerson": 1000,
      "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
      "alt": "city with people walking in crosswalk and brightly lit shops at night"
    },
    user = new User(user1)
    agency.pendingTrips = user1
    agency.userRepos = user1
    agency.destinationRepo = destinationRepo1
    agency.tripRepo = tripRepo1
  })

  it('should be a function', function() {
    expect(Agency).to.be.a('function')
  })

  it('should be able to keep all of the pending trips', function() {
    expect(agency.pendingTrips).to.equal(user1)
  })

  it('should be able to hold onto all of the userRepos', function() {
    expect(agency.userRepos).to.equal(user1)
  })

  it('should be able to hold the tripRepos', function() {
    expect(agency.tripRepo).to.equal(tripRepo1)
  })

  it('should be able to store the destinationRepos', function() {
    expect(agency.destinationRepo).to.equal(destinationRepo1)
  })
})