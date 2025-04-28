import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProduct from '../AddProduct';
import { BrowserRouter } from 'react-router-dom';

describe('AddProduct Component', () => {
  test('renders form fields', () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Available/i)).toBeInTheDocument();
  });

  test('can type into inputs', () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Jersey' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Cool description' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '49.99' } });

    expect(screen.getByDisplayValue('Test Jersey')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Cool description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('49.99')).toBeInTheDocument();
  });

  test('checkbox can be toggled', () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );

    const availableCheckbox = screen.getByLabelText(/Available/i);
    expect(availableCheckbox).toBeChecked();

    fireEvent.click(availableCheckbox);
    expect(availableCheckbox).not.toBeChecked();

    fireEvent.click(availableCheckbox);
    expect(availableCheckbox).toBeChecked();
  });
});

// https://handsonreact.com/docs/labs/js/T6-TestingForms
//https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/