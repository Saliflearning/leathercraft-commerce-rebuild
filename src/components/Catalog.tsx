import { useMemo, useState } from 'react';
import { categories, products } from '../data/catalog';
import { filterProducts } from '../lib/catalog';
import type { CategoryId, Product } from '../types/domain';
import { formatCurrency } from '../lib/cart';
import { ProductIllustration } from './ProductIllustration';

interface CatalogProps {
  readonly onAdd: (productId: string) => void;
  readonly onOpenProduct: (product: Product, opener: HTMLElement) => void;
}

export function Catalog({ onAdd, onOpenProduct }: CatalogProps) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId | 'all'>('all');
  const visibleProducts = useMemo(
    () => filterProducts(products, categories, { query, categoryId }),
    [query, categoryId],
  );
  const countLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'product' : 'products'}`;

  function clearControls() {
    setQuery('');
    setCategoryId('all');
  }

  return (
    <section id="catalog" className="section catalog" aria-labelledby="catalog-title">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Working reconstruction · fictional inventory</p>
          <h2 id="catalog-title">A commerce interaction, without pretending to be a store.</h2>
        </div>
        <p>
          Eight original concepts. No accounts, tracking, checkout, customer records, or runtime network
          requests.
        </p>
      </div>

      <div className="catalog-controls">
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="catalog-search">Search fictional products</label>
          <div className="search-field">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              id="catalog-search"
              type="search"
              value={query}
              maxLength={100}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Try “travel” or “notebook”"
            />
          </div>
        </form>
        <div className="category-controls" aria-label="Filter products by category">
          <button
            type="button"
            aria-pressed={categoryId === 'all'}
            aria-label="Show all products"
            onClick={() => setCategoryId('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              aria-pressed={categoryId === category.id}
              aria-label={`Show ${category.label} products`}
              onClick={() => setCategoryId(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-meta">
        <p aria-live="polite">{countLabel}</p>
        {(query || categoryId !== 'all') && (
          <button type="button" className="text-button" onClick={clearControls}>
            Clear search and category
          </button>
        )}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <p className="eyebrow">No match</p>
          <h3>No crafted concepts found.</h3>
          <p>Try another phrase or return to the complete fictional catalog.</p>
          <button type="button" className="button button--primary" onClick={clearControls}>
            Clear search and category
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => {
            const category = categories.find(({ id }) => id === product.categoryId)!;
            return (
              <article className="product-card" key={product.id}>
                <ProductIllustration product={product} compact />
                <div className="product-card__body">
                  <p className="product-card__category">{category.label}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-card__price">
                    <strong>{formatCurrency(product.priceCents)}</strong>
                    <span>Sample price · {product.stock} in fictional stock</span>
                  </div>
                  <div className="product-card__actions">
                    <button
                      type="button"
                      className="button button--quiet"
                      aria-label={`Details for ${product.name}`}
                      onClick={(event) => onOpenProduct(product, event.currentTarget)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="button button--primary"
                      aria-label={`Add ${product.name}`}
                      onClick={() => onAdd(product.id)}
                    >
                      Add to demo cart
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
