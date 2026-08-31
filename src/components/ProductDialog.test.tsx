import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { categories, products } from '../data/catalog';
import { ProductDialog } from './ProductDialog';

describe('ProductDialog', () => {
  it('focuses its heading, closes with Escape, and returns focus to the opener', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();

    const { rerender } = render(
      <ProductDialog
        product={products[0]!}
        category={categories[0]!}
        opener={opener}
        onAdd={vi.fn()}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Trailfold Satchel' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();

    rerender(<div />);
    expect(opener).toHaveFocus();
    opener.remove();
  });

  it('communicates the fictional and non-transactional boundary before adding', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(
      <ProductDialog
        product={products[0]!}
        category={categories[0]!}
        opener={null}
        onAdd={onAdd}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText(/fictional portfolio concept/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add trailfold satchel/i }));
    expect(onAdd).toHaveBeenCalledWith('trailfold-satchel');
  });
});
