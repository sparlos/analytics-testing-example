import ReactGA from 'react-ga4';

export function makeAnalyticsCall(eventName, options) {
  ReactGA.event(eventName, options);
}
