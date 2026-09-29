import React, { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  RotateCcw,
  FileText,
  Eye,
  ArrowDownRight,
  Building2,
} from 'lucide-react';
import {
  COMPANY_INFO,
  OPERATING_STATES_DATA,
  ProjectItem,
} from '../data/piplData';
import { CompanyLogo, resolveLogoKey } from './CompanyLogo';

interface ProjectsFootprintMapProps {
  projects: ProjectItem[];
  allMatchingProjects: ProjectItem[];
  allProjectsCount: number;
  selectedState: string;
  onSelectState: (stateName: string) => void;
  activeProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onOpenDocument: (title: string, subtitle: string, filePath: string) => void;
}

const INDIA_CENTER: [number, number] = [23.25, 80.65];
const INDIA_DEFAULT_ZOOM = 5;

function createProjectDivIcon(
  sector: ProjectItem['sector'],
  isActive: boolean,
  isOngoing: boolean
): L.DivIcon {
  const colorMap: Record<
    ProjectItem['sector'],
    { bg: string; ring: string; stroke: string }
  > = {
    Railways: {
      bg: '#0369a1', // sky-700
      ring: 'rgba(3, 105, 161, 0.28)',
      stroke: '#ffffff',
    },
    'Highways & Expressways': {
      bg: '#d97706', // amber-600
      ring: 'rgba(217, 119, 6, 0.28)',
      stroke: '#ffffff',
    },
    'PSU & Industrial': {
      bg: '#047857', // emerald-700
      ring: 'rgba(4, 120, 87, 0.28)',
      stroke: '#ffffff',
    },
  };

  const palette = colorMap[sector];
  const size = isActive ? 36 : 28;
  const half = size / 2;

  const innerGlyph =
    sector === 'Railways'
      ? `<path d="M8 6h8v7H8zM7 16l2-2h6l2 2M10 9h4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
      : sector === 'Highways & Expressways'
      ? `<path d="M6 15c2-4 4-6 6-6s4 2 6 6M5 12h14M9 9v6M15 9v6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
      : `<path d="M6 16V9l4 2V9l4 2V7h4v9H6z" stroke="white" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`;

  const html = `
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      ${
        isOngoing || isActive
          ? `<span style="
              position: absolute;
              inset: -5px;
              border-radius: 9999px;
              background: ${palette.ring};
              border: 1.5px solid ${palette.bg};
            "></span>`
          : ''
      }
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
        background: ${palette.bg};
        border: 2.5px solid ${isActive ? '#0f172a' : palette.stroke};
        box-shadow: 0 4px 10px rgba(15, 23, 42, 0.28);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s ease;
      ">
        <svg width="${isActive ? 18 : 15}" height="${isActive ? 18 : 15}" viewBox="0 0 24 24">
          ${innerGlyph}
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'pipl-custom-marker',
    html,
    iconSize: [size, size],
    iconAnchor: [half, half],
    popupAnchor: [0, -half],
  });
}

