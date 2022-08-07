import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { makeAnalyticsCall } from './services/analytics';

jest.mock('./services/analytics');

describe('App tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
