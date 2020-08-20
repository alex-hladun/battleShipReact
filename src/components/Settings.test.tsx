import React from 'react';
import { render } from '@testing-library/react';
import Settings from './Settings';

test('Renders the ship list properly', () => {
  const { getByText } = render(<Settings />);
  const carrier = getByText(/Carrier/i);
  expect(carrier).toBeInTheDocument();
});
