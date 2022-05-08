import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DishForm from './DishForm';

describe('DishForm', () => {
  it('is rendered', () => {
    render(<DishForm />);
    const label = screen.getByText(/Dish Name/i);
    expect(label).toBeInTheDocument();
  });
});
describe('Name Input', () => {
  it('dislplays value when user types', () => {
    render(<DishForm />);
    const input = screen.getByPlaceholderText(
      /Please enter name of your dish/i
    );
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'Test');
    expect(input).toHaveValue('Test');
  });
});
describe('Time Input', () => {
  it('dislplays value when user types', () => {
    render(<DishForm />);
    const input = screen.getByPlaceholderText(/hh:mm:ss/i);
    expect(input).toBeInTheDocument();
    userEvent.type(input, '00:30:50');
    expect(input).toHaveValue('00:30:50');
  });
});
describe('Type Select', () => {
  it('is rendered with default value', () => {
    render(<DishForm />);
    const input = screen.getByText(/pizza/i);
    expect(input).toBeInTheDocument();
  });
});
describe('Submit button', () => {
  it('is rendered', () => {
    render(<DishForm />);
    const submit = screen.getByText(/submit/i);
    expect(submit).toBeInTheDocument();
  });
});
describe('Reset button', () => {
  it('is rendered and returns default values when clicked', () => {
    render(<DishForm />);
    const reset = screen.getByText(/reset/i);
    expect(reset).toBeInTheDocument();
    userEvent.click(reset);
    const nameInput = screen.getByPlaceholderText(
      /Please enter name of your dish/i
    );
    const timeInput = screen.getByPlaceholderText(/hh:mm:ss/i);
    const selectInput = screen.getByText(/pizza/i);
    const diameterInput = screen.getByPlaceholderText(
      'How large should be your pizza?'
    );
    const nrOfSlicesInput = screen.getByPlaceholderText(
      'Please enter number of slices'
    );

    expect(nameInput).toHaveValue('');
    expect(timeInput).toHaveValue('');
    expect(selectInput).toHaveValue('pizza');
    expect(diameterInput).toHaveValue(null);
    expect(nrOfSlicesInput).toHaveValue(null);
  });
});
