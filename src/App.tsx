import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ArrowUpRight,
  FileText,
  Eye,
  Download,
  X,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Building2,
  Send,
} from 'lucide-react';
import {
  COMPANY_INFO,
  CORE_CAPABILITIES,
  CLIENT_ORGANIZATIONS,
  PROJECTS_DATA,
  SITE_PHOTOS,
  CERTIFICATES_LIST,
  HERO_IMAGE_URL,
  CAPABILITY_RAILWAY_IMAGE,
  CAPABILITY_EXPRESSWAY_IMAGE,
  type ProjectTypeCategory,
} from './data/piplData';
import { CompanyLogo, resolveLogoKey } from './components/CompanyLogo';
import { ProjectsFootprintMap } from './components/ProjectsFootprintMap';

interface InquiryRecord {
  id: string;
  referenceNo: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  sector: string;
  location: string;
  message: string;
  submittedAt: string;
}

const prefetchedPaths = new Set<string>();

function getFileUrl(
  filePath: string,
  download = false,
  preview = false
): string {
  return `/api/file?path=${encodeURIComponent(filePath)}${download ? '&download=1' : ''}${preview ? '&preview=1' : ''}`;
}

function prefetchDocumentOrImage(filePath?: string) {
  if (!filePath || prefetchedPaths.has(filePath)) return;
  prefetchedPaths.add(filePath);
  const img = new Image();
  img.src = getFileUrl(filePath, false, true);
}

function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 text-slate-500 mb-2" />
        <span className="text-xs font-medium text-slate-700 max-w-xs">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function ProjectTypeIcon({
  type,
  className = 'w-4 h-4 shrink-0',
}: {
  type: ProjectTypeCategory;
  className?: string;
}) {
  switch (type) {
    case 'Bridge & Flyover':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          {/* Arch & Suspension Span */}
          <path d="M2 14c4.5-6 15.5-6 20 0" />
          {/* Bridge Deck */}
          <path d="M2 14h20" />
          {/* Hangers & Piers */}
          <path d="M6 10.5V19" />
          <path d="M18 10.5V19" />
          <path d="M10 9.6V14" />
          <path d="M14 9.6V14" />
          {/* Foundation Footings */}
          <path d="M4 19h4" />
          <path d="M16 19h4" />
        </svg>
      );
    case 'Railway':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          {/* Locomotive / Rail Car Body */}
          <rect x="5" y="3" width="14" height="13" rx="2" />
          <path d="M5 9h14" />
          <path d="M9 6h6" />
          <circle cx="8.5" cy="12.5" r="1" fill="currentColor" />
          <circle cx="15.5" cy="12.5" r="1" fill="currentColor" />
          {/* Railway Tracks & Sleepers */}
          <path d="M7 16l-2.5 5" />
          <path d="M17 16l2.5 5" />
          <path d="M6 19h12" />
        </svg>
      );
    case 'Highway':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          {/* Dual-Carriageway Perspective Edges */}
          <path d="M4 20L9 4" />
          <path d="M20 20L15 4" />
          {/* Center Median Dashed Line */}
          <path d="M12 4v3" />
          <path d="M12 10.5v3" />
          <path d="M12 17v3" />
        </svg>
      );
    case 'Industrial':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M3 20h18" />
          <path d="M5 20V9l5 3V9l5 3V5h4v15" />
          <path d="M8 16h2" />
          <path d="M13 16h2" />
        </svg>
      );
  }
}

function getProjectTypeAccent(type: ProjectTypeCategory): {
  text: string;
  icon: string;
} {
  switch (type) {
    case 'Bridge & Flyover':
      return {
        text: 'text-indigo-700',
        icon: 'text-indigo-700',
      };
    case 'Railway':
      return {
        text: 'text-sky-700',
        icon: 'text-sky-700',
      };
    case 'Highway':
      return {
        text: 'text-teal-700',
        icon: 'text-teal-700',
      };
    case 'Industrial':
      return {
        text: 'text-amber-700',
        icon: 'text-amber-700',
      };
  }
}

