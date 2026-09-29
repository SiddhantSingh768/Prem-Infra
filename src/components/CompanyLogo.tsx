import React from 'react';

export type CompanyLogoKey =
  | 'indian-railways'
  | 'rvnl'
  | 'nhai'
  | 'upeida'
  | 'lt'
  | 'ncc'
  | 'bridge-roof'
  | 'iocl'
  | 'ntpc'
  | 'ose'
  | 'ssangyong'
  | 'simplex'
  | 'afcons'
  | 'pra'
  | 'pba'
  | 'sunway'
  | 'wbhd';

export function resolveLogoKey(name: string): CompanyLogoKey {
  const n = name.toLowerCase();
  if (n.includes('larsen') || n.includes('l&t')) return 'lt';
  if (n.includes('rvnl') || n.includes('rail vikas')) return 'rvnl';
  if (
    n.includes('north central railway') ||
    n.includes('north eastern railway') ||
    n.includes('northern railway') ||
    n.includes('indian railway')
  ) {
    return 'indian-railways';
  }
  if (n.includes('nhai') || n.includes('national highways')) return 'nhai';
  if (n.includes('upeida')) return 'upeida';
  if (n.includes('ncc')) return 'ncc';
  if (n.includes('indian oil') || n.includes('iocl')) return 'iocl';
  if (n.includes('ntpc')) return 'ntpc';
  if (n.includes('bridge & roof') || n.includes('b&r')) return 'bridge-roof';
  if (n.includes('oriental') || n.includes('ose')) return 'ose';
  if (n.includes('ssangyong')) return 'ssangyong';
  if (n.includes('simplex')) return 'simplex';
  if (n.includes('afcons')) return 'afcons';
  if (n.includes('sunway')) return 'sunway';
  if (n.includes('pba')) return 'pba';
  if (n.includes('west bengal')) return 'wbhd';
  return 'pra';
}

