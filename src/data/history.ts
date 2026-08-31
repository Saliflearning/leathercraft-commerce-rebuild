import type { EvidenceNote, HistoricalPhase } from '../types/domain';

export const historicalPhases: readonly HistoricalPhase[] = [
  {
    id: 'static-concept',
    year: 2019,
    label: 'Static storefront concept',
    scope: 'Individual early web-learning artifacts',
    role: 'Individual work; the exact graded submission mapping remains unresolved.',
    verifiedCapabilities: ['Multi-page HTML/CSS storefront concept', 'Expanded visual/catalog iteration'],
    limitations: ['No backend, search, cart, account, or purchase flow', 'Exact course submission unresolved'],
    lesson: 'A convincing storefront surface is not the same as a working commerce system.',
    evidenceStatus: 'qualified',
  },
  {
    id: 'team-marketplace',
    year: 2022,
    label: 'Custom team marketplace',
    scope: 'Spring 2022 team course project',
    role: 'Assigned coding lead/contributor; no sole or line-level authorship claim.',
    verifiedCapabilities: [
      'PHP/MySQL catalog with search and database-backed CRUD',
      'Authentication, protected cart, and administrative controls',
      'Exact final package: 207 files, including 40 PHP files and five database tables',
    ],
    limitations: [
      'Raw database queries and legacy password hashing',
      'No detected prepared statements, input filters, or CSRF handling',
      'Weak final documentation and unresolved third-party asset rights',
    ],
    lesson: 'Feature breadth without secure data handling, tests, and ownership clarity is not production readiness.',
    evidenceStatus: 'verified',
  },
  {
    id: 'personal-redesign',
    year: 2023,
    label: 'Personal HCI and commerce redesign',
    scope: 'Personal project inside a later HCI/web course',
    role: 'Individual proposal, planning, prototype, and WordPress/WooCommerce redesign evidence.',
    verifiedCapabilities: ['Requirements and information architecture', 'Figma prototype', 'Commerce-platform redesign and reflection'],
    limitations: ['No complete final repository', 'Current host is not a verified working deployment', 'Asset and business permissions remain unresolved'],
    lesson: 'Better design process improved the concept, but durable engineering evidence was still missing.',
    evidenceStatus: 'verified',
  },
] as const;

export const evidenceNotes: readonly EvidenceNote[] = [
  {
    id: 'role-boundary',
    classification: 'verified',
    claim: 'The defensible 2022 role is assigned coding lead/contributor in a team project.',
    basis: 'Authenticated course discussion, proposal, final package, and private team evidence.',
    boundary: 'This does not establish sole ownership or authorship of specific legacy lines.',
  },
  {
    id: 'score-boundary',
    classification: 'verified',
    claim: 'The evidence preserves separate final 53/60, staged rubric 83/100, and final-project group 108/125 surfaces.',
    basis: 'Authenticated course grade and rubric records.',
    boundary: 'The values are not merged or presented as one equivalent score.',
  },
  {
    id: 'database-boundary',
    classification: 'qualified',
    claim: 'A teammate said the production database was likely created by Salif.',
    basis: 'Qualified teammate corroboration in a private course discussion.',
    boundary: 'The first and second database prototypes are credited to teammates; certainty is not claimed.',
  },
  {
    id: 'new-work-boundary',
    classification: 'new-work',
    claim: 'All code, product data, diagrams, illustrations, tests, and prose in this repository are new reconstruction work.',
    basis: 'Clean-room repository history and deterministic provenance scan.',
    boundary: 'The license does not cover private historical artifacts, which are not included.',
  },
  {
    id: 'non-claims',
    classification: 'non-claim',
    claim: 'No checkout, payment, customer, order, revenue, deployment, or production-security claim is made.',
    basis: 'Verified absence in the legacy evidence and deliberate exclusion from the rebuild.',
    boundary: 'The cart is a local interaction demonstration only.',
  },
] as const;
