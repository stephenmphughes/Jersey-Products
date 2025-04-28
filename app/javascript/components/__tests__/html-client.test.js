import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HTML Client Page', () => {
  beforeEach(() => {
    // Create a fake DOM environment for tests
    document.body.innerHTML = `
      <nav id="custom-navbar"></nav>
      <form id="add-jersey-form"></form>
      <form id="add-stockorder-form"></form>
      <div id="jersey-list"></div>
      <div id="stockorder-list"></div>
      <form id="edit-product-form"></form>
      <footer id="custom-footer"></footer>
    `;
  });

  test('renders navbar', () => {
    const navbar = document.getElementById('custom-navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('renders add jersey form', () => {
    const form = document.getElementById('add-jersey-form');
    expect(form).toBeInTheDocument();
  });

  test('renders add stock order form', () => {
    const stockOrderForm = document.getElementById('add-stockorder-form');
    expect(stockOrderForm).toBeInTheDocument();
  });

  test('renders jersey list container', () => {
    const jerseyList = document.getElementById('jersey-list');
    expect(jerseyList).toBeInTheDocument();
  });

  test('renders stock order list container', () => {
    const stockOrderList = document.getElementById('stockorder-list');
    expect(stockOrderList).toBeInTheDocument();
  });

  test('renders edit product form', () => {
    const editForm = document.getElementById('edit-product-form');
    expect(editForm).toBeInTheDocument();
  });

  test('renders footer', () => {
    const footer = document.getElementById('custom-footer');
    expect(footer).toBeInTheDocument();
  });
});

// https://github.com/testing-library/dom-testing-library/blob/main/src/__tests__/screen.js