export function CompanyLogo({
  companyName,
  logoKey,
  size = 'md',
}: {
  companyName: string;
  logoKey?: CompanyLogoKey;
  size?: 'sm' | 'md' | 'lg';
}) {
  const key = logoKey || resolveLogoKey(companyName);

  const dimensions =
    size === 'sm'
      ? 'h-9 px-2.5'
      : size === 'lg'
      ? 'h-14 px-4'
      : 'h-11 px-3';

  return (
    <div
      title={companyName}
      className={`inline-flex items-center justify-center bg-white border border-slate-200 rounded-lg shrink-0 select-none ${dimensions}`}
    >
      {key === 'indian-railways' && (
        <svg viewBox="0 0 175 48" className="h-7 w-auto" role="img" aria-label="Indian Railways Logo">
          <circle cx="24" cy="24" r="20" fill="#B91C1C" />
          <circle cx="24" cy="24" r="16.5" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="3 2" />
          <circle cx="24" cy="24" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Steam/Locomotive front & wheel motif */}
          <rect x="19" y="14" width="10" height="12" rx="2" fill="#FFFFFF" />
          <circle cx="24" cy="20" r="3" fill="#B91C1C" />
          <path d="M16 28 H32 M18 31 H30" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <text x="52" y="21" fill="#B91C1C" fontFamily="sans-serif" fontWeight="800" fontSize="11.5" letterSpacing="0.4">
            INDIAN RAILWAYS
          </text>
          <text x="52" y="35" fill="#1E293B" fontFamily="sans-serif" fontWeight="700" fontSize="9.5">
            भारतीय रेल • GOVT. OF INDIA
          </text>
        </svg>
      )}

      {key === 'rvnl' && (
        <svg viewBox="0 0 150 48" className="h-7 w-auto" role="img" aria-label="RVNL Logo">
          {/* Dynamic rail tracks arch */}
          <path d="M8 36 C16 14, 34 10, 48 12" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <path d="M12 40 C22 22, 36 18, 48 20" fill="none" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="16" y1="30" x2="22" y2="33" stroke="#475569" strokeWidth="2" />
          <line x1="24" y1="22" x2="30" y2="25" stroke="#475569" strokeWidth="2" />
          <line x1="34" y1="16" x2="39" y2="20" stroke="#475569" strokeWidth="2" />
          <text x="54" y="25" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.8">
            RVNL
          </text>
          <text x="54" y="37" fill="#DC2626" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            RAIL VIKAS NIGAM LTD.
          </text>
        </svg>
      )}

      {key === 'nhai' && (
        <svg viewBox="0 0 155 48" className="h-7 w-auto" role="img" aria-label="NHAI Logo">
          {/* Highway perspective motif */}
          <polygon points="22,8 26,8 16,40 6,40" fill="#EA580C" />
          <polygon points="28,8 31,8 30,40 24,40" fill="#1D4ED8" />
          <polygon points="33,8 37,8 48,40 38,40" fill="#15803D" />
          <text x="56" y="24" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
            NHAI
          </text>
          <text x="56" y="36" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="7.5">
            NATIONAL HIGHWAYS AUTHORITY
          </text>
        </svg>
      )}

      {key === 'lt' && (
        <svg viewBox="0 0 165 48" className="h-7 w-auto" role="img" aria-label="Larsen & Toubro Logo">
          <circle cx="24" cy="24" r="19" fill="#0284C7" />
          <circle cx="24" cy="24" r="16.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* L&T Iconic Monogram */}
          <path d="M15 14 V30 H25" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="square" />
          <path d="M23 19 H35 M29 19 V34" fill="none" stroke="#FACC15" strokeWidth="3.2" strokeLinecap="square" />
          <text x="50" y="23" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="13.5" letterSpacing="0.4">
            LARSEN &amp; TOUBRO
          </text>
          <text x="50" y="35" fill="#0284C7" fontFamily="sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="0.5">
            L&amp;T CONSTRUCTION (ECC)
          </text>
        </svg>
      )}

      {key === 'ncc' && (
        <svg viewBox="0 0 135 48" className="h-7 w-auto" role="img" aria-label="NCC Limited Logo">
          <rect x="4" y="8" width="42" height="32" rx="4" fill="#1E3A8A" />
          <path d="M4 34 H46 V40 H4 Z" fill="#DC2626" />
          <text x="10" y="29" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.5">
            NCC
          </text>
          <text x="54" y="23" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="800" fontSize="13">
            NCC LIMITED
          </text>
          <text x="54" y="35" fill="#64748B" fontFamily="sans-serif" fontWeight="600" fontSize="8">
            INFRASTRUCTURE
          </text>
        </svg>
      )}

      {key === 'iocl' && (
        <svg viewBox="0 0 155 48" className="h-7 w-auto" role="img" aria-label="IndianOil Logo">
          <circle cx="24" cy="24" r="19" fill="#F97316" />
          <circle cx="24" cy="24" r="13.5" fill="#FFFFFF" />
          <rect x="5" y="19" width="38" height="10" fill="#1E3A8A" />
          <text x="24" y="26.5" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="6.8">
            IndianOil
          </text>
          <text x="50" y="23" fill="#EA580C" fontFamily="sans-serif" fontWeight="900" fontSize="14">
            IndianOil
          </text>
          <text x="50" y="35" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            IOCL REFINERIES DIV.
          </text>
        </svg>
      )}

      {key === 'ntpc' && (
        <svg viewBox="0 0 140 48" className="h-7 w-auto" role="img" aria-label="NTPC Limited Logo">
          <path d="M14 16 C28 6, 52 6, 62 15" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="11" r="2.5" fill="#DC2626" />
          <text x="8" y="34" fill="#0284C7" fontFamily="sans-serif" fontWeight="900" fontSize="21" letterSpacing="1">
            NTPC
          </text>
          <text x="76" y="24" fill="#0F172A" fontFamily="sans-serif" fontWeight="700" fontSize="8.5">
            A Maharatna
          </text>
          <text x="76" y="34" fill="#64748B" fontFamily="sans-serif" fontWeight="600" fontSize="8">
            PSU Enterprise
          </text>
        </svg>
      )}

      {key === 'bridge-roof' && (
        <svg viewBox="0 0 165 48" className="h-7 w-auto" role="img" aria-label="Bridge and Roof Co. Logo">
          {/* Truss bridge arch */}
          <path d="M6 34 Q25 10 44 34" fill="none" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="4" y1="34" x2="46" y2="34" stroke="#DC2626" strokeWidth="3" />
          <line x1="16" y1="24" x2="16" y2="34" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="25" y1="21" x2="25" y2="34" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="34" y1="24" x2="34" y2="34" stroke="#1E3A8A" strokeWidth="1.8" />
          <text x="52" y="23" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="12.5">
            BRIDGE &amp; ROOF
          </text>
          <text x="52" y="35" fill="#DC2626" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            CO. (INDIA) LTD. • PSU
          </text>
        </svg>
      )}

      {key === 'upeida' && (
        <svg viewBox="0 0 150 48" className="h-7 w-auto" role="img" aria-label="UPEIDA Logo">
          <rect x="6" y="8" width="34" height="32" rx="6" fill="#0F766E" />
          <path d="M14 36 L22 12 M32 36 L24 12" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="23" y1="16" x2="23" y2="34" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="48" y="24" fill="#0F766E" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.6">
            UPEIDA
          </text>
          <text x="48" y="35" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="7.5">
            U.P. EXPRESSWAYS AUTH.
          </text>
        </svg>
      )}

      {key === 'ose' && (
        <svg viewBox="0 0 165 48" className="h-7 w-auto" role="img" aria-label="Oriental Structural Engineers Logo">
          <circle cx="22" cy="24" r="16" fill="none" stroke="#0369A1" strokeWidth="4" />
          <circle cx="22" cy="24" r="8" fill="#EA580C" />
          <text x="45" y="23" fill="#0369A1" fontFamily="sans-serif" fontWeight="900" fontSize="13.5">
            ORIENTAL (OSE)
          </text>
          <text x="45" y="35" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            STRUCTURAL ENGINEERS
          </text>
        </svg>
      )}

      {key === 'ssangyong' && (
        <svg viewBox="0 0 165 48" className="h-7 w-auto" role="img" aria-label="SsangYong Engineering & Construction Logo">
          {/* Twin S ribbon emblem */}
          <circle cx="22" cy="24" r="16" fill="#DC2626" />
          <path d="M14 29 C14 21, 30 27, 30 19" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M14 23 C14 15, 30 21, 30 13" fill="none" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" />
          <text x="44" y="23" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5">
            SSANGYONG E&amp;C
          </text>
          <text x="44" y="35" fill="#DC2626" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            SEOUL, SOUTH KOREA
          </text>
        </svg>
      )}

      {key === 'simplex' && (
        <svg viewBox="0 0 160 48" className="h-7 w-auto" role="img" aria-label="Simplex Infrastructures Logo">
          <polygon points="22,7 38,24 22,41 6,24" fill="#B91C1C" />
          <text x="22" y="29" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14">
            S
          </text>
          <text x="45" y="23" fill="#B91C1C" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5">
            SIMPLEX
          </text>
          <text x="45" y="35" fill="#334155" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            INFRASTRUCTURES LTD.
          </text>
        </svg>
      )}

      {key === 'afcons' && (
        <svg viewBox="0 0 155 48" className="h-7 w-auto" role="img" aria-label="Afcons Infrastructure Logo">
          <rect x="6" y="10" width="32" height="28" rx="4" fill="#1D4ED8" />
          <polygon points="22,14 32,34 12,34" fill="#FFFFFF" />
          <polygon points="22,21 27,32 17,32" fill="#DC2626" />
          <text x="45" y="23" fill="#1D4ED8" fontFamily="sans-serif" fontWeight="900" fontSize="14.5" letterSpacing="0.6">
            AFCONS
          </text>
          <text x="45" y="35" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="7.5">
            SHAPOORJI PALLONJI GROUP
          </text>
        </svg>
      )}

      {key === 'sunway' && (
        <svg viewBox="0 0 155 48" className="h-7 w-auto" role="img" aria-label="Sunway Construction Logo">
          <circle cx="22" cy="24" r="15" fill="#EA580C" />
          <path d="M12 28 Q22 14 32 28" fill="none" stroke="#FDE047" strokeWidth="3" />
          <text x="44" y="23" fill="#EA580C" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5">
            SUNWAY
          </text>
          <text x="44" y="35" fill="#334155" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            CONSTRUCTION SDN BHD
          </text>
        </svg>
      )}

      {key === 'pba' && (
        <svg viewBox="0 0 150 48" className="h-7 w-auto" role="img" aria-label="PBA Infrastructure Logo">
          <rect x="6" y="10" width="36" height="28" rx="4" fill="#0369A1" />
          <text x="24" y="28" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="12">
            PBA
          </text>
          <text x="49" y="23" fill="#0369A1" fontFamily="sans-serif" fontWeight="900" fontSize="13">
            PBA INFRA
          </text>
          <text x="49" y="35" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            INFRASTRUCTURE LTD.
          </text>
        </svg>
      )}

      {key === 'wbhd' && (
        <svg viewBox="0 0 160 48" className="h-7 w-auto" role="img" aria-label="Govt of West Bengal PW & Housing Logo">
          <circle cx="22" cy="24" r="15" fill="#15803D" />
          <text x="22" y="28" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="10">
            WB
          </text>
          <text x="44" y="23" fill="#15803D" fontFamily="sans-serif" fontWeight="800" fontSize="12">
            GOVT. OF W.B.
          </text>
          <text x="44" y="35" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            PW (ROADS) &amp; HOUSING
          </text>
        </svg>
      )}

      {key === 'pra' && (
        <svg viewBox="0 0 155 48" className="h-7 w-auto" role="img" aria-label="PRA Projects Logo">
          <rect x="6" y="10" width="36" height="28" rx="4" fill="#0F172A" />
          <text x="24" y="28" textAnchor="middle" fill="#38BDF8" fontFamily="sans-serif" fontWeight="900" fontSize="12">
            PRA
          </text>
          <text x="49" y="23" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="13">
            PRA PROJECTS
          </text>
          <text x="49" y="35" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="8">
            HIGHWAY EPC DEVELOPER
          </text>
        </svg>
      )}
    </div>
  );
}
