import { describe, expect, it } from 'vitest';
import { products } from '../data/catalog';
import { EMPTY_CART, formatCurrency, getCartSummary, parsePersistedCart, reduceCart } from './cart';

describe('cart', () => {
  it('adds, decreases, removes, and clears allowlisted products', () => {
    const added = reduceCart(EMPTY_CART, { type: 'add', productId: 'trailfold-satchel' }, products);
    const twice = reduceCart(added, { type: 'add', productId: 'trailfold-satchel' }, products);
    const decreased = reduceCart(twice, { type: 'decrease', productId: 'trailfold-satchel' }, products);
    const removed = reduceCart(decreased, { type: 'decrease', productId: 'trailfold-satchel' }, products);

    expect(twice.quantities['trailfold-satchel']).toBe(2);
    expect(decreased.quantities['trailfold-satchel']).toBe(1);
    expect(removed).toEqual(EMPTY_CART);
    expect(reduceCart(twice, { type: 'clear' }, products)).toEqual(EMPTY_CART);
  });

  it('clamps integer quantities to fictional stock and rejects unknown products', () => {
    const clamped = reduceCart(EMPTY_CART, { type: 'set', productId: 'wayfarer-weekender', quantity: 99 }, products);
    const unknown = reduceCart(clamped, { type: 'add', productId: 'missing-product' }, products);

    expect(clamped.quantities['wayfarer-weekender']).toBe(3);
    expect(unknown).toEqual(clamped);
  });

  it('recovers only valid, current cart data from untrusted storage', () => {
    const raw = JSON.stringify({
      version: 1,
      quantities: { 'atlas-folio': 2.8, 'wayfarer-weekender': 200, obsolete: 4, '__proto__': 5 },
    });

    expect(parsePersistedCart(raw, products)).toEqual({
      version: 1,
      quantities: { 'atlas-folio': 2, 'wayfarer-weekender': 3 },
    });
    expect(parsePersistedCart('{not-json', products)).toEqual(EMPTY_CART);
    expect(parsePersistedCart(null, products)).toEqual(EMPTY_CART);
  });

  it('derives consistent integer-cent lines, quantities, and totals', () => {
    const state = { version: 1 as const, quantities: { 'atlas-folio': 2, 'hearth-catchall': 1 } };
    const summary = getCartSummary(state, products);

    expect(summary.totalQuantity).toBe(3);
    expect(summary.distinctItems).toBe(2);
    expect(summary.subtotalCents).toBe(22_800);
    expect(formatCurrency(summary.subtotalCents)).toBe('$228.00');
  });
});
