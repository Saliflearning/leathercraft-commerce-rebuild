import { useEffect, useRef } from 'react';
import { formatCurrency } from '../lib/cart';
import type { Category, Product } from '../types/domain';
import { ProductIllustration } from './ProductIllustration';

interface ProductDialogProps {
  readonly product: Product;
  readonly category: Category;
  readonly opener: HTMLElement | null;
  readonly onAdd: (productId: string) => void;
  readonly onClose: () => void;
}

export function ProductDialog({ product, category, opener, onAdd, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    return () => opener?.focus();
  }, [opener]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="product-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Close product details"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <ProductIllustration product={product} />
        <div className="product-dialog__body">
          <p className="eyebrow">{category.label} · fictional portfolio concept</p>
          <h2 id="product-dialog-title" ref={headingRef} tabIndex={-1}>
            {product.name}
          </h2>
          <p className="product-dialog__description">{product.description}</p>
          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="product-dialog__footer">
            <div>
              <strong>{formatCurrency(product.priceCents)}</strong>
              <span>Sample price · {product.stock} in fictional stock</span>
            </div>
            <button
              type="button"
              className="button button--primary"
              aria-label={`Add ${product.name}`}
              onClick={() => onAdd(product.id)}
            >
              Add to demo cart
            </button>
          </div>
          <p className="micro-boundary">
            Local demo only. No order, account, payment, or data submission.
          </p>
        </div>
      </div>
    </div>
  );
}
