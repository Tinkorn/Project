import { render, fireEvent, screen } from '@testing-library/react';
import False_Position from '../unit1/False_Position';

describe('False_Position', () => {
  test('renders False_Position component', () => {
    render(<False_Position />);
    const headerElement = screen.getByText(/False Position/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('enter equation and intervals and click calculate', () => {
    render(<False_Position />);

    const equationInput = screen.getByLabelText(/Input f\(x\)/i);
    fireEvent.change(equationInput, { target: { value: 'x^2 - 5' } });

    const xlInput = screen.getByLabelText(/Input XL/i);
    fireEvent.change(xlInput, { target: { value: '1' } });

    const xrInput = screen.getByLabelText(/Input XR/i);
    fireEvent.change(xrInput, { target: { value: '3' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    const answerElement = screen.getByText(/Answer =/i);
    expect(answerElement).toBeInTheDocument();
  });
});