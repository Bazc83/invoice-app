/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Example from './Example';

// describe('something truthy and falsy', () => {
//   it('true to be true', () => {
//     expect(true).toBe(true);
//   });

//   it('false to be false', () => {
//     expect(false).toBe(false);
//   });
// });

describe('App', () => {
  it('renders headline', () => {
    render(<Example />);

    // expect(screen.getByText(/xample/)).toBeInTheDocument();
expect("div")
    // expect(screen.getByRole('button')).toBeInTheDocument();
    screen.debug();

    // check if App components renders headline
  });
});
