import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('labels the artifact as new reconstruction work and preserves the team boundary', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /learning rebuilt/i })).toBeInTheDocument();
    expect(screen.getByText(/clean-room reconstruction/i)).toBeInTheDocument();
    expect(screen.getAllByText(/assigned coding lead\/contributor/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText(/no sole or line-level authorship claim/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/no checkout, payment, customer, order, revenue/i)).toBeInTheDocument();
  });

  it('presents three separate chronological phases with distinct scope', () => {
    render(<App />);
    const timeline = screen.getByRole('region', { name: /three-stage learning timeline/i });

    expect(within(timeline).getAllByRole('article')).toHaveLength(3);
    expect(within(timeline).getByRole('heading', { name: /2019 · static storefront concept/i })).toBeInTheDocument();
    expect(within(timeline).getByRole('heading', { name: /2022 · custom team marketplace/i })).toBeInTheDocument();
    expect(within(timeline).getByRole('heading', { name: /2023 · personal hci and commerce redesign/i })).toBeInTheDocument();
  });

  it('integrates the catalog and updates the live cart count', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('link', { name: /cart · 0 items/i })).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /add trailfold satchel/i })[0]!);
    expect(screen.getByRole('link', { name: /cart · 1 item$/i })).toBeInTheDocument();
  });
});