export function App() {
  // Project filtering states
  const [projectSector, setProjectSector] = useState<string>('All');
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>('All');
  const [projectStatus, setProjectStatus] = useState<string>('All');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Client filtering state
  const [clientSector, setClientSector] = useState<string>('All');

  // Gallery & Credentials tab
  const [mediaView, setMediaView] = useState<'photos' | 'credentials'>('photos');
  const [photoCategory, setPhotoCategory] = useState<string>('All');
  const [credentialCategory, setCredentialCategory] = useState<string>('All');

  // Document / Image Lightbox Modal
  const [previewModal, setPreviewModal] = useState<{
    title: string;
    subtitle: string;
    path: string;
    type: 'pdf' | 'jpg';
  } | null>(null);

  // Connect / Inquiry Form state
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    sector: 'Railways & Bridges (NCR / NER / RVNL)',
    location: '',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryRecord | null>(
    null
  );

  const filteredClients = useMemo(() => {
    if (clientSector === 'All') return CLIENT_ORGANIZATIONS;
    return CLIENT_ORGANIZATIONS.filter((c) => c.sector === clientSector);
  }, [clientSector]);

  const sectorAndSearchFilteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchSector =
        projectSector === 'All' || proj.sector === projectSector;
      const matchType =
        projectTypeFilter === 'All' || proj.projectType === projectTypeFilter;
      const matchStatus =
        projectStatus === 'All' || proj.status === projectStatus;
      const q = projectSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.scope.toLowerCase().includes(q) ||
        proj.client.toLowerCase().includes(q) ||
        proj.principalAuthority.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.state.toLowerCase().includes(q) ||
        proj.projectType.toLowerCase().includes(q) ||
        proj.projectSubType.toLowerCase().includes(q) ||
        proj.engineeringSpecs.toLowerCase().includes(q);
      return matchSector && matchType && matchStatus && matchSearch;
    });
  }, [projectSector, projectTypeFilter, projectStatus, projectSearch]);

  const filteredProjects = useMemo(() => {
    if (selectedState === 'All') return sectorAndSearchFilteredProjects;
    return sectorAndSearchFilteredProjects.filter(
      (proj) => proj.state === selectedState
    );
  }, [sectorAndSearchFilteredProjects, selectedState]);

  const filteredPhotos = useMemo(() => {
    if (photoCategory === 'All') return SITE_PHOTOS;
    return SITE_PHOTOS.filter((p) => p.projectTag === photoCategory);
  }, [photoCategory]);

  const filteredCertificates = useMemo(() => {
    if (credentialCategory === 'All') return CERTIFICATES_LIST;
    return CERTIFICATES_LIST.filter((c) => c.category === credentialCategory);
  }, [credentialCategory]);

  const handleFilterByClient = (clientKeyword: string) => {
    setProjectSector('All');
    setProjectTypeFilter('All');
    setProjectStatus('All');
    setSelectedState('All');
    setActiveProjectId(null);
    setProjectSearch(clientKeyword);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openDocumentModal = (
    title: string,
    subtitle: string,
    filePath: string
  ) => {
    const ext = filePath.split('.').pop()?.toLowerCase() || '';
    const type: 'pdf' | 'jpg' = ext === 'pdf' ? 'pdf' : 'jpg';
    setPreviewModal({ title, subtitle, path: filePath, type });
  };

  useEffect(() => {
    if (!previewModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewModal]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = formData.phone.replace(/[^0-9+]/g, '');

    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid work or personal email address.');
      return;
    }
    if (phoneClean.length < 10) {
      setFormError('Please enter a valid 10-digit contact phone number.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormError(
        'Please include a brief description of the project scope, tender, or inquiry.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || 'Unable to submit inquiry at this moment.');
      } else {
        setSubmittedInquiry(data.inquiry);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          sector: 'Railways & Bridges (NCR / NER / RVNL)',
          location: '',
          message: '',
        });
      }
    } catch {
      setFormError('Network error while submitting your inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Prem Infrastructure
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#capabilities"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Capabilities
            </a>
            <a
              href="#clients"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Clients
            </a>
            <a
              href="#projects"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#gallery"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Site Gallery
            </a>
            <a
              href="#leadership"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Leadership
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#connect"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Connect With Us
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Proposition Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>Established 1991</span>
                  <span aria-hidden="true">·</span>
                  <span>Incorporated 2003</span>
                  <span aria-hidden="true">·</span>
                  <span>Kanpur Headquartered</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
                  Engineering India’s Railway Corridors, Expressways, and Heavy Civil Bridges.
                </h1>

                <p className="text-base text-slate-600 leading-relaxed max-w-[65ch]">
                  Prem Infrastructure Pvt. Ltd. (PIPL) is an established civil, structural, and mechanical engineering construction company executing major bridges, PSC girder flyovers, railway track formations, station upgradations, and PSU industrial works across seven states in India.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="#connect"
                    className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-2"
                  >
                    Discuss a Project or Tender
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#projects"
                    className="px-5 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Explore Project Portfolio
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
                  <span>CIN: {COMPANY_INFO.cin}</span>
                  <span aria-hidden="true">·</span>
                  <span>GSTIN: {COMPANY_INFO.gstin}</span>
                  <span aria-hidden="true">·</span>
                  <span>EPF: {COMPANY_INFO.epfRegNo}</span>
                </div>
              </div>

              {/* Right 16:9 Focal Visual Carrier */}
              <div className="lg:col-span-6">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                  <ResilientImage
                    src={HERO_IMAGE_URL}
                    alt="Prestressed concrete highway flyover and railway bridge construction in India"
                    fallbackTitle="Prem Infrastructure — Heavy Civil & Bridge Engineering"
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                    <div className="text-xs font-mono text-sky-300 mb-1">
                      Heavy Civil &amp; Structural Execution
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      PSC Girder Flyovers, Well &amp; Pile Foundations, and Broad Gauge Railway Bridges
                    </p>
                    <div className="text-xs text-slate-300 mt-1">
                      Executed for Indian Railways (NCR, NER, RVNL), NHAI, UPEIDA, Bridge &amp; Roof, L&amp;T, and NCC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Adjacent Quantitative Proof Strip (Only Total Workforce Shown) */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                  32+ Years
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  Continuous Civil Heritage
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Operating since 1991 across public &amp; EPC sectors
                </div>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                  20+ Works
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  Landmark Infrastructure Packages
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Bridges, expressways, rail corridors &amp; refineries
                </div>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                  {COMPANY_INFO.totalWorkforce}
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  Total Workforce Strength
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Dedicated engineering &amp; site execution team
                </div>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                  7 States
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  Pan-India Execution Footprint
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  U.P., M.P., Rajasthan, Odisha, W.B., Haryana &amp; A.P.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE ENGINEERING CAPABILITIES (Asymmetric Bento Grid — No Asset/Equipment Counts) */}
        <section id="capabilities" className="py-12 sm:py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs sm:text-[13px] font-semibold text-sky-700">
                Core Engineering Capabilities
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 leading-tight text-balance">
                Specialized Execution Across Railways, Expressways, and Industrial Plants.
              </h2>
              <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                We deliver structurally demanding civil packages both as direct contractors to Indian Railways and as trusted sub-contract execution partners to global and domestic Tier-1 EPC leaders.
              </p>
            </div>

            {/* Asymmetric Bento Grid — Optimized Spacing, Typography & Mobile Touch Targets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7">
              {/* 01. Railways — Span 7 */}
              <div className="md:col-span-2 lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between">
                <div className="p-5 sm:p-7 lg:p-8 space-y-4">
                  <div className="text-xs sm:text-[13px] font-medium text-sky-700">
                    <span>{CORE_CAPABILITIES[0].subtitle}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug text-balance">
                    {CORE_CAPABILITIES[0].index}. {CORE_CAPABILITIES[0].title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                    {CORE_CAPABILITIES[0].description}
                  </p>
                  <ul className="space-y-2.5 pt-3.5 border-t border-slate-100 text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                    {CORE_CAPABILITIES[0].metrics.map((m) => (
                      <li key={m} className="flex items-baseline gap-2.5">
                        <span className="text-sky-700 font-bold shrink-0">·</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProjectSector('Railways');
                        setProjectTypeFilter('All');
                        setProjectStatus('All');
                        setSelectedState('All');
                        setActiveProjectId(null);
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="min-h-[44px] sm:min-h-[38px] w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200/70 rounded-lg transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
                    >
                      <span>View Railway Projects</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
                <div className="h-48 sm:h-56 w-full border-t border-slate-200 overflow-hidden">
                  <ResilientImage
                    src={CAPABILITY_RAILWAY_IMAGE}
                    alt="Railway bridge and retaining wall construction"
                    fallbackTitle="Railway Bridges & Formation Engineering"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 02. Expressways — Span 5 */}
              <div className="md:col-span-2 lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between">
                <div className="p-5 sm:p-7 lg:p-8 space-y-4">
                  <div className="text-xs sm:text-[13px] font-medium text-sky-700">
                    <span>{CORE_CAPABILITIES[1].subtitle}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug text-balance">
                    {CORE_CAPABILITIES[1].index}. {CORE_CAPABILITIES[1].title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                    {CORE_CAPABILITIES[1].description}
                  </p>
                  <ul className="space-y-2.5 pt-3.5 border-t border-slate-100 text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                    {CORE_CAPABILITIES[1].metrics.map((m) => (
                      <li key={m} className="flex items-baseline gap-2.5">
                        <span className="text-sky-700 font-bold shrink-0">·</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProjectSector('Highways & Expressways');
                        setProjectTypeFilter('All');
                        setProjectStatus('All');
                        setSelectedState('All');
                        setActiveProjectId(null);
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="min-h-[44px] sm:min-h-[38px] w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200/70 rounded-lg transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
                    >
                      <span>View Expressway &amp; Highway Works</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
                <div className="h-48 sm:h-56 w-full border-t border-slate-200 overflow-hidden">
                  <ResilientImage
                    src={CAPABILITY_EXPRESSWAY_IMAGE}
                    alt="National expressway vehicular underpass and flyover"
                    fallbackTitle="National Expressways & PSC Girder Flyovers"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 03. Industrial & PSU — Span 5 */}
              <div className="md:col-span-1 lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div className="text-xs sm:text-[13px] font-medium text-sky-700">
                    <span>{CORE_CAPABILITIES[2].subtitle}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug text-balance">
                    {CORE_CAPABILITIES[2].index}. {CORE_CAPABILITIES[2].title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                    {CORE_CAPABILITIES[2].description}
                  </p>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                    {CORE_CAPABILITIES[2].metrics.map((m) => (
                      <li key={m} className="flex items-baseline gap-2.5">
                        <span className="text-sky-700 font-bold shrink-0">·</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectSector('PSU & Industrial');
                      setProjectTypeFilter('All');
                      setProjectStatus('All');
                      setSelectedState('All');
                      setActiveProjectId(null);
                      const el = document.getElementById('projects');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="min-h-[44px] sm:min-h-[38px] w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200/70 rounded-lg transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
                  >
                    <span>View Industrial &amp; PSU Works</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>

              {/* 04. Turnkey Structural Execution — Span 7 */}
              <div className="md:col-span-1 lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div className="text-xs sm:text-[13px] font-medium text-sky-700">
                    <span>{CORE_CAPABILITIES[3].subtitle}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug text-balance">
                    {CORE_CAPABILITIES[3].index}. {CORE_CAPABILITIES[3].title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                    {CORE_CAPABILITIES[3].description}
                  </p>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                    {CORE_CAPABILITIES[3].metrics.map((m) => (
                      <li key={m} className="flex items-baseline gap-2.5">
                        <span className="text-sky-700 font-bold shrink-0">·</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectSector('All');
                      setProjectTypeFilter('Bridge & Flyover');
                      setProjectStatus('All');
                      setSelectedState('All');
                      setActiveProjectId(null);
                      const el = document.getElementById('projects');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="min-h-[44px] sm:min-h-[38px] w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200/70 rounded-lg transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
                  >
                    <span>View Bridge &amp; Foundation Works</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRESTIGIOUS CLIENTS & PRINCIPAL AUTHORITIES */}
        <section id="clients" className="py-16 lg:py-20 bg-white border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-semibold text-sky-700">
                  Clients &amp; Principal Authorities
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                  Trusted by Indian Railways, National Highway Authorities, and Tier-1 EPC Leaders.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Over three decades, Prem Infrastructure has earned repeat contracts from government divisions, public sector undertakings, and premier infrastructure developers.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onMouseEnter={() =>
                    prefetchDocumentOrImage('credentials/client-registry.pdf')
                  }
                  onClick={() =>
                    openDocumentModal(
                      'Official List of Clients',
                      'Prem Infrastructure Pvt. Ltd. — Archival Client Registry',
                      'credentials/client-registry.pdf'
                    )
                  }
                  className="min-h-[44px] sm:min-h-[38px] px-4 py-2 text-xs sm:text-[13px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-700 shrink-0" />
                  <span>View Original Client Registry PDF</span>
                </button>
              </div>
            </div>

            {/* Interactive Segmented Control for Client Sectors */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit max-w-full overflow-x-auto">
              {[
                'All',
                'Indian Railways & Rail PSUs',
                'Highway Authorities',
                'Tier-1 EPC & PSU Partners',
              ].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setClientSector(sec)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    clientSector === sec
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sec === 'All' ? `All Clients (${CLIENT_ORGANIZATIONS.length})` : sec}
                </button>
              ))}
            </div>

            {/* Client Directory Grid with Real Company Logos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <CompanyLogo companyName={client.name} size="md" />
                    </div>

                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <span>{client.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{client.statesCovered}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {client.name}
                    </h3>

                    <div className="text-xs font-medium text-slate-600">
                      {client.division}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {client.keyWorksSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => handleFilterByClient(client.filterKey)}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Executed Works
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. LANDMARK PROJECTS PORTFOLIO (With Real Company Logos & Zero Financials) */}
        <section id="projects" className="py-12 sm:py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-7 sm:space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
              <div className="max-w-2xl space-y-2.5">
                <div className="text-xs sm:text-[13px] font-semibold text-sky-700">
                  Executed &amp; Ongoing Works Portfolio
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 leading-tight text-balance">
                  20 Major Infrastructure Projects Across Seven Indian States.
                </h2>
                <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                  Browse our completed and ongoing engineering works across railway formations, national highway bridges, expressway underpasses, and industrial plants.
                </p>
              </div>

              {/* Search input with 44px touch-friendly height and clear button */}
              <div className="w-full lg:w-88 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search by project, client, bridge, or state..."
                  className="w-full min-h-[44px] bg-white border border-slate-300 rounded-lg pl-10 pr-11 py-2.5 text-sm sm:text-[15px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                />
                {projectSearch && (
                  <button
                    onClick={() => setProjectSearch('')}
                    aria-label="Clear search"
                    className="absolute right-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Pan-India Execution Map (React-Leaflet — 7 Highlighted States & Pinned Projects) */}
            <div id="projects-map">
              <ProjectsFootprintMap
                projects={filteredProjects}
                allMatchingProjects={sectorAndSearchFilteredProjects}
                allProjectsCount={PROJECTS_DATA.length}
                selectedState={selectedState}
                onSelectState={(st) => setSelectedState(st)}
                activeProjectId={activeProjectId}
                onSelectProject={(id) => setActiveProjectId(id || null)}
                onOpenDocument={openDocumentModal}
              />
            </div>

            {/* Interactive Filter Controls — Touch-Target Optimized (min-h-[44px] on mobile) */}
            <div className="space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl w-full sm:w-fit max-w-full overflow-x-auto snap-x">
                  {[
                    'All',
                    'Railways',
                    'Highways & Expressways',
                    'PSU & Industrial',
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setProjectSector(sec);
                        setActiveProjectId(null);
                      }}
                      className={`min-h-[44px] sm:min-h-[38px] px-3.5 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap snap-start cursor-pointer ${
                        projectSector === sec
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {sec === 'All' ? `All Sectors (${PROJECTS_DATA.length})` : sec}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedState !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedState('All');
                        setActiveProjectId(null);
                      }}
                      className="min-h-[44px] sm:min-h-[38px] px-3.5 py-2 sm:py-1.5 text-xs sm:text-[13px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>State: {selectedState}</span>
                      <X className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  )}

                  <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl w-full sm:w-fit overflow-x-auto">
                    {['All', 'Completed', 'Ongoing Execution'].map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          setProjectStatus(st);
                          setActiveProjectId(null);
                        }}
                        className={`flex-1 sm:flex-initial min-h-[44px] sm:min-h-[38px] px-3.5 py-2 sm:py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          projectStatus === st
                            ? 'bg-white text-slate-900 shadow-xs font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st === 'All' ? 'All Statuses' : st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Type Quick Filter Bar (Bridge & Flyover, Railway, Highway, Industrial) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl w-full sm:w-fit max-w-full overflow-x-auto snap-x">
                  {(
                    [
                      'All',
                      'Bridge & Flyover',
                      'Railway',
                      'Highway',
                      'Industrial',
                    ] as const
                  ).map((pType) => {
                    const count =
                      pType === 'All'
                        ? PROJECTS_DATA.length
                        : PROJECTS_DATA.filter((p) => p.projectType === pType)
                            .length;
                    const accent =
                      pType !== 'All' ? getProjectTypeAccent(pType) : null;

                    return (
                      <button
                        key={pType}
                        onClick={() => {
                          setProjectTypeFilter(pType);
                          setActiveProjectId(null);
                        }}
                        className={`min-h-[44px] sm:min-h-[38px] px-3.5 py-2 sm:py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 snap-start cursor-pointer ${
                          projectTypeFilter === pType
                            ? 'bg-white text-slate-900 shadow-xs font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {pType !== 'All' && (
                          <ProjectTypeIcon
                            type={pType}
                            className={`w-3.5 h-3.5 shrink-0 ${
                              projectTypeFilter === pType
                                ? accent?.icon || ''
                                : 'text-slate-500'
                            }`}
                          />
                        )}
                        <span>
                          {pType === 'All'
                            ? `All Project Types (${count})`
                            : `${pType} (${count})`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs sm:text-[13px] text-slate-500 font-mono tabular-nums">
                  Showing {filteredProjects.length} of {PROJECTS_DATA.length} projects
                </div>
              </div>
            </div>

            {/* Projects List — Optimized Grid Spacing, Typography Scale & Mobile Touch Hitboxes */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center space-y-3.5">
                <div className="text-base sm:text-lg font-semibold text-slate-800">
                  No matching projects found
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Try clearing your search filter, state selection, or selecting all infrastructure sectors and project types.
                </p>
                <button
                  onClick={() => {
                    setProjectSector('All');
                    setProjectTypeFilter('All');
                    setProjectStatus('All');
                    setSelectedState('All');
                    setActiveProjectId(null);
                    setProjectSearch('');
                  }}
                  className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                {filteredProjects.map((proj) => {
                  const clientLogoKey = resolveLogoKey(proj.client);
                  const authorityLogoKey = resolveLogoKey(proj.principalAuthority);
                  const showBothLogos = clientLogoKey !== authorityLogoKey;
                  const typeAccent = getProjectTypeAccent(proj.projectType);

                  return (
                    <article
                      id={`project-card-${proj.id}`}
                      key={proj.id}
                      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-5 sm:gap-6 hover:border-slate-300 transition-colors"
                    >
                      <div className="space-y-4">
                        {/* Real Company Logos Header Row + Project Type Visual Indicator */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <CompanyLogo
                              companyName={proj.client}
                              logoKey={clientLogoKey}
                              size="sm"
                            />
                            {showBothLogos && (
                              <CompanyLogo
                                companyName={proj.principalAuthority}
                                logoKey={authorityLogoKey}
                                size="sm"
                              />
                            )}
                          </div>

                          {/* Project Type Visual Indicator (44px Mobile Touch Hitbox + Icon + Label) */}
                          <button
                            type="button"
                            onClick={() => {
                              setProjectTypeFilter((prev) =>
                                prev === proj.projectType ? 'All' : proj.projectType
                              );
                              setActiveProjectId(null);
                            }}
                            title={`Filter by ${proj.projectType} projects`}
                            className="min-h-[44px] sm:min-h-[38px] px-2.5 py-1.5 -mr-1.5 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors inline-flex items-center gap-2 text-left sm:text-right group cursor-pointer"
                          >
                            <ProjectTypeIcon
                              type={proj.projectType}
                              className={`w-4 h-4 shrink-0 ${typeAccent.icon} transition-transform group-hover:scale-105`}
                            />
                            <div className="leading-snug">
                              <div
                                className={`text-xs sm:text-[13px] font-bold ${typeAccent.text} group-hover:underline`}
                              >
                                {proj.projectType}
                              </div>
                              <div className="text-[11px] sm:text-xs font-medium text-slate-500">
                                {proj.projectSubType}
                              </div>
                            </div>
                          </button>
                        </div>

                        {/* Zero-Pill Unboxed Metadata Line with Project Type & Sector */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                          <span
                            className={`inline-flex items-center gap-1.5 font-semibold ${typeAccent.text}`}
                          >
                            <ProjectTypeIcon
                              type={proj.projectType}
                              className="w-3.5 h-3.5 shrink-0"
                            />
                            {proj.projectType}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-slate-700">
                            {proj.sector}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {proj.location}, {proj.state}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-700">
                            {proj.status}
                          </span>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-[1.3] text-balance">
                          {proj.title}
                        </h3>

                        <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                          {proj.scope}
                        </p>

                        <div className="pt-0.5 text-xs sm:text-[13px] font-mono text-slate-700 leading-relaxed break-words">
                          {proj.engineeringSpecs}
                        </div>

                        {/* Architectural Commencement & Completion Timeline Strip — Responsive Mobile & Desktop */}
                        <div className="pt-4 mt-1 border-t border-slate-100 grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-y-3 gap-x-4">
                          {/* Commencement */}
                          <div className="shrink-0 order-1">
                            <div className="text-[11px] font-semibold text-slate-400">
                              Commencement
                            </div>
                            <div className="text-xs sm:text-[13px] font-mono font-semibold text-slate-900 tabular-nums mt-0.5">
                              {proj.startDate}
                            </div>
                          </div>

                          {/* Precision Timeline Track */}
                          <div className="col-span-2 sm:flex-1 flex flex-col items-center gap-1.5 px-0 sm:px-2 sm:max-w-[220px] order-3 sm:order-2">
                            <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                              {proj.period}
                            </span>
                            <div className="w-full flex items-center">
                              <span className="w-2.5 h-2.5 rounded-full border-2 border-sky-700 bg-white shrink-0" />
                              <div className="flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                                <div
                                  className={`h-full ${
                                    proj.status === 'Completed'
                                      ? 'w-full bg-sky-700/75'
                                      : 'w-3/4 bg-amber-500'
                                  }`}
                                />
                              </div>
                              <span
                                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                  proj.status === 'Completed'
                                    ? 'bg-sky-700'
                                    : 'bg-amber-500'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Completion / Current Phase */}
                          <div className="shrink-0 text-right order-2 sm:order-3">
                            <div className="text-[11px] font-semibold text-slate-400">
                              {proj.status === 'Completed'
                                ? 'Completion'
                                : 'Current Stage'}
                            </div>
                            <div
                              className={`text-xs sm:text-[13px] font-mono font-semibold tabular-nums mt-0.5 ${
                                proj.status === 'Completed'
                                  ? 'text-slate-900'
                                  : 'text-amber-700'
                              }`}
                            >
                              {proj.endDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-xs sm:text-[13px] text-slate-500 space-y-1 leading-snug">
                          <div>
                            <span className="text-slate-400">Client: </span>
                            <span className="font-semibold text-slate-800">
                              {proj.client}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Authority: </span>
                            <span className="text-slate-700">
                              {proj.principalAuthority}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons — Minimum 44px Touch Hitbox on Mobile */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0">
                          <button
                            onClick={() => {
                              setActiveProjectId(proj.id);
                              const mapEl = document.getElementById('projects-map');
                              if (mapEl) {
                                mapEl.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                });
                              }
                            }}
                            className="flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-1.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300/70 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                          >
                            <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
                            <span>Pin on Map</span>
                          </button>
                          {proj.sitePhotoPath && (
                            <button
                              onMouseEnter={() =>
                                prefetchDocumentOrImage(proj.sitePhotoPath)
                              }
                              onClick={() =>
                                openDocumentModal(
                                  proj.title,
                                  `Site Execution Photograph · ${proj.location}`,
                                  proj.sitePhotoPath!
                                )
                              }
                              className="flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-1.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300/70 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                            >
                              <Eye className="w-4 h-4 shrink-0" />
                              <span>Site Photo</span>
                            </button>
                          )}
                          {proj.certificatePath && (
                            <button
                              onMouseEnter={() =>
                                prefetchDocumentOrImage(proj.certificatePath)
                              }
                              onClick={() =>
                                openDocumentModal(
                                  proj.title,
                                  `Completion / LOI Credential · ${proj.client}`,
                                  proj.certificatePath!
                                )
                              }
                              className="flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-1.5 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200/70 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                            >
                              <FileText className="w-4 h-4 shrink-0" />
                              <span>Credential</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 5. ON-SITE EXECUTION GALLERY & CREDENTIALS ARCHIVE */}
        <section id="gallery" className="py-16 lg:py-20 bg-white border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-semibold text-sky-700">
                  Field Documentation &amp; Statutory Credentials
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                  On-Site Construction Gallery &amp; Official Completion Certificates.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Inspect authentic site photographs from our bridge, flyover, and railway corridors alongside official completion certificates and statutory registrations.
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
                <button
                  onClick={() => setMediaView('photos')}
                  className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    mediaView === 'photos'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Site Photographs ({SITE_PHOTOS.length})
                </button>
                <button
                  onClick={() => setMediaView('credentials')}
                  className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    mediaView === 'credentials'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Certificates &amp; Registrations ({CERTIFICATES_LIST.length})
                </button>
              </div>
            </div>

            {mediaView === 'photos' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit max-w-full overflow-x-auto">
                  {[
                    'All',
                    'Railways (NCR Kanpur)',
                    'Highways (NH-26 Flyover)',
                    'Bridges & RVNL Bina',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setPhotoCategory(tag)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        photoCategory === tag
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tag === 'All' ? 'All Site Corridors' : tag}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() =>
                        openDocumentModal(
                          photo.title,
                          `${photo.projectTag} · ${photo.locationLabel}`,
                          photo.filePath
                        )
                      }
                      className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-slate-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="aspect-4/3 w-full overflow-hidden bg-slate-200">
                        <ResilientImage
                          src={getFileUrl(photo.filePath)}
                          alt={photo.title}
                          fallbackTitle={photo.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{photo.projectTag}</span>
                          <span aria-hidden="true">·</span>
                          <span>{photo.locationLabel}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                          {photo.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit max-w-full overflow-x-auto">
                  {[
                    'All',
                    'Corporate & Statutory',
                    'Railways Credentials',
                    'Highways & Bridges Credentials',
                    'Industrial & PSU Credentials',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCredentialCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        credentialCategory === cat
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat === 'All' ? 'All Credentials' : cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-sky-700">
                            {cert.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="uppercase font-mono">{cert.fileType}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {cert.title}
                        </h3>
                        <div className="text-xs text-slate-600">
                          Issued by: {cert.issuer}
                        </div>
                        <div className="text-xs font-mono text-slate-500 pt-1">
                          {cert.referenceNote}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                        <button
                          onMouseEnter={() =>
                            prefetchDocumentOrImage(cert.filePath)
                          }
                          onClick={() =>
                            openDocumentModal(
                              cert.title,
                              `${cert.issuer} · ${cert.referenceNote}`,
                              cert.filePath
                            )
                          }
                          className="px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-white border border-slate-300 hover:border-slate-400 rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-700" />
                          Inspect Document
                        </button>
                        <a
                          href={getFileUrl(cert.filePath, true)}
                          download
                          className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. CORPORATE LEADERSHIP & HERITAGE (No Employee Breakdown or Equipment Tables) */}
        <section id="leadership" className="py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-semibold text-sky-700">
                  Corporate Leadership &amp; Heritage
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                  Three Decades of Hands-On Engineering Leadership.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {COMPANY_INFO.overview}
                </p>
                <div className="pt-2 space-y-3 border-t border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Corporate Vision
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {COMPANY_INFO.vision}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Corporate Mission
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {COMPANY_INFO.mission}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                {COMPANY_INFO.directors.map((dir, index) => (
                  <div
                    key={dir.name}
                    className="bg-white border border-slate-200 rounded-xl p-6 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        0{index + 1}. {dir.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        {dir.experience}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-sky-700">
                      {dir.role}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {dir.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONNECT WITH US / INTERACTIVE LEAD & TENDER INQUIRY */}
        <section id="connect" className="py-16 lg:py-20 bg-white">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Contact & Head Office Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-sky-700">
                    Connect With Prem Infrastructure
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                    Partner With Us for Railway, Highway &amp; Civil EPC Works.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Whether you are a public infrastructure authority, a Tier-1 EPC developer seeking a reliable bridge and civil execution partner, or a project consultant, our Kanpur Head Office team responds promptly.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Registered Head Office
                      </div>
                      <div className="text-sm text-slate-600 mt-0.5">
                        {COMPANY_INFO.registeredAddress}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Direct Telephone Lines
                      </div>
                      <div className="text-sm text-slate-600 mt-0.5 space-x-3 font-mono">
                        {COMPANY_INFO.phones.map((ph) => (
                          <a
                            key={ph}
                            href={`tel:${ph.replace(/\s+/g, '')}`}
                            className="hover:text-sky-700 underline-offset-4 hover:underline inline-block"
                          >
                            {ph}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Corporate Email Desks
                      </div>
                      <div className="text-sm text-slate-600 mt-0.5 space-y-0.5 font-mono">
                        {COMPANY_INFO.emails.map((em) => (
                          <div key={em}>
                            <a
                              href={`mailto:${em}`}
                              className="hover:text-sky-700 underline-offset-4 hover:underline"
                            >
                              {em}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-xs font-semibold text-slate-900">
                    Vendor Onboarding &amp; Statutory Identifiers
                  </div>
                  <div className="text-xs text-slate-600 font-mono space-y-1">
                    <div>Entity: {COMPANY_INFO.legalName}</div>
                    <div>CIN: {COMPANY_INFO.cin}</div>
                    <div>GSTIN (U.P.): {COMPANY_INFO.gstin}</div>
                    <div>EPF Code: {COMPANY_INFO.epfRegNo}</div>
                  </div>
                </div>
              </div>

              {/* Right Interactive Project Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                    Submit a Project or Partnership Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6">
                    Share your tender details, sub-contract package scope, or inquiry below.
                  </p>

                  {submittedInquiry ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-2.5 text-emerald-700 font-semibold text-base">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Inquiry Registered with Prem Infrastructure</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Thank you, <strong className="text-slate-900">{submittedInquiry.name}</strong>. Your inquiry regarding{' '}
                        <strong className="text-slate-900">{submittedInquiry.sector}</strong> has been logged for our Managing Director and Tendering Desk at Kakadeo, Kanpur.
                      </p>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 space-y-1">
                        <div>Reference ID: {submittedInquiry.referenceNo}</div>
                        <div>Organization: {submittedInquiry.organization}</div>
                        <div>Contact: {submittedInquiry.email} · {submittedInquiry.phone}</div>
                        <div>Location: {submittedInquiry.location}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => setSubmittedInquiry(null)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                        <a
                          href={`mailto:preminfra.knp@gmail.com?subject=${encodeURIComponent(
                            `Project Inquiry [${submittedInquiry.referenceNo}] - ${submittedInquiry.organization}`
                          )}&body=${encodeURIComponent(submittedInquiry.message)}`}
                          className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-200/70 rounded-lg"
                        >
                          Send Copy via Email Client
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4" noValidate>
                      {formError && (
                        <div
                          role="alert"
                          className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800"
                        >
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inq-name"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Your Full Name *
                          </label>
                          <input
                            id="inq-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="e.g., Rajesh Sharma"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="inq-org"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Organization / Authority
                          </label>
                          <input
                            id="inq-org"
                            type="text"
                            value={formData.organization}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                organization: e.target.value,
                              })
                            }
                            placeholder="e.g., L&T Construction / NCR / NHAI"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inq-email"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            id="inq-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="name@company.com"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="inq-phone"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Phone / Mobile Number *
                          </label>
                          <input
                            id="inq-phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+91 98380 XXXXX"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inq-sector"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Infrastructure Sector
                          </label>
                          <select
                            id="inq-sector"
                            value={formData.sector}
                            onChange={(e) =>
                              setFormData({ ...formData, sector: e.target.value })
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-700"
                          >
                            <option value="Railways & Bridges (NCR / NER / RVNL)">
                              Railways &amp; Bridges (NCR / NER / RVNL)
                            </option>
                            <option value="Expressways & Highways (NHAI / UPEIDA)">
                              Expressways &amp; Highways (NHAI / UPEIDA)
                            </option>
                            <option value="PSU & Industrial Civil Works">
                              PSU &amp; Industrial Civil Works
                            </option>
                            <option value="EPC Sub-Contract Partnership">
                              EPC Sub-Contract Partnership
                            </option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="inq-location"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Project Location / State
                          </label>
                          <input
                            id="inq-location"
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                location: e.target.value,
                              })
                            }
                            placeholder="e.g., Kanpur, U.P. / Madhya Pradesh"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="inq-message"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Project Scope, Tender Reference, or Inquiry Details *
                        </label>
                        <textarea
                          id="inq-message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Describe the bridge, highway, railway, or structural work package..."
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-700"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-6 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-60 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          {submitting
                            ? 'Submitting Inquiry...'
                            : 'Submit Project Inquiry'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Corporate Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-5 space-y-2">
              <div className="font-display text-lg font-bold text-white">
                Prem Infrastructure Pvt. Ltd.
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Civil, Structural &amp; Mechanical Engineers. Serving Indian Railways, National Highways, and Public Sector Undertakings since 1991.
              </p>
              <div className="text-xs font-mono text-slate-400 pt-1">
                Regd. Office: {COMPANY_INFO.registeredAddress}
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="font-semibold text-white">Quick Navigation</div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <a href="#capabilities" className="hover:text-white">
                    Engineering Capabilities
                  </a>
                </li>
                <li>
                  <a href="#clients" className="hover:text-white">
                    Principal Authorities &amp; EPC Clients
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white">
                    Completed &amp; Ongoing Projects
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white">
                    Site Gallery &amp; Completion Credentials
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="hover:text-white">
                    Corporate Leadership
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <div className="font-semibold text-white">Corporate Credentials</div>
              <div className="text-slate-400 font-mono space-y-1">
                <div>CIN: {COMPANY_INFO.cin}</div>
                <div>GSTIN: {COMPANY_INFO.gstin}</div>
                <div>EPF: {COMPANY_INFO.epfRegNo}</div>
                <div>Phone: {COMPANY_INFO.phones[0]}</div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} Prem Infrastructure Private Limited. All rights reserved.
            </div>
            <div>Kanpur, Uttar Pradesh, India</div>
          </div>
        </div>
      </footer>

      {/* Document & Site Photo Lightbox Modal */}
      {previewModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {previewModal.title}
                </h3>
                <p className="text-xs text-slate-500 truncate">
                  {previewModal.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={getFileUrl(previewModal.path, true)}
                  download
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={() => setPreviewModal(null)}
                  aria-label="Close modal"
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-6 flex items-start justify-center min-h-[420px]">
              <ResilientImage
                src={getFileUrl(previewModal.path, false, true)}
                alt={previewModal.title}
                fallbackTitle={previewModal.title}
                priority
                className={
                  previewModal.type === 'pdf'
                    ? 'w-full max-w-3xl h-auto object-contain rounded border border-slate-200 bg-white shadow-xs'
                    : 'max-h-[74vh] w-auto object-contain rounded border border-slate-200 bg-white shadow-xs my-auto'
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
