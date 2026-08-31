import { formatCurrency } from '../lib/cart';
import type { CartAction, CartSummary } from '../types/domain';

interface CartProps {
  readonly summary: CartSummary;
  readonly dispatch: React.Dispatch<CartAction>;
}

export function Cart({ summary, dispatch }: CartProps) {
  return (
    <section id="cart" className="section cart" aria-labelledby="cart-title">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Browser-local interaction</p>
          <h2 id="cart-title">Demo cart</h2>
        </div>
        <p className="cart-boundary">
          Nothing is purchased, submitted, or transmitted. This state stays in your browser and can be
          cleared at any time.
        </p>
      </div>

      {summary.lines.length === 0 ? (
        <div className="empty-state empty-state--cart">
          <p className="eyebrow">Zero items · zero data collected</p>
          <h3>Your demo cart is empty.</h3>
          <p>Explore the fictional catalog and add a concept to test the local cart behavior.</p>
          <a className="button button--primary" href="#catalog">
            Browse concepts
          </a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {summary.lines.map(({ product, quantity, subtotalCents }) => (
              <article className="cart-line" key={product.id}>
                <div>
                  <p className="cart-line__name">{product.name}</p>
                  <span>{formatCurrency(product.priceCents)} sample unit price</span>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name}`}
                    onClick={() => dispatch({ type: 'decrease', productId: product.id })}
                  >
                    −
                  </button>
                  <span aria-live="polite">{quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${product.name}`}
                    disabled={quantity >= product.stock}
                    onClick={() => dispatch({ type: 'add', productId: product.id })}
                  >
                    +
                  </button>
                </div>
                <div className="cart-line__total">
                  <strong>{formatCurrency(subtotalCents)}</strong>
                  {quantity >= product.stock && <span>Fictional stock limit reached</span>}
                </div>
                <button
                  type="button"
                  className="text-button text-button--danger"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => dispatch({ type: 'remove', productId: product.id })}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
          <aside className="cart-summary" aria-label="Demo cart summary">
            <p>
              <span>Items</span>
              <strong>{summary.totalQuantity}</strong>
            </p>
            <p className="cart-summary__total">
              <span>Sample subtotal</span>
              <strong>{formatCurrency(summary.subtotalCents)}</strong>
            </p>
            <div className="boundary-panel">
              <strong>Intentionally ends here.</strong>
              <p>No checkout, payment, account, shipping address, order, or analytics event exists.</p>
            </div>
            <button type="button" className="button button--quiet" onClick={() => dispatch({ type: 'clear' })}>
              Clear demo cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
