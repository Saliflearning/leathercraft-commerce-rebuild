import type { Category, CategoryId, Product } from '../types/domain';

export interface CatalogFilters {
  readonly query: string;
  readonly categoryId: CategoryId | 'all';
}

export interface CatalogValidation {
  readonly valid: boolean;
  readonly issues: readonly string[];
}

export function normalizeSearch(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US').slice(0, 100);
}

export function validateCatalog(
  products: readonly Product[],
  categories: readonly Category[],
): CatalogValidation {
  const issues: string[] = [];
  const categoryIds = new Set(categories.map(({ id }) => id));
  const productIds = new Set<string>();

  for (const product of products) {
    if (productIds.has(product.id)) issues.push(`Duplicate product identifier: ${product.id}`);
    productIds.add(product.id);

    if (!categoryIds.has(product.categoryId)) {
      issues.push(`Unknown category for ${product.id}: ${product.categoryId}`);
    }
    if (!Number.isInteger(product.priceCents) || product.priceCents <= 0) {
      issues.push(`Invalid price for ${product.id}`);
    }
    if (!Number.isInteger(product.stock) || product.stock < 1 || product.stock > 12) {
      issues.push(`Invalid stock for ${product.id}`);
    }
    if (product.features.length === 0) issues.push(`Missing features for ${product.id}`);
  }

  return { valid: issues.length === 0, issues };
}

export function filterProducts(
  products: readonly Product[],
  categories: readonly Category[],
  filters: CatalogFilters,
): readonly Product[] {
  const normalizedQuery = normalizeSearch(filters.query);
  const categoryLabels = new Map(categories.map(({ id, label }) => [id, label]));

  return products.filter((product) => {
    const matchesCategory =
      filters.categoryId === 'all' || product.categoryId === filters.categoryId;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchable = [
      product.name,
      categoryLabels.get(product.categoryId) ?? '',
      product.description,
      ...product.features,
    ]
      .join(' ')
      .toLocaleLowerCase('en-US');

    return searchable.includes(normalizedQuery);
  });
}
