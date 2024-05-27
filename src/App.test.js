import { render, screen } from '@testing-library/react';
import App from './App';

test('renders both components in main page', () => {
  render(<App />);
  const minMaxElement = screen.getByText(/Min Max Range/i);
  const fixedElement = screen.getByText(/Fixed Range/i);
  expect(minMaxElement).toBeInTheDocument();
  expect(fixedElement).toBeInTheDocument();
});
