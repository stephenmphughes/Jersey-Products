// FIRST mock react-router-dom BEFORE importing Product
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: () => jest.fn(), // mock navigate if needed
  }));
  
  import React from 'react';
  import { render, screen } from '@testing-library/react';
  import Product from '../Product';
  import { BrowserRouter } from 'react-router-dom';
  import { useParams } from 'react-router-dom';
  
  // Reset mocks between tests
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  // Mock fetch globally
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { attributes: {} } }),
      })
    );
  });
  
  describe('Product Component', () => {
    test('renders Loading text if no product is loaded', async () => {
      // now just set the return value directly
      useParams.mockReturnValue({ id: 1 });
  
      render(
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      );
  
      expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    });
  
    test('renders form fields when product is available', async () => {
      useParams.mockReturnValue({ id: 1 });
  
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            data: {
              attributes: {
                name: "Sample Jersey",
                description: "Cool jersey",
                price: "49.99",
                available: true,
                image_url: ""
              }
            }
          })
        })
      );
  
      render(
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      );
  
      expect(await screen.findByDisplayValue('Sample Jersey')).toBeInTheDocument();
      expect(await screen.findByDisplayValue('Cool jersey')).toBeInTheDocument();
    });
  });
  


//https://handsonreact.com/docs/labs/js/T6-TestingForms
//https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve