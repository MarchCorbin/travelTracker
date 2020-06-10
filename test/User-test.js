const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User.js');


describe('User', function() {
  let user1, user2, user, allTrips


  beforeEach(function() {
    allTrips = {
      "id": 29,
      "userID": 42,
      "destinationID": 25,
      "travelers": 3,
      "date": "2019/08/30",
      "duration": 4,
      "status": "approved",
      "suggestedActivities": []
    }
    user1 = {
      "id": 5,
      "name": "Tiffy Grout",
      "travelerType": "thrill-seeker"
    }
    user2 =  {
      "id": 6,
      "name": "Laverna Flawith",
      "travelerType": "shopper"
    }
    user = new User(user1)
  })

  it('should be a function', function() {
    expect(User).to.be.a('function')
  })
  it('should have the id for the user', function() {
    expect(user1.id).to.equal(5)
  })

  it('should recognize the users name', function() {
    expect(user1.name).to.equal('Tiffy Grout')
  })
  it('should be able to organize dates so they are readable', function() {
    user.organizeTime()
    expect(allTrips.date).to.equal("2019/08/30")
  })
})