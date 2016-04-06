import sinon from 'sinon';
import { expect } from 'chai';
import * as actions from '../../app/actions/SearchPostActions';

/* eslint no-unused-expressions: 0 */
describe('actions', () => {
  it('receivedSearchPost should create receivedSearchPost action', (done) => {
    try {
      const result = actions.receivedSearchPost({
        items: [{
          _index: 'trademuch',
          _type: 'post',
          _id: 'AVOilowvBv-U6beQq8yU',
          _score: 2.3381503,
          _source: {
            id: 4,
            title: '二手iphone',
            location: {
              lat: 80.1,
              lon: 100,
            },
          },
        }],
      });
      result.type.should.be.an.equal('RECEIVED_SEARCH_POST');
      result.data[0]._source.id.should.be.an.equal(4);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('incrementIfOdd should create increment action', () => {
    const fn = actions.incrementIfOdd();
    expect(fn).to.be.a('function');
    const dispatch = sinon.spy();
    const getState = () => ({ counter: Immutable.Map({ counter: 1 }) });
    fn(dispatch, getState);
    expect(dispatch.calledWith({ type: 'increment' })).to.be.true;
  });
});
