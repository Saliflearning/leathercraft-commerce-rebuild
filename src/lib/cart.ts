import type { CartAction, CartState, CartSummary, Product } from '../types/domain';

export const EMPTY_CART: CartState = Object.freeze({ version: 1, quantities: Object.freeze({}) });

function catalogById(products: readonly Product[]): ReadonlyMap<string, Product> {
  return new Map(products.map((product) => [product.id, product]));
}

function withoutProduct(state: CartState, productId: string): CartState {
  if (!Object.hasOwn(state.quantities, productId)) return state;
  const quantities = { ...state.quantities };
  delete quantities[productId];
  return Object.keys(quantities).length === 0 ? EMPTY_CART : { version: 1, quantities };
}

export function reduceCart(
  state: CartState,
  action: CartAction,
  products: readonly Product[],
): CartState {
  if (action.type === 'clear') return EMPTY_CART;

  const product = catalogById(products).get(action.productId);
  if (!product) return state;
  if (action.type === 'remove') return withoutProduct(state, product.id);

  const current = state.quantities[product.id] ?? 0;
  let requested: number;

  switch (action.type) {
    case 'add':
      requested = current + 1;
      break;
    case 'decrease':
      requested = current - 1;
      break;
    case 'set':
      requested = action.quantity;
      break;
  }

  if (!Number.isFinite(requested) || requested <= 0) return withoutProduct(state, product.id);
  const quantity = Math.min(product.stock, Math.max(1, Math.floor(requested)));
  if (quantity === current) return state;

  return { version: 1, quantities: { ...state.quantities, [product.id]: quantity } };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parsePersistedCart(raw: string | null, products: readonly Product[]): CartState {
  if (!raw) return EMPTY_CART;

  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== 1 || !isRecord(value.quantities)) return EMPTY_CART;

    const quantities: Record<string, number> = {};
    for (const product of products) {
      const candidate = value.quantities[product.id];
      if (typeof candidate !== 'number' || !Number.isFinite(candidate) || candidate <= 0) continue;
      quantities[product.id] = Math.min(product.stock, Math.max(1, Math.floor(candidate)));
    }

    return Object.keys(quantities).length === 0 ? EMPTY_CART : { version: 1, quantities };
  } catch {
    return EMPTY_CART;
  }
}

export function serializeCart(state: CartState): string {
  return JSON.stringify(state);
}

export function getCartSummary(state: CartState, products: readonly Product[]): CartSummary {
  const lines = products.flatMap((product) => {
    const quantity = state.quantities[product.id];
    if (!quantity) return [];
    return [{ product, quantity, subtotalCents: product.priceCents * quantity }];
  });

  return {
    lines,
    distinctItems: lines.length,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotalCents: lines.reduce((sum, line) => sum + line.subtotalCents, 0),
  };
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}
