// StockOrders.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StockOrders from '../StockOrders';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch globally for products and stock orders
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/v1/products')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          data: [
            { id: 1, attributes: { name: 'TEST JERSEY' } }
          ]
        })
      });
    }
    if (url.includes('/api/v1/stock_orders')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          data: []
        })
      });
    }
    return Promise.reject(new Error('Invalid fetch URL'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('StockOrders Component', () => {
  test('renders Stock Orders form inputs', async () => {
    render(
      <BrowserRouter>
        <StockOrders />
      </BrowserRouter>
    );

    // Wait for the async fetch to complete
    await waitFor(() => {
      expect(screen.getByLabelText(/Select Jersey/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sizes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comments/i)).toBeInTheDocument();
  });

  test('allows typing into form fields', async () => {
    render(
      <BrowserRouter>
        <StockOrders />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Select Jersey/i)).toBeInTheDocument();
    });

    const quantityInput = screen.getByLabelText(/Quantity/i);
    fireEvent.change(quantityInput, { target: { value: '5' } });
    expect(quantityInput.value).toBe('5');

    const sizesInput = screen.getByLabelText(/Sizes/i);
    fireEvent.change(sizesInput, { target: { value: 'M,L' } });
    expect(sizesInput.value).toBe('M,L');

    const commentsInput = screen.getByLabelText(/Comments/i);
    fireEvent.change(commentsInput, { target: { value: 'Urgent order' } });
    expect(commentsInput.value).toBe('Urgent order');
  });
});



// https://handsonreact.com/docs/labs/js/T6-TestingForms
//https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/