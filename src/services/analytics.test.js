import { makeAnalyticsCall } from './analytics';
import ReactGA from 'react-ga4';
jest.mock('react-ga4');

describe('(Service) analytics', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('makeAnalyticsCall', () => {
    it('should make a call to Google Analytics via the react-ga4 package', () => {
      makeAnalyticsCall();
      expect(ReactGA.event.mock.calls.length).toBe(1);
    });

    it('should make a call to Google Analytics with the correct event name and options', () => {
      const mockEventName = 'test-event';
      const mockEventOptions = {
        hello: 'world',
      };

      makeAnalyticsCall(mockEventName, mockEventOptions);
      expect(ReactGA.event.mock.calls.length).toBe(1);
      expect(ReactGA.event.mock.calls[0][0]).toBe(mockEventName);
      expect(ReactGA.event.mock.calls[0][1]).toStrictEqual(mockEventOptions);
    });
  });
});
