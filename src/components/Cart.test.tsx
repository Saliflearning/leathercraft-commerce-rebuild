import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { products } from '../data/catalog';
import { getCartSummary } from '../lib/cart';
import { Cart } from './Cart';

describe('Cart', () => {
  it('renders quantities and subtotals and emits validated quantity actions', async () => {
    const user = userEvent.setup();
    const dispatch = vi.fn();
    const summary = getCartSummary(
      { version: 1, quantities: { 'wayfarer-weekender': 3 } },
      products,
    );
    render(<Cart summary={summary} dispatch={dispatch} />);

    expect(screen.getAllByText('$708.00')).toHaveLength(2);
    expect(screen.getByText(/fictional stock limit reached/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase wayfarer weekender/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /decrease wayfarer weekender/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'decrease', productId: 'wayfarer-weekender' });
    await user.click(screen.getByRole('button', { name: /remove wayfarer weekender/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'remove', productId: 'wayfarer-weekender' });
  });

  it('shows an empty state and never offers checkout', () => {
    render(<Cart summary={getCartSummary({ version: 1, quantities: {} }, products)} dispatch={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /your demo cart is empty/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /checkout|pay|purchase/i })).not.toBeInTheDocument();
    expect(screen.getByText(/nothing is purchased, submitted, or transmitted/i)).toBeInTheDocument();
  });
});
