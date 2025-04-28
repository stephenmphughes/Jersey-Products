// app/javascript/components/__tests__/StockOrdersList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StockOrdersList from '../StockOrdersList';

describe('StockOrdersList Component', () => {
  const mockOrders = [
    {
      id: 1,
      attributes: {
        product_name: 'Test Jersey',
        quantity: 5,
        sizes: 'M,L',
        comment: 'Fast delivery',
      },
    },
    {
      id: 2,
      attributes: {
        product_name: 'Another Jersey',
        quantity: 2,
        sizes: 'S,M',
        comment: 'Urgent order',
      },
    },
  ];

  test('renders orders passed as props', () => {
    render(<StockOrdersList orders={mockOrders} onDelete={() => {}} />);

    expect(screen.getByText(/Test Jersey/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Jersey/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByText(/M,L/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast delivery/i)).toBeInTheDocument();
  });

  test('shows message when no orders', () => {
    render(<StockOrdersList orders={[]} onDelete={() => {}} />);

    expect(screen.getByText(/No stock orders yet/i)).toBeInTheDocument();
  });

  test('calls onDelete when Delete button is clicked', () => {
    const mockDelete = jest.fn();
    render(<StockOrdersList orders={mockOrders} onDelete={mockDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});



// https://testing-library.com/docs/example-intro

