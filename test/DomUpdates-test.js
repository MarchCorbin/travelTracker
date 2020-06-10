const spies = require('chai-spies');
const chai = require('chai');

chai.use(spies);

import Agency from '../src/Agency';
import {expect} from 'chai';
import domUpdates from '../src/DomUpdates';

describe('DomUpdates', function () {
  let user;
  let allTrips;
  let agency;
  let document;

  beforeEach(function () {
    global.domUpdates = {};
    global.document = {}
    agency = new Agency()
    user = {                  
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
    }
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
    }
  })      

  it('should welcome the user upon login', () => {
    chai.spy.on(domUpdates, ['welcomeMsg'], () => {})
    domUpdates.welcomeMsg(user)
    expect(domUpdates.welcomeMsg).to.have.been.called(1)
  })

  it('should show trips in the past', () => {
    chai.spy.on(domUpdates, ['showPastTrips'], () => {})
    domUpdates.showPastTrips(user, allTrips)
    expect(domUpdates.showPastTrips).to.be.called(1)
  })

  it('should show trips happening in the present', () => {
    chai.spy.on(domUpdates, ['showPresentTrips'], () => {})
    domUpdates.showPresentTrips(user, allTrips)
    expect(domUpdates.showPresentTrips).to.be.called(1)
  })

  it('should show trips happening in the future', () => {
    chai.spy.on(domUpdates, ['showFutureTrips'], () => {})
    domUpdates.showFutureTrips(user, allTrips)
    expect(domUpdates.showFutureTrips).to.be.called(1)
  })

  it('should show trips still waiting for approval', () => {
    chai.spy.on(domUpdates, ['showPendingTrips'], () => {})
    domUpdates.showPendingTrips(user, allTrips)
    expect(domUpdates.showPendingTrips).to.be.called(1)
  })
  it('should show the user how much their traveling hobby has cost them', () => {
    chai.spy.on(domUpdates, ['showFinancials'], () => {})
    domUpdates.showFinancials(user, allTrips)
    expect(domUpdates.showFinancials).to.be.called(1)
  })

  it('should show the travelers currently on trips to the agent', () => {
    chai.spy.on(domUpdates, ['showTodayTravelers'], () => {})
    domUpdates.showTodayTravelers(agency)
    expect(domUpdates.showTodayTravelers).to.be.called(1)
  })

  it('should show the amount made this year 10% of totals from this year', () => {
    chai.spy.on(domUpdates, ['showAgencyGrandTotal'], () => {})
    domUpdates.showAgencyGrandTotal(agency)
    expect(domUpdates.showAgencyGrandTotal).to.be.called(1)
  })

  it('should should be able to update financials upon a new trip being approved', () => {
    chai.spy.on(domUpdates, ['updateTrips'], () => {})
    domUpdates.updateTrips(agency)
    expect(domUpdates.updateTrips).to.be.called(1)
  })
  
})