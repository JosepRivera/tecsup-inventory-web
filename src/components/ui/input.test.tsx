import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('Input Component', () => {
  it('should render the input element correctly', () => {
    render(<Input placeholder="Enter username" />);
    const inputElement = screen.getByPlaceholderText(/enter username/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should accept user string input', async () => {
    render(<Input placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText(/type here/i);
    
    await userEvent.type(inputElement, 'admin');
    expect(inputElement).toHaveValue('admin');
  });

  it('should maintain the disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const inputElement = screen.getByPlaceholderText(/disabled input/i);
    expect(inputElement).toBeDisabled();
  });
});
