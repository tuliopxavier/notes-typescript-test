import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '.';

describe('Header', () => {
  it('should be on the page', async () => {
    render(<Header />);

    const header = screen.getByText('My Notes');
    expect(header).toBeInTheDocument();
  })
})
