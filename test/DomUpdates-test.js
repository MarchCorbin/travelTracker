const spies = require('chai-spies');
const chai = require('chai');
chai.use(spies);

import {expect} from 'chai';
import domUpdates from '../src/DomUpdates';

describe('domUpdates', function () {
  let user;
  let allTrips;

  beforeEach(function () {
    global.domUpdates = {};
    user = {                  
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
    },
    allTrips = {
      "id": 1,
      "userID": 2,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 2,
      "userID": 2,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    }, {
      "id": 3,
      "userID": 2,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    },
            

    it('should welcome the user upon login', () => {
      chai.spy.on(domUpdates, ['welcomeMsg'], () => {})
      domUpdates.welcomeMsg(user)
      expect(domUpdates.welcomeMsg).to.have.been.called(1)
    })

    it('should show your past trips ALL OF THEM!', () => {
        chai.spy.on(domUpdates, ['showPastTrips'], () => {})
        domUpdates.showPastTrips(user, allTrips)
        expect(domUpdates.showPastTrips).to.be.called(1)
    })
  })
})

//   it('welcomeUser should display a welcome message', () => {
//       chai.spy.on(domUpdates, ['welcomeUser'], () => {});

//       domUpdates.welcomeUser(user, pantry, ingredientsData);

//       expect(domUpdates.welcomeUser).to.have.been.called(1);
//       expect(domUpdates.welcomeUser).to.have.been.called.with(user, pantry, ingredientsData);
//   });