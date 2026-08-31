import { describe, expect, it } from 'vitest';
import { categories, products } from '../data/catalog';
import { filterProducts, normalizeSearch, validateCatalog } from './catalog';

describe('catalog', () => {
  it('validates the fictional catalog and its category references', () => {
    expect(validateCatalog(products, categories)).toEqual({ valid: true, issues: [] });
  });

  it('normalizes case and whitespace and limits search input to 100 characters', () => {
    expect(normalizeSearch('  TrAvEl   Case  ')).toBe('travel case');
    expect(normalizeSearch('x'.repeat(140))).toHaveLength(100);
  });

  it('searches visible product and category information case-insensitively', () => {
    expect(
      filterProducts(products, categories, { query: 'TRAVEL', categoryId: 'all' }).map(
        ({ id }) => id,
      ),
    ).toEqual(['compass-passport-case', 'wayfarer-weekender', 'studio-tool-roll']);
  });

  it('combines category and search controls and returns a stable empty result', () => {
    expect(
      filterProducts(products, categories, { query: 'A5', categoryId: 'desk' }).map(({ id }) => id),
    ).toEqual(['atlas-folio']);
    expect(
      filterProducts(products, categories, { query: 'weekender', categoryId: 'home' }),
    ).toEqual([]);
  });
});
