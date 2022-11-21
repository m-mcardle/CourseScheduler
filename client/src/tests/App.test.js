import { render, screen } from '@testing-library/react';
import App from '../App';

// WARNING: Mac user's might run into issues with watchman if this project is nested inside Documents or Desktop
// https://github.com/facebook/watchman/issues/751

test.skip('renders course selection title', () => {
  render(<App />);
  const titleElement = screen.getByText(/UoG Course Selection/i);
  expect(titleElement).toBeInTheDocument();
});
