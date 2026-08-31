export type CategoryId = 'carry' | 'desk' | 'travel' | 'home';
export type ProductAccent = 'clay' | 'gold' | 'sage' | 'ink';
export type ProductShape = 'satchel' | 'folio' | 'tray' | 'sleeve' | 'roll' | 'duffel' | 'passport' | 'mat';

export interface Category {
  readonly id: CategoryId;
  readonly label: string;
  readonly description: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly categoryId: CategoryId;
  readonly description: string;
  readonly priceCents: number;
  readonly stock: number;
  readonly features: readonly string[];
  readonly accent: ProductAccent;
  readonly shape: ProductShape;
}

export type EvidenceStatus = 'verified' | 'qualified' | 'unresolved';
export type EvidenceClassification = 'verified' | 'qualified' | 'new-work' | 'non-claim';

export interface HistoricalPhase {
  readonly id: 'static-concept' | 'team-marketplace' | 'personal-redesign';
  readonly year: 2019 | 2022 | 2023;
  readonly label: string;
  readonly scope: string;
  readonly role: string;
  readonly verifiedCapabilities: readonly string[];
  readonly limitations: readonly string[];
  readonly lesson: string;
  readonly evidenceStatus: EvidenceStatus;
}

export interface EvidenceNote {
  readonly id: string;
  readonly claim: string;
  readonly classification: EvidenceClassification;
  readonly basis: string;
  readonly boundary: string;
}

export interface CartState {
  readonly version: 1;
  readonly quantities: Readonly<Record<string, number>>;
}

export type CartAction =
  | { readonly type: 'add'; readonly productId: string }
  | { readonly type: 'decrease'; readonly productId: string }
  | { readonly type: 'remove'; readonly productId: string }
  | { readonly type: 'set'; readonly productId: string; readonly quantity: number }
  | { readonly type: 'clear' };

export interface CartLine {
  readonly product: Product;
  readonly quantity: number;
  readonly subtotalCents: number;
}

export interface CartSummary {
  readonly lines: readonly CartLine[];
  readonly distinctItems: number;
  readonly totalQuantity: number;
  readonly subtotalCents: number;
}
