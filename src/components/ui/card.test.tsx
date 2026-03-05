import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card Component Family', () => {
  it('should render the Card and all its sub-components correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
          <CardDescription>Sub description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <button type="button">Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Sub description')).toBeInTheDocument();
    expect(screen.getByText('This is the content of the card.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Action/i })).toBeInTheDocument();
  });
});
