import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { makeAnalyticsCall } from './services/analytics';

jest.mock('./services/analytics', () => {
  return {
    ...jest.requireActual('react-ga4'),
    makeAnalyticsCall: jest.fn(),
  };
});

describe('App tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('base functionality', () => {
    it('properly increments the displayed value on click of the button', () => {
      render(<App />);
      const clickAmount = screen.getByTestId('click-amount');
      expect(clickAmount).toHaveTextContent('0');
      const incrementButton = screen.getByRole('button');
      fireEvent.click(incrementButton);
      const updatedClickAmount = screen.getByTestId('click-amount');
      expect(updatedClickAmount).toHaveTextContent('1');
    });
  });

  describe('Analytics callouts', () => {
    it('should make an analytics call when the button is clicked', () => {
      render(<App />);
      const incrementButton = screen.getByRole('button');
      fireEvent.click(incrementButton);
      expect(makeAnalyticsCall).toHaveBeenCalledTimes(1);
    });

    it('should make an analytics call with the correct properties when the button is clicked', () => {
      render(<App />);
      const incrementButton = screen.getByRole('button');
      fireEvent.click(incrementButton);
      expect(makeAnalyticsCall).toHaveBeenCalledWith(
        'increment_button_clicked',
        {
          click_amount: 1,
        }
      );

      fireEvent.click(incrementButton);
      expect(makeAnalyticsCall).toHaveBeenCalledWith(
        'increment_button_clicked',
        {
          click_amount: 2,
        }
      );
    });
  });
});
