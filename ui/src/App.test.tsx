import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Carrot Header and Footer', () => {
  render(<App logo='BySmalllikeTheNounProject.svg' />);
  const elemHeader = screen.getByText(/Carrot Header/i);
  expect(elemHeader).toBeInTheDocument();
  const elemFooter = screen.getByText(/Carrot Footer/i);
  expect(elemFooter).toBeInTheDocument();
});
