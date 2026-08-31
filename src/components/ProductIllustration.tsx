import type { Product } from '../types/domain';

interface ProductIllustrationProps {
  readonly product: Product;
  readonly compact?: boolean;
}

export function ProductIllustration({ product, compact = false }: ProductIllustrationProps) {
  return (
    <div
      className={`product-art product-art--${product.accent}${compact ? ' product-art--compact' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 230" focusable="false">
        <defs>
          <linearGradient id={`wash-${product.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <circle cx="252" cy="45" r="54" fill={`url(#wash-${product.id})`} />
        <path className="product-art__thread" d="M30 188 C95 140 197 224 292 150" />
        {product.shape === 'satchel' && (
          <g className="product-art__object">
            <path d="M82 87h156l18 111H64z" />
            <path d="M111 91c3-48 94-48 98 0" />
            <path d="M67 126h186" />
          </g>
        )}
        {product.shape === 'sleeve' && (
          <g className="product-art__object">
            <rect x="88" y="54" width="144" height="150" rx="16" />
            <path d="M160 55v149M101 102h118" />
          </g>
        )}
        {product.shape === 'folio' && (
          <g className="product-art__object">
            <path d="M77 48h166v156H77z" />
            <path d="M99 76h122v98H99zM160 48v156" />
          </g>
        )}
        {product.shape === 'mat' && (
          <g className="product-art__object">
            <path d="M43 71h234v130H43z" />
            <path d="M69 95h128v79H69zM222 96v66" />
            <circle cx="222" cy="179" r="7" />
          </g>
        )}
        {product.shape === 'passport' && (
          <g className="product-art__object">
            <path d="M87 42h146v170H87z" />
            <path d="M160 43v168M112 74h25M184 74h25M111 153h25M184 153h25" />
          </g>
        )}
        {product.shape === 'duffel' && (
          <g className="product-art__object">
            <path d="M49 99h222l-16 101H65z" />
            <path d="M104 101c2-67 110-67 112 0M160 101v99" />
          </g>
        )}
        {product.shape === 'tray' && (
          <g className="product-art__object">
            <path d="M65 83h190l24 117H41z" />
            <path d="M65 84l-24 116M255 84l24 116M80 158h160" />
          </g>
        )}
        {product.shape === 'roll' && (
          <g className="product-art__object">
            <path d="M56 66h208v135H56z" />
            <path d="M91 77v111M126 77v111M161 77v111M196 77v111M231 77v111" />
            <path d="M42 135h236" />
          </g>
        )}
      </svg>
      <span>{product.shape.replace('-', ' ')}</span>
    </div>
  );
}