function createHeadquartersDivIcon(): L.DivIcon {
  const html = `
    <div style="
      position: relative;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="
        position: absolute;
        inset: -5px;
        border-radius: 9999px;
        background: rgba(15, 23, 42, 0.18);
        border: 1.5px dashed #0f172a;
      "></span>
      <div style="
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 9999px;
        background: #0f172a;
        border: 2.5px solid #f59e0b;
        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'pipl-custom-marker',
    html,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
}

const MapViewportController: React.FC<{
  selectedState: string;
  activeProject: ProjectItem | null;
}> = ({ selectedState, activeProject }) => {
  const map = useMap();

  useEffect(() => {
    if (activeProject) {
      map.flyTo(activeProject.coordinates, 8, {
        duration: 0.9,
      });
      return;
    }

    if (selectedState === 'All') {
      map.flyTo(INDIA_CENTER, INDIA_DEFAULT_ZOOM, {
        duration: 0.9,
      });
      return;
    }

    const foundState = OPERATING_STATES_DATA.find(
      (s) => s.name === selectedState
    );
    if (foundState) {
      map.flyTo(foundState.center, foundState.zoom, {
        duration: 0.9,
      });
    }
  }, [selectedState, activeProject, map]);

  return null;
};

export const ProjectsFootprintMap: React.FC<ProjectsFootprintMapProps> = ({
  projects,
  allMatchingProjects,
  allProjectsCount,
  selectedState,
  onSelectState,
  activeProjectId,
  onSelectProject,
  onOpenDocument,
}) => {
  const [mapStyle, setMapStyle] = React.useState<'topo' | 'street'>('topo');
  const hqIcon = useMemo(() => createHeadquartersDivIcon(), []);

  const stateProjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const st of OPERATING_STATES_DATA) {
      counts[st.name] = allMatchingProjects.filter(
        (p) => p.state === st.name
      ).length;
    }
    return counts;
  }, [allMatchingProjects]);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || null,
    [projects, activeProjectId]
  );

  const selectedStateInfo = useMemo(
    () =>
      OPERATING_STATES_DATA.find((s) => s.name === selectedState) || null,
    [selectedState]
  );

  const handleScrollToCard = (projectId: string) => {
    onSelectProject(projectId);
    const el = document.getElementById(`project-card-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Top Bar of the Map Panel */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Pan-India Execution Footprint (7 States)</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Geospatial Map of Operating States &amp; Pinned Infrastructure Corridors
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Click any of the <strong className="font-semibold text-slate-800">7 highlighted states</strong> to zoom and filter works by state, or select any project pin to inspect engineering specifications and credentials.
          </p>
        </div>

        {/* Map Legend & Reset Button */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-700 inline-block border border-white shadow-xs" />
            <span className="text-slate-700 font-medium">Railways</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block border border-white shadow-xs" />
            <span className="text-slate-700 font-medium">Highways &amp; Expressways</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-700 inline-block border border-white shadow-xs" />
            <span className="text-slate-700 font-medium">PSU &amp; Industrial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-900 inline-block border border-amber-400 shadow-xs" />
            <span className="text-slate-700 font-medium">Kanpur HQ</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-200/80 rounded-lg">
            <button
              type="button"
              onClick={() => setMapStyle('topo')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                mapStyle === 'topo'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Topographic
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('street')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                mapStyle === 'street'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highways &amp; Rail
            </button>
          </div>

          {(selectedState !== 'All' || activeProjectId) && (
            <button
              onClick={() => {
                onSelectState('All');
                onSelectProject('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Pan-India View
            </button>
          )}
        </div>
      </div>

      {/* Main Split View: Map Canvas (8 Cols) + 7 Operating States Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Interactive React-Leaflet Map Canvas */}
        <div className="lg:col-span-8 relative h-[440px] sm:h-[520px] border-b lg:border-b-0 lg:border-r border-slate-200">
          <MapContainer
            center={INDIA_CENTER}
            zoom={INDIA_DEFAULT_ZOOM}
            minZoom={4}
            maxZoom={14}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              key={mapStyle}
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, METI'
              url={
                (import.meta as unknown as { env?: Record<string, string> }).env
                  ?.VITE_MAP_TILE_URL ||
                (mapStyle === 'topo'
                  ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                  : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}')
              }
            />

            <MapViewportController
              selectedState={selectedState}
              activeProject={activeProject}
            />

            {/* 7 Highlighted Operating States Polygons */}
            {OPERATING_STATES_DATA.map((st) => {
              const isSelected = selectedState === st.name;
              const count = stateProjectCounts[st.name] ?? 0;

              return (
                <Polygon
                  key={st.id}
                  positions={st.polygon}
                  pathOptions={{
                    color: isSelected ? '#d97706' : '#0369a1',
                    weight: isSelected ? 2.5 : 1.5,
                    fillColor: isSelected ? '#f59e0b' : '#0284c7',
                    fillOpacity: isSelected ? 0.22 : 0.12,
                    dashArray: isSelected ? undefined : '4 4',
                  }}
                  eventHandlers={{
                    click: () => {
                      onSelectProject('');
                      onSelectState(isSelected ? 'All' : st.name);
                    },
                  }}
                >
                  <Tooltip sticky direction="top" opacity={0.95}>
                    <div className="text-xs font-sans">
                      <span className="font-bold text-slate-900">{st.name}</span>{' '}
                      <span className="text-sky-700 font-semibold">
                        ({count} {count === 1 ? 'Project' : 'Projects'})
                      </span>
                      <div className="text-[11px] text-slate-500">
                        {st.region} · Click to {isSelected ? 'reset view' : 'zoom & filter'}
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}

            {/* Kanpur Corporate Headquarters Marker */}
            <Marker position={COMPANY_INFO.hqCoordinates} icon={hqIcon}>
              <Popup minWidth={260} maxWidth={300}>
                <div className="p-3.5 space-y-2 font-sans">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Registered Corporate Head Office</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {COMPANY_INFO.name}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {COMPANY_INFO.registeredAddress}
                  </p>
                  <div className="pt-1 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    CIN: {COMPANY_INFO.cin}
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Pinned Locations of Major Projects */}
            {projects.map((proj) => {
              const isActive = activeProjectId === proj.id;
              const isOngoing = proj.status === 'Ongoing Execution';
              const icon = createProjectDivIcon(proj.sector, isActive, isOngoing);
              const clientLogoKey = resolveLogoKey(proj.client);

              return (
                <Marker
                  key={proj.id}
                  position={proj.coordinates}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      onSelectProject(proj.id);
                    },
                    popupclose: () => {
                      if (activeProjectId === proj.id) {
                        onSelectProject('');
                      }
                    },
                  }}
                >
                  <Popup minWidth={280} maxWidth={320}>
                    <div className="p-3.5 space-y-2.5 font-sans">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <CompanyLogo
                          companyName={proj.client}
                          logoKey={clientLogoKey}
                          size="sm"
                        />
                        <span className="text-[11px] font-mono text-slate-600 tabular-nums font-medium">
                          {proj.startDate} → {proj.endDate}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-indigo-700">
                          {proj.projectType}
                        </span>
                        <span>·</span>
                        <span className="font-medium text-slate-700">
                          {proj.projectSubType}
                        </span>
                        <span>·</span>
                        <span>
                          {proj.location}, {proj.state}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </div>

                      <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/80">
                        {proj.engineeringSpecs}
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-0.5">
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

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleScrollToCard(proj.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowDownRight className="w-3 h-3" />
                          Locate Card
                        </button>

                        <div className="flex items-center gap-1.5">
                          {proj.sitePhotoPath && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenDocument(
                                  proj.title,
                                  `Site Execution Photograph · ${proj.location}`,
                                  proj.sitePhotoPath!
                                )
                              }
                              className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              Photo
                            </button>
                          )}
                          {proj.certificatePath && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenDocument(
                                  proj.title,
                                  `Completion / LOI Credential · ${proj.client}`,
                                  proj.certificatePath!
                                )
                              }
                              className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded inline-flex items-center gap-1 cursor-pointer"
                            >
                              <FileText className="w-3 h-3" />
                              Credential
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Floating Status Overlay in Bottom-Left of Map */}
          <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg px-3.5 py-2 shadow-sm pointer-events-none max-w-xs">
            <div className="text-[11px] font-semibold text-slate-900">
              {selectedState === 'All'
                ? 'Showing All 7 Operating States'
                : `Focused State: ${selectedState}`}
            </div>
            <div className="text-[11px] text-slate-500 tabular-nums">
              {projects.length} of {allProjectsCount} major project locations pinned
            </div>
          </div>
        </div>

        {/* Right Column: 7 Operating States Selector & Corridor Highlights */}
        <div className="lg:col-span-4 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                7 Operating States Directory
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectState('All');
                  onSelectProject('');
                }}
                className={`text-xs font-semibold cursor-pointer ${
                  selectedState === 'All'
                    ? 'text-sky-700'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All 7 States ({allProjectsCount})
              </button>
            </div>

            {/* Interactive State List */}
            <div className="space-y-1.5">
              {OPERATING_STATES_DATA.map((st) => {
                const isSelected = selectedState === st.name;
                const count = stateProjectCounts[st.name] ?? 0;

                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      onSelectProject('');
                      onSelectState(isSelected ? 'All' : st.name);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                        : 'bg-white hover:bg-slate-100/80 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-semibold ${
                            isSelected ? 'text-sky-200' : 'text-sky-700'
                          }`}
                        >
                          {st.shortCode}
                        </span>
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {st.name}
                        </span>
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-sky-100' : 'text-slate-500'
                        }`}
                      >
                        {st.region}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-xs font-mono font-semibold tabular-nums ${
                          isSelected ? 'text-white' : 'text-slate-700'
                        }`}
                      >
                        {count} {count === 1 ? 'Work' : 'Works'}
                      </span>
                      <Navigation
                        className={`w-3 h-3 ${
                          isSelected ? 'text-amber-300' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contextual State or Active Project Highlight Box */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
            {selectedStateInfo ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {selectedStateInfo.name} Footprint
                  </span>
                  <span className="text-[11px] font-mono text-sky-700 font-semibold">
                    {stateProjectCounts[selectedStateInfo.name] ?? 0} Pinned Sites
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedStateInfo.highlightSummary}
                </p>
                <ul className="space-y-1 pt-1 border-t border-slate-100">
                  {selectedStateInfo.keyCorridors.map((corridor) => (
                    <li
                      key={corridor}
                      className="text-[11px] text-slate-700 flex items-baseline gap-1.5"
                    >
                      <span className="text-sky-700 font-bold">·</span>
                      <span>{corridor}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="text-xs font-bold text-slate-900">
                  Pan-India Multi-Corridor Presence
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Headquartered in <strong className="font-semibold text-slate-800">Kanpur, Uttar Pradesh</strong>, Prem Infrastructure executes railway bridges, expressway underpasses, and industrial civil works across <strong className="font-semibold text-slate-800">U.P., M.P., Rajasthan, Odisha, West Bengal, Haryana, and Andhra Pradesh</strong>.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
