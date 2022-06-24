import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { event } from 'react-ga4';

jest.mock('react-ga4', () => {
  return {
    ...jest.requireActual('react-ga4'),
    event: jest.fn(),
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
    it('should run the "increment_button_clicked" GA callout when the button is clicked', () => {
      render(<App />);
      const incrementButton = screen.getByRole('button');
      fireEvent.click(incrementButton);
      expect(event).toHaveBeenCalledTimes(1);
    });

    it('should run the "increment_button_clicked" GA callout with the correct properties', () => {
      render(<App />);
      const incrementButton = screen.getByRole('button');
      fireEvent.click(incrementButton);
      expect(event).toHaveBeenCalledWith('increment_button_clicked', {
        click_amount: 1,
      });

      fireEvent.click(incrementButton);
      expect(event).toHaveBeenCalledWith('increment_button_clicked', {
        click_amount: 2,
      });
    });
  });
});
