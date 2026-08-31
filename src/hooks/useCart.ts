import { useEffect, useMemo, useReducer } from 'react';
import { products } from '../data/catalog';
import { EMPTY_CART, getCartSummary, parsePersistedCart, reduceCart, serializeCart } from '../lib/cart';
import type { CartAction } from '../types/domain';

const STORAGE_KEY = 'leathercraft-rebuild.cart.v1';

function loadCart() {
  try {
    return parsePersistedCart(window.localStorage.getItem(STORAGE_KEY), products);
  } catch {
    return EMPTY_CART;
  }
}

export function useCart() {
  const [state, dispatch] = useReducer(
    (current: typeof EMPTY_CART, action: CartAction) => reduceCart(current, action, products),
    EMPTY_CART,
    loadCart,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeCart(state));
    } catch {
      // Persistence is optional. The in-memory cart remains fully usable.
    }
  }, [state]);

  const summary = useMemo(() => getCartSummary(state, products), [state]);
  return { state, summary, dispatch } as const;
}
