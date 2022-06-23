import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
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
