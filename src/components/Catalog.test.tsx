import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Catalog } from './Catalog';

describe('Catalog', () => {
  it('searches and filters the fictional catalog with a textual result count', async () => {
    const user = userEvent.setup();
    render(<Catalog onAdd={vi.fn()} onOpenProduct={vi.fn()} />);

    await user.type(
      screen.getByRole('searchbox', { name: /search fictional products/i }),
      'weekender',
    );
    expect(screen.getByText('1 product')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wayfarer Weekender' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Trailfold Satchel' })).not.toBeInTheDocument();

    await user.clear(screen.getByRole('searchbox', { name: /search fictional products/i }));
    await user.click(screen.getByRole('button', { name: /show travel products/i }));
    expect(screen.getByText('2 products')).toBeInTheDocument();
  });

  it('renders a recoverable empty state and clears active controls', async () => {
    const user = userEvent.setup();
    render(<Catalog onAdd={vi.fn()} onOpenProduct={vi.fn()} />);

    await user.type(
      screen.getByRole('searchbox', { name: /search fictional products/i }),
      'nothing matches',
    );
    expect(screen.getByRole('heading', { name: /no crafted concepts found/i })).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /clear search and category/i }).at(-1)!);
    expect(screen.getByText('8 products')).toBeInTheDocument();
  });

  it('passes the product and invoking control to details and uses named add actions', async () => {
    const user = userEvent.setup();
    const onOpenProduct = vi.fn();
    const onAdd = vi.fn();
    render(<Catalog onAdd={onAdd} onOpenProduct={onOpenProduct} />);

    const details = screen.getByRole('button', { name: /details for trailfold satchel/i });
    await user.click(details);
    expect(onOpenProduct).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'trailfold-satchel' }),
      details,
    );

    await user.click(screen.getByRole('button', { name: /add trailfold satchel/i }));
    expect(onAdd).toHaveBeenCalledWith('trailfold-satchel');
  });
});
