import { useEffect, useState } from 'react';
import { Cart } from '../components/Cart';
import { Catalog } from '../components/Catalog';
import { Hero } from '../components/Hero';
import { LearningJourney } from '../components/LearningJourney';
import { ProductDialog } from '../components/ProductDialog';
import { TechnicalRetrospective } from '../components/TechnicalRetrospective';
import { categories } from '../data/catalog';
import { evidenceNotes, historicalPhases } from '../data/history';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types/domain';

interface OpenProduct {
  readonly product: Product;
  readonly opener: HTMLElement;
}

export function App() {
  const { summary, dispatch } = useCart();
  const [openProduct, setOpenProduct] = useState<OpenProduct | null>(null);
  const itemLabel = `${summary.totalQuantity} ${summary.totalQuantity === 1 ? 'item' : 'items'}`;

  useEffect(() => {
    function restoreHashTarget() {
      const targetId = window.location.hash.slice(1);
      if (targetId) document.getElementById(targetId)?.scrollIntoView();
    }

    restoreHashTarget();
    window.addEventListener('hashchange', restoreHashTarget);
    return () => window.removeEventListener('hashchange', restoreHashTarget);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Leathercraft Learning Rebuilt home">
          <span aria-hidden="true">LR</span>
          <strong>Learning Rebuilt</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#journey">Case study</a>
          <a href="#catalog">Rebuild</a>
          <a href="#cart" aria-label={`Cart · ${itemLabel}`}>
            Cart <span>{summary.totalQuantity}</span>
          </a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <div id="top" />
        <Hero />
        <LearningJourney phases={historicalPhases} notes={evidenceNotes} />
        <TechnicalRetrospective />
        <Catalog
          onAdd={(productId) => dispatch({ type: 'add', productId })}
          onOpenProduct={(product, opener) => setOpenProduct({ product, opener })}
        />
        <Cart summary={summary} dispatch={dispatch} />
      </main>

      <footer className="site-footer">
        <div>
          <p className="eyebrow">Built to make learning inspectable</p>
          <strong>New code. Fictional data. Honest boundaries.</strong>
        </div>
        <p>
          Educational portfolio reconstruction · No store, checkout, account, analytics, or personal
          data.
        </p>
      </footer>

      {openProduct && (
        <ProductDialog
          product={openProduct.product}
          category={categories.find(({ id }) => id === openProduct.product.categoryId)!}
          opener={openProduct.opener}
          onAdd={(productId) => dispatch({ type: 'add', productId })}
          onClose={() => setOpenProduct(null)}
        />
      )}
    </>
  );
}
