export type ProjectTypeCategory =
  | 'Bridge & Flyover'
  | 'Railway'
  | 'Highway'
  | 'Industrial';

export interface ProjectItem {
  id: string;
  title: string;
  scope: string;
  engineeringSpecs: string;
  client: string;
  principalAuthority: string;
  sector: 'Railways' | 'Highways & Expressways' | 'PSU & Industrial';
  projectType: ProjectTypeCategory;
  projectSubType: string;
  location: string;
  state: string;
  period: string;
  startDate: string;
  endDate: string;
  status: 'Completed' | 'Ongoing Execution';
  coordinates: [number, number];
  certificatePath?: string;
  sitePhotoPath?: string;
}

export interface OperatingStateInfo {
  id: string;
  name: string;
  shortCode: string;
  region: string;
  center: [number, number];
  zoom: number;
  highlightSummary: string;
  keyCorridors: string[];
  polygon: [number, number][];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category:
    | 'Corporate & Statutory'
    | 'Railways Credentials'
    | 'Highways & Bridges Credentials'
    | 'Industrial & PSU Credentials';
  filePath: string;
  fileType: 'pdf' | 'jpg';
  referenceNote: string;
}

export interface SitePhotoItem {
  id: string;
  title: string;
  projectTag: string;
  locationLabel: string;
  filePath: string;
}

export interface ClientOrganization {
  id: string;
  name: string;
  shortCode: string;
  division: string;
  sector: 'Indian Railways & Rail PSUs' | 'Highway Authorities' | 'Tier-1 EPC & PSU Partners';
  statesCovered: string;
  keyWorksSummary: string;
  filterKey: string;
}

export const HERO_IMAGE_URL = '/images/hero-bridge-infrastructure.jpg';
export const CAPABILITY_RAILWAY_IMAGE =
  '/images/capability-railway-bridge.jpg';
export const CAPABILITY_EXPRESSWAY_IMAGE =
  '/images/capability-expressway-flyover.jpg';

export const COMPANY_INFO = {
  name: 'Prem Infrastructure Pvt. Ltd.',
  legalName: 'PREM INFRASTRUCTURE PRIVATE LIMITED',
  shortName: 'PIPL',
  foundationYear: 1991,
  incorporationDate: '23 October 2003',
  formerStyle: 'M/s Prem Construction Company (Est. 1991)',
  constitution: 'Private Limited Company',
  totalWorkforce: '350+',
  hqCoordinates: [26.4769, 80.2981] as [number, number],
  tagline:
    'Civil, Structural & Mechanical Engineering Contractors for Indian Railways, National Expressways & Public Sector Infrastructure',
  registeredAddress:
    '117/N/319, Raniganj, Kakadeo, Kanpur – 208025, Uttar Pradesh, India',
  cin: 'U45203UP2003PTC028014',
  gstin: '09AADCP3457A1ZN',
  epfRegNo: 'EPF/RO/E-I/UP/29355',
  emails: ['preminfra.knp@gmail.com', 'preminfra@yahoo.in'],
  phones: ['+91 98380 78302', '+91 98380 78301', '+91 97535 31648'],
  vision:
    'To be a leading civil and structural engineering organization in India, recognized for uncompromised structural integrity, timely delivery, and engineering precision across national corridors.',
  mission:
    'To build enduring public infrastructure—bridges, railway lines, expressway underpasses, and industrial complexes—while serving India’s foremost railway zones, highway authorities, and Tier-1 EPC organizations.',
  overview:
    'Founded in 1991 as M/s Prem Construction Company and incorporated as Prem Infrastructure Private Limited in October 2003, PIPL brings over three decades of dedicated civil, structural, and mechanical engineering execution. Headquartered in Kanpur, Uttar Pradesh, and powered by a 350+ strong workforce, the company has delivered complex railway bridges, multi-span highway flyovers, track doubling formations, station upgradations, and refinery civil works across Uttar Pradesh, Madhya Pradesh, Rajasthan, Odisha, West Bengal, Haryana, and Andhra Pradesh.',
  directors: [
    {
      name: 'Sri Uma Nath Singh',
      role: 'Founder & Senior Director',
      experience: '50+ Years in Civil & Heavy Construction',
      bio: 'Associated since the firm’s inception, Sri Uma Nath Singh has guided the execution of major river bridges, railway formation corridors, and thermal power civil packages across India.',
    },
    {
      name: 'Mr. Prem Kumar Singh',
      role: 'Managing Director',
      experience: '25+ Years in Project Administration & Operations',
      bio: 'Spearheads corporate operations from the Kanpur Head Office, overseeing railway and highway contract management, client coordination, and multi-site execution.',
    },
    {
      name: 'Mr. Amit Kumar Singh',
      role: 'Director (Technical & Engineering)',
      experience: 'Bachelor of Engineering (B.E.)',
      bio: 'Leads technical execution, structural quality assurance, engineering standards, and expansion into six-lane national expressway corridors.',
    },
  ],
};

export const OPERATING_STATES_DATA: OperatingStateInfo[] = [
  {
    id: 'state-up',
    name: 'Uttar Pradesh',
    shortCode: 'UP',
    region: 'Northern & Central Corridor (HQ State)',
    center: [26.65, 80.95],
    zoom: 7,
    highlightSummary:
      'Corporate Head Office (Kanpur) and 9 landmark railway & expressway packages across NCR, NER, RVNL, and UPEIDA corridors.',
    keyCorridors: [
      'Purvanchal Expressway (Pkg-VIII, Ghazipur)',
      'Lucknow–Agra Expressway (Bridges & Pile Foundations)',
      'Kanpur–Panki 3rd & 4th Railway Line (Zones II, III-A, III-B)',
      'Etawah–Mainpuri BG Line, Raebareli–Lucknow Doubling, Ballia & Deoria Stations',
    ],
    polygon: [
      [30.38, 77.58],
      [29.65, 78.85],
      [28.65, 80.15],
      [27.95, 81.65],
      [27.45, 83.45],
      [26.85, 84.35],
      [25.75, 84.62],
      [25.15, 83.45],
      [24.05, 83.32],
      [24.65, 82.05],
      [25.12, 80.85],
      [25.25, 79.45],
      [24.35, 78.32],
      [25.55, 78.42],
      [26.65, 78.85],
      [26.95, 77.65],
      [27.85, 77.45],
      [28.95, 77.15],
      [30.38, 77.58],
    ],
  },
  {
    id: 'state-mp',
    name: 'Madhya Pradesh',
    shortCode: 'MP',
    region: 'Central India Highway & Rail Corridor',
    center: [23.65, 78.35],
    zoom: 7,
    highlightSummary:
      'Major PSC Girder Flyovers, 2×35m Box Girder Bridges on NH-26 (Sagar–Jhansi–Lakhnadon), and RVNL 3rd Line Railway Bridges (Basoda–Sanchi).',
    keyCorridors: [
      'NH-26 Sagar Bypass PSC Girder Flyover (Pkg ADB II/C-5)',
      'NH-26 Jhansi–Lakhnadon 2×35m Box Girder Bridge (Pkg ADB II/C-6)',
      'RVNL Bina–Bhopal 3rd Line Minor Bridges (Vidisha District)',
    ],
    polygon: [
      [26.82, 78.15],
      [25.95, 78.85],
      [24.95, 80.25],
      [24.75, 82.65],
      [23.25, 81.95],
      [21.65, 80.75],
      [21.32, 78.65],
      [21.25, 76.15],
      [22.15, 74.15],
      [23.65, 74.45],
      [24.95, 74.85],
      [24.65, 76.55],
      [26.15, 76.75],
      [26.82, 78.15],
    ],
  },
  {
    id: 'state-rj',
    name: 'Rajasthan',
    shortCode: 'RJ',
    region: 'Western & East–West National Highway Corridor',
    center: [25.85, 74.65],
    zoom: 6,
    highlightSummary:
      'Four-laning highway rehabilitation, vehicular/pedestrian underpasses, retaining walls, and box culverts on NH-26 and NH-76.',
    keyCorridors: [
      'NH-26 Kota–Deoli Four-Laning (Pkg-3, Bundi)',
      'NH-76 East–West Corridor 43.15 Km Four-Laning Upgrade',
    ],
    polygon: [
      [30.15, 73.85],
      [29.15, 75.55],
      [28.15, 76.95],
      [27.15, 77.65],
      [26.45, 76.85],
      [25.15, 76.95],
      [24.15, 76.65],
      [23.15, 74.45],
      [24.45, 72.45],
      [24.85, 71.05],
      [26.65, 69.55],
      [28.05, 70.65],
      [29.25, 72.65],
      [30.15, 73.85],
    ],
  },
  {
    id: 'state-od',
    name: 'Odisha',
    shortCode: 'OD',
    region: 'Eastern Greenfield Economic Corridor',
    center: [20.35, 84.15],
    zoom: 7,
    highlightSummary:
      'Active execution of bridges, box culverts, and structural retaining works on the 6-Lane Raipur–Visakhapatnam Economic Corridor.',
    keyCorridors: [
      'Raipur–Visakhapatnam 6-Lane Economic Corridor (Umerkote Section, Nabarangpur)',
    ],
    polygon: [
      [22.55, 84.15],
      [22.25, 86.85],
      [21.55, 87.45],
      [20.25, 86.75],
      [19.25, 84.95],
      [18.85, 84.15],
      [17.85, 81.45],
      [19.15, 82.05],
      [20.15, 82.45],
      [21.45, 83.15],
      [22.55, 84.15],
    ],
  },
  {
    id: 'state-wb',
    name: 'West Bengal',
    shortCode: 'WB',
    region: 'Eastern Expressway & Urban Arterial Corridor',
    center: [23.15, 87.95],
    zoom: 7,
    highlightSummary:
      'Foundational expressway skew minor bridges, toll plazas, and urban arterial link road cross-drainage structures in Kolkata & Dankuni.',
    keyCorridors: [
      'Durgapur Expressway (Dankuni Package-I) — 6 Skew Minor Bridges & Toll Plaza',
      'New Town Kolkata (Rajarhat) Arterial Link Road Bridges & Box Drains',
    ],
    polygon: [
      [27.15, 88.05],
      [26.65, 89.82],
      [26.05, 88.95],
      [25.15, 88.85],
      [24.15, 88.75],
      [22.85, 88.95],
      [21.65, 88.85],
      [21.58, 87.48],
      [22.45, 86.75],
      [23.35, 85.85],
      [23.95, 86.85],
      [24.85, 87.85],
      [26.15, 87.95],
      [27.15, 88.05],
    ],
  },
  {
    id: 'state-hr',
    name: 'Haryana',
    shortCode: 'HR',
    region: 'Northern Refinery & Industrial Hub',
    center: [29.25, 76.45],
    zoom: 7,
    highlightSummary:
      'Heavy industrial civil, structural, WBM plant road, and underground piping works for Indian Oil Corporation’s Panipat Refinery Expansion.',
    keyCorridors: [
      'IOCL Panipat Refinery Expansion (Off-Site I & Delayed Coker Unit Piping)',
    ],
    polygon: [
      [30.85, 76.85],
      [30.35, 77.55],
      [29.35, 77.15],
      [28.35, 77.45],
      [27.75, 77.15],
      [28.05, 76.05],
      [28.85, 75.55],
      [29.55, 74.55],
      [29.95, 74.65],
      [29.95, 76.15],
      [30.85, 76.85],
    ],
  },
  {
    id: 'state-ap',
    name: 'Andhra Pradesh',
    shortCode: 'AP',
    region: 'East Coast Thermal Power & Industrial Corridor',
    center: [16.85, 81.65],
    zoom: 6,
    highlightSummary:
      'Coastal super thermal power plant road infrastructure, cross-drainage structures, and bituminous works in Visakhapatnam.',
    keyCorridors: [
      'NTPC Simhadri Super Thermal Power Project (Stage I & II, Visakhapatnam)',
    ],
    polygon: [
      [19.15, 84.75],
      [17.65, 83.35],
      [16.45, 81.85],
      [15.45, 80.15],
      [13.65, 80.15],
      [13.15, 79.05],
      [13.85, 77.45],
      [15.15, 77.05],
      [16.05, 78.15],
      [16.65, 79.65],
      [17.45, 81.25],
      [18.35, 82.85],
      [19.15, 84.75],
    ],
  },
];

export const CORE_CAPABILITIES = [
  {
    index: '01',
    title: 'Railway Bridges, Track Formation & Station Infrastructure',
    subtitle: 'Indian Railways (NCR, NER) & Rail Vikas Nigam Limited (RVNL)',
    description:
      'Execution of heavy RCC Box Bridges (in lieu of level crossings), minor & major railway bridges, high-embankment earthwork, massive RCC retaining walls for 3rd & 4th railway lines, ROH depot upgradation, platform surfacing, and escalator foundation works under live traffic blocks.',
    metrics: [
      'Multi-Zone Execution on Kanpur–Panki 3rd & 4th Line (Zones II, III-A, III-B)',
      'RCC Box Bridges on Etawah–Mainpuri (ETW–MNQ) New BG Line',
      'RVNL 3rd Line (Bina–Bhopal) & Raebareli–Lucknow Railway Doubling',
    ],
  },
  {
    index: '02',
    title: 'National Expressways, PSC Flyovers & Major Bridges',
    subtitle: 'NHAI Corridors & UPEIDA Expressways',
    description:
      'End-to-end construction of substructure and superstructure works including pile foundations, well foundations, pier shafts, Pre-Stressed Concrete (PSC) girders, box girder spans, Vehicular Underpasses (VUP), Pedestrian Underpasses (PUP), and box culverts on 4-lane and 6-lane national highways.',
    metrics: [
      'PSC Girder Flyover (25m × 2 & 35m × 1 Span) & 35m Box Girder Bridge on NH-26',
      'Purvanchal Expressway (Pkg-VIII) & Lucknow–Agra Expressway Structures',
      'Raipur–Visakhapatnam 6-Lane Economic Corridor & NH-76 Rajasthan Four-Laning',
    ],
  },
  {
    index: '03',
    title: 'Industrial, Refinery & Thermal Power Civil Works',
    subtitle: 'Public Sector Undertakings (IOCL, NTPC, Bridge & Roof)',
    description:
      'Specialized industrial civil and structural packages including refinery off-site civil works, Delayed Coker Unit (DCU) underground piping, RCC Hume pipe & SWS lines, heavy machine shop foundations, hardonite industrial flooring, and plant road networks.',
    metrics: [
      'IOCL Panipat Refinery Expansion — Civil, Structural & Underground Piping',
      'NTPC Simhadri Super Thermal Power Project (Stage I & II) Plant Roads',
      'IOCL Retail & Industrial Complexes in West Bengal & Northern India',
    ],
  },
  {
    index: '04',
    title: 'Turnkey Substructure, Piling & Deep Foundation Engineering',
    subtitle: 'Heavy Civil & Structural Execution Across 7 States',
    description:
      'Dedicated field engineering teams experienced in deep bored cast-in-situ pile foundations, pile caps, well sinking, heavy structural staging, and high-grade reinforced concrete works across diverse geotechnical terrains.',
    metrics: [
      'Bored Cast-in-Situ Pile Foundations & Pile Caps on Lucknow–Agra Expressway',
      'Deep Well Foundation & Heavy Pier Substructures on NH-26 Major Bridges',
      'Skew-Type Canal Minor Bridges & Arterial Cross-Drainage Box Structures',
    ],
  },
];

export const CLIENT_ORGANIZATIONS: ClientOrganization[] = [
  {
    id: 'cl-ncr',
    name: 'North Central Railway (NCR)',
    shortCode: 'NCR',
    division: 'Construction Organization & Allahabad Division, Kanpur',
    sector: 'Indian Railways & Rail PSUs',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Kanpur–Panki 3rd & 4th Line (Zones II, III-A, III-B), Etawah–Mainpuri (ETW–MNQ) New BG Line RCC Box Bridges, and GMC Kanpur Wagon ROH Depot Upgradation.',
    filterKey: 'North Central Railway',
  },
  {
    id: 'cl-ner',
    name: 'North Eastern Railway (NER)',
    shortCode: 'NER',
    division: 'Varanasi Division (Engineering Department)',
    sector: 'Indian Railways & Rail PSUs',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Ballia Railway Station Platform-2 surfacing & PP shelter improvement, and Deoria Sadar Station escalator foundation civil packages.',
    filterKey: 'North Eastern Railway',
  },
  {
    id: 'cl-rvnl',
    name: 'Rail Vikas Nigam Limited (RVNL)',
    shortCode: 'RVNL',
    division: 'Bhopal & Lucknow Project Implementation Units',
    sector: 'Indian Railways & Rail PSUs',
    statesCovered: 'Madhya Pradesh, Uttar Pradesh',
    keyWorksSummary:
      'Minor bridges on Bina–Bhopal 3rd Line (Basoda–Sanchi section) with L&T and Raebareli–Lucknow Railway Line Doubling with Simplex Infrastructures.',
    filterKey: 'RVNL',
  },
  {
    id: 'cl-nhai',
    name: 'National Highways Authority of India (NHAI)',
    shortCode: 'NHAI',
    division: 'North–South, East–West & Economic Corridors',
    sector: 'Highway Authorities',
    statesCovered: 'Madhya Pradesh, Rajasthan, Odisha',
    keyWorksSummary:
      'NH-26 Sagar Bypass Flyover & Major Bridge No. 1, NH-26 Kota–Deoli Package-3, NH-76 Rajasthan Four-Laning, and Raipur–Visakhapatnam 6-Lane Economic Corridor.',
    filterKey: 'NHAI',
  },
  {
    id: 'cl-upeida',
    name: 'U.P. Expressways Industrial Development Authority (UPEIDA)',
    shortCode: 'UPEIDA',
    division: 'Greenfield Access-Controlled Expressways',
    sector: 'Highway Authorities',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Purvanchal Expressway (Package-VIII, Ghazipur) VUP, LUP, PUP & Box Culverts and Lucknow–Agra Expressway Minor Bridges, VUP, PUP & Pile Foundations.',
    filterKey: 'UPEIDA',
  },
  {
    id: 'cl-lt',
    name: 'Larsen & Toubro Limited (L&T Construction)',
    shortCode: 'L&T ECC',
    division: 'Transportation Infrastructure IC / ECC Division',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Madhya Pradesh',
    keyWorksSummary:
      'Construction of minor bridges and structural concrete packages on the RVNL 3rd Line Rail Project (Basoda–Sanchi, Package-2).',
    filterKey: 'Larsen & Toubro',
  },
  {
    id: 'cl-ncc',
    name: 'NCC Limited (Nagarjuna Construction Co.)',
    shortCode: 'NCC',
    division: 'Transportation & Bridges Division, Lucknow',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Execution of minor bridges, VUP, PUP, box culverts, bored pile foundations, and pile caps on the Lucknow–Agra Expressway.',
    filterKey: 'NCC Limited',
  },
  {
    id: 'cl-br',
    name: 'Bridge & Roof Co. (India) Ltd.',
    shortCode: 'B&R (PSU)',
    division: 'A Government of India Enterprise',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Haryana, Andhra Pradesh, West Bengal',
    keyWorksSummary:
      'Long-standing execution partner for IOCL Panipat Refinery, NTPC Simhadri Thermal Power Plant (Visakhapatnam), Durgapur Expressway, and New Town Rajarhat Link Road.',
    filterKey: 'Bridge & Roof',
  },
  {
    id: 'cl-iocl',
    name: 'Indian Oil Corporation Limited (IOCL)',
    shortCode: 'IOCL',
    division: 'Panipat Refinery & Marketing Division (Eastern Region)',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Haryana, West Bengal',
    keyWorksSummary:
      'Panipat Refinery Expansion Project (Off-Site I & Delayed Coker Unit civil, structural & underground piping) and retail outlet complexes.',
    filterKey: 'Indian Oil',
  },
  {
    id: 'cl-ntpc',
    name: 'NTPC Limited',
    shortCode: 'NTPC',
    division: 'Simhadri Super Thermal Power Project, Visakhapatnam',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Andhra Pradesh',
    keyWorksSummary:
      'Stage I and Stage II plant road infrastructure, cross-drainage structures, and bituminous works at Simhadri STPP.',
    filterKey: 'NTPC',
  },
  {
    id: 'cl-ose',
    name: 'Oriental Structural Engineers Pvt. Ltd. (OSE)',
    shortCode: 'OSE',
    division: 'Highways & Expressways Division',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Construction of VUP, LUP, PUP (Ch. 302+130), and multi-cell box culverts on Purvanchal Expressway (Package-VIII, Kasimabad, Ghazipur).',
    filterKey: 'Oriental Structural',
  },
  {
    id: 'cl-ssy',
    name: 'SsangYong Engineering & Construction Co. Ltd.',
    shortCode: 'SSANGYONG',
    division: 'International Highway EPC Contractor (NH-26)',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Madhya Pradesh',
    keyWorksSummary:
      'Multi-span PSC Girder Flyover at Ch. 198+287 (Pkg ADB II/C-5) and Major Bridge No. 1 with 2×35m Box Girders on well foundation (Pkg ADB II/C-6) on NH-26.',
    filterKey: 'SsangYong',
  },
  {
    id: 'cl-simplex',
    name: 'Simplex Infrastructures Limited',
    shortCode: 'SIMPLEX',
    division: 'Railway & Heavy Civil Division',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Uttar Pradesh',
    keyWorksSummary:
      'Construction of minor bridges, RCC culverts, drainage works, and formation structures for Doubling of Raebareli–Lucknow Railway Line.',
    filterKey: 'Simplex',
  },
  {
    id: 'cl-afcons',
    name: 'Afcons Infrastructure & PRA Projects',
    shortCode: 'AFCONS / PRA',
    division: 'National Economic Corridors & Heavy Civil',
    sector: 'Tier-1 EPC & PSU Partners',
    statesCovered: 'Odisha, Chhattisgarh, Pan-India',
    keyWorksSummary:
      'Execution of bridges, culverts, and highway structures on the Six-Lane Raipur–Visakhapatnam Economic Corridor Expressway at Umerkote, Odisha.',
    filterKey: 'PRA Projects',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-ose-purvanchal',
    title: 'Purvanchal Expressway (Package-VIII): VUP, LUP, PUP & Box Culverts',
    scope:
      'Construction of Vehicular Underpasses (VUP), Light Vehicular Underpasses (LUP), Pedestrian Underpass at Ch. 302+130, and heavy RCC Box Culverts along the access-controlled Purvanchal Expressway corridor.',
    engineeringSpecs: 'Structures: VUP, LUP, PUP (Ch. 302+130) & Multi-Cell Box Culverts',
    client: 'Oriental Structural Engineers Pvt. Ltd. (OSE)',
    principalAuthority: 'UPEIDA (U.P. Expressways Industrial Development Authority)',
    sector: 'Highways & Expressways',
    projectType: 'Highway',
    projectSubType: 'Expressway Underpasses & Culverts',
    location: 'Kasimabad, Ghazipur District',
    state: 'Uttar Pradesh',
    period: '2019 – Execution Phase',
    startDate: 'Oct 2019',
    endDate: 'Active Execution',
    status: 'Ongoing Execution',
    coordinates: [25.7865, 83.6632],
    certificatePath: 'credentials/ose-purvanchal-expressway-pkg8.pdf',
  },
  {
    id: 'proj-pra-raipur-vizag',
    title: 'Raipur–Visakhapatnam Six-Lane Economic Corridor Expressway',
    scope:
      'Construction of minor bridges, RCC box culverts, retaining walls, and structural concrete works on the greenfield Six-Lane Economic Corridor under Bharatmala Pariyojana.',
    engineeringSpecs: 'Corridor: 6-Lane Access-Controlled Economic Corridor (Umerkote Section)',
    client: 'PRA Projects Pvt. Ltd., Raipur',
    principalAuthority: 'National Highways Authority of India (NHAI)',
    sector: 'Highways & Expressways',
    projectType: 'Highway',
    projectSubType: '6-Lane Economic Corridor',
    location: 'Umerkote, Nabarangpur District',
    state: 'Odisha',
    period: '2022 – Execution Phase',
    startDate: 'Mar 2022',
    endDate: 'Active Execution',
    status: 'Ongoing Execution',
    coordinates: [19.6661, 82.2078],
  },
  {
    id: 'proj-ner-deoria',
    title: 'Deoria Sadar Railway Station: Escalator Foundation & Civil Works',
    scope:
      'Structural foundation pits, RCC machine chambers, platform modifications, and civil works for the installation of 2 Nos. heavy-duty passenger escalators.',
    engineeringSpecs: 'Scope: 2 Nos. Escalator Structural Foundations & Station Civil Works',
    client: 'North Eastern Railway (Varanasi Division)',
    principalAuthority: 'North Eastern Railway (Tender No. NER-BSB-2020-153)',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: 'Station Escalator Foundations',
    location: 'Deoria Sadar',
    state: 'Uttar Pradesh',
    period: '2020 – Handover',
    startDate: 'Feb 2020',
    endDate: 'Dec 2021',
    status: 'Completed',
    coordinates: [26.5024, 83.7791],
  },
  {
    id: 'proj-ner-ballia',
    title: 'Ballia Railway Station: Platform-2 Surfacing & PP Shelter Works',
    scope:
      'Comprehensive civil works related to the structural improvement of Platform-2 flooring surface, drainage, and Passenger Platform (PP) shelter sheeting under live station operations.',
    engineeringSpecs: 'Division: Varanasi Division, NER (CA No. DRM/W/94)',
    client: 'North Eastern Railway (Sr. DEN-II / Varanasi)',
    principalAuthority: 'North Eastern Railway',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: 'Station Platform & Shelter',
    location: 'Ballia Railway Station',
    state: 'Uttar Pradesh',
    period: '2017 – 2019',
    startDate: 'Nov 2017',
    endDate: 'Mar 2019',
    status: 'Completed',
    coordinates: [25.7604, 84.1487],
    certificatePath: 'credentials/ner-ballia-station.pdf',
  },
  {
    id: 'proj-simplex-rvnl-rbl',
    title: 'Doubling of Raebareli–Lucknow Railway Line: Bridges & Culverts',
    scope:
      'Construction of minor bridges, RCC box culverts, track-side drainage channels, and formation civil works for the railway line doubling project.',
    engineeringSpecs: 'Corridor: Raebareli–Lucknow Broad Gauge Doubling (Northern Railway)',
    client: 'Simplex Infrastructures Limited',
    principalAuthority: 'Rail Vikas Nigam Limited (RVNL)',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: 'BG Track Doubling & Culverts',
    location: 'Raebareli – Lucknow Corridor',
    state: 'Uttar Pradesh',
    period: '2016 – 2018',
    startDate: 'Apr 2016',
    endDate: 'Sep 2018',
    status: 'Completed',
    coordinates: [26.4755, 81.118],
  },
  {
    id: 'proj-ncc-lko-agra',
    title: 'Lucknow–Agra Expressway: Minor Bridges, VUP, PUP & Pile Foundations',
    scope:
      'Full substructure and superstructure execution of minor bridges, Vehicular Underpasses (VUP), Pedestrian Underpasses (PUP), RCC box culverts, deep bored cast-in-situ pile foundations, and pile caps.',
    engineeringSpecs: 'Foundations & Superstructure: Bored Pile Foundations, Pile Caps, VUP & PUP',
    client: 'NCC Limited (Regional Office, Lucknow)',
    principalAuthority: 'UPEIDA (U.P. Expressways Authority)',
    sector: 'Highways & Expressways',
    projectType: 'Bridge & Flyover',
    projectSubType: 'Expressway Bridges & Pile Foundations',
    location: 'Lucknow – Agra Expressway',
    state: 'Uttar Pradesh',
    period: '2015 – 2017',
    startDate: 'Jan 2015',
    endDate: 'Jun 2017',
    status: 'Completed',
    coordinates: [26.892, 80.0525],
    certificatePath: 'credentials/ncc-lucknow-agra-expressway.pdf',
  },
  {
    id: 'proj-ncr-etw-mnq',
    title: 'Etawah–Mainpuri (ETW–MNQ) New BG Railway Line: RCC Box Bridges',
    scope:
      'Construction of RCC Box of size 1×4m×4m in lieu of level crossing over canal service road near Railway Bridge Nos. 7 & 39, RCC Box 2×5m×5m for Bridge No. 48, and RCC Box 1×2m×2m for Bridge No. 40B with allied wing walls.',
    engineeringSpecs: 'Bridge Specs: 2×5m×5m (Br. 48), 1×4m×4m (Br. 7 & 39), 1×2m×2m (Br. 40B)',
    client: 'North Central Railway (Dy. CE / Const. / Kanpur)',
    principalAuthority: 'Allahabad Division, North Central Railway',
    sector: 'Railways',
    projectType: 'Bridge & Flyover',
    projectSubType: 'Railway RCC Box Bridges',
    location: 'Etawah – Mainpuri Section',
    state: 'Uttar Pradesh',
    period: '2014 – 2015',
    startDate: 'Feb 2014',
    endDate: 'Aug 2015',
    status: 'Completed',
    coordinates: [26.9685, 79.0152],
    certificatePath: 'credentials/ncr-etw-mnq-bridges.pdf',
  },
  {
    id: 'proj-lt-rvnl-bina',
    title: 'RVNL 3rd Line Rail Project (Basoda–Sanchi, Pkg-2): Minor Bridges',
    scope:
      'Construction of minor railway bridges, RCC box structures, wing walls, and protection works on the Bina–Bhopal 3rd Line high-density rail corridor.',
    engineeringSpecs: 'Section: Basoda–Sanchi (Package-2, Bina–Bhopal 3rd Line)',
    client: 'Larsen & Toubro Limited (ECC Division)',
    principalAuthority: 'Rail Vikas Nigam Limited (RVNL)',
    sector: 'Railways',
    projectType: 'Bridge & Flyover',
    projectSubType: 'Railway Minor Bridges',
    location: 'Vidisha District',
    state: 'Madhya Pradesh',
    period: '2013 – 2014',
    startDate: 'Jan 2013',
    endDate: 'Nov 2014',
    status: 'Completed',
    coordinates: [23.6815, 77.882],
    sitePhotoPath: 'site-photos/rvnl-bina-minor-bridge-box.jpg',
  },
  {
    id: 'proj-pba-nh26-kota',
    title: 'NH-26 Kota–Deoli Four-Laning (Package-3): Underpasses & Culverts',
    scope:
      'Construction of Cattle & Pedestrian Underpasses (COS & PUP), multi-cell RCC box culverts, and approach friction slabs with reinforced concrete crash barriers.',
    engineeringSpecs: 'Highway Package: NH-26 Kota–Deoli Section (Package-3, Bundi)',
    client: 'PBA Infrastructure Limited',
    principalAuthority: 'National Highways Authority of India (NHAI)',
    sector: 'Highways & Expressways',
    projectType: 'Highway',
    projectSubType: '4-Lane Highway & Underpasses',
    location: 'Bundi',
    state: 'Rajasthan',
    period: '2013 – 2014',
    startDate: 'Mar 2013',
    endDate: 'Oct 2014',
    status: 'Completed',
    coordinates: [25.4385, 75.6375],
  },
  {
    id: 'proj-ssy-c6',
    title: 'NH-26 Jhansi–Lakhnadon (Pkg ADB II/C-6): Major Bridge No. 1 (Ch. 4+032)',
    scope:
      'Construction of heavy substructure and superstructure featuring 2 Nos. Box Girder spans of 35 meters each supported on deep well foundations and reinforced piers.',
    engineeringSpecs: 'Superstructure: 2 × 35m Span Box Girder on Deep Well Foundation (Km 211–255)',
    client: 'SsangYong Engineering & Construction Co. Ltd.',
    principalAuthority: 'National Highways Authority of India (NHAI)',
    sector: 'Highways & Expressways',
    projectType: 'Bridge & Flyover',
    projectSubType: '2×35m Box Girder Bridge',
    location: 'Jhansi – Lakhnadon Corridor, Sagar',
    state: 'Madhya Pradesh',
    period: '2011 – 2013',
    startDate: 'Apr 2011',
    endDate: 'Dec 2013',
    status: 'Completed',
    coordinates: [23.4012, 79.0245],
    certificatePath: 'credentials/ssangyong-nh26-major-bridge-c6.jpg',
    sitePhotoPath: 'site-photos/nh26-major-bridge-box-girder.jpg',
  },
  {
    id: 'proj-ssy-c5',
    title: 'NH-26 Sagar Bypass Four-Laning (Pkg ADB II/C-5): PSC Girder Flyover',
    scope:
      'Construction of Flyover at Ch. 198+287 comprising Pre-Stressed Concrete (PSC) Girders of 25m × 2 and 35m × 1 spans on pile foundations, along with box culverts, underpasses, and high retaining walls.',
    engineeringSpecs: 'Flyover Specs: Ch. 198+287 PSC Girder (25m × 2 & 35m × 1 Span) on Pile Foundation',
    client: 'SsangYong Engineering & Construction Co. Ltd.',
    principalAuthority: 'National Highways Authority of India (NHAI)',
    sector: 'Highways & Expressways',
    projectType: 'Bridge & Flyover',
    projectSubType: 'PSC Girder Highway Flyover',
    location: 'Sagar Bypass (Km 187 to Km 211 of NH-26)',
    state: 'Madhya Pradesh',
    period: '2010 – 2012',
    startDate: 'May 2010',
    endDate: 'Nov 2012',
    status: 'Completed',
    coordinates: [23.8388, 78.7378],
    certificatePath: 'credentials/ssangyong-nh26-sagar-flyover-c5.jpg',
    sitePhotoPath: 'site-photos/nh26-sagar-bypass-rhs-span.jpg',
  },
  {
    id: 'proj-ncr-rohgmc',
    title: 'Upgradation of Railway Wagon ROH Depot Facilities at GMC Kanpur',
    scope:
      'Construction of administrative office building, heavy machine shop, smith shop, cycle stand, internal road network, structural shed extension, earthwork in filling, and heavy-duty hardonite industrial flooring.',
    engineeringSpecs: 'Facility: Routine Overhaul (ROH) Freight Depot, Allahabad Division',
    client: 'North Central Railway (Dy. CE / Const. / Kanpur)',
    principalAuthority: 'North Central Railway, Kanpur',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: 'Wagon ROH Freight Depot',
    location: 'GMC Yard, Kanpur',
    state: 'Uttar Pradesh',
    period: '2007 – 2012',
    startDate: 'Sep 2007',
    endDate: 'Mar 2012',
    status: 'Completed',
    coordinates: [26.4495, 80.3125],
    certificatePath: 'credentials/ncr-gmc-roh-depot-kanpur.jpg',
    sitePhotoPath: 'site-photos/gmc-roh-depot-kanpur.jpg',
  },
  {
    id: 'proj-sunway-nh76',
    title: 'NH-76 Four-Laning Rehabilitation (Km 406.00 to Km 449.150)',
    scope:
      'Construction of reinforced concrete retaining walls, vehicular and pedestrian underpasses, and cross-drainage RCC box culverts for the 43.15 km four-lane highway upgrade.',
    engineeringSpecs: 'Highway Stretch: 43.15 Km Four-Lane Configuration on NH-76 (East–West Corridor)',
    client: 'Sunway Construction Sdn. Bhd. / Devi Enterprises',
    principalAuthority: 'National Highways Authority of India (NHAI)',
    sector: 'Highways & Expressways',
    projectType: 'Highway',
    projectSubType: '43.15 Km 4-Lane Rehabilitation',
    location: 'NH-76 Corridor',
    state: 'Rajasthan',
    period: '2005 – 2008',
    startDate: 'Nov 2005',
    endDate: 'Aug 2008',
    status: 'Completed',
    coordinates: [25.162, 75.324],
  },
  {
    id: 'proj-ncr-3rd4th-z2',
    title: 'Kanpur–Panki 3rd & 4th Railway Line (Zone-II): Retaining Wall & Formation',
    scope:
      'Construction of heavy RCC retaining walls, engineered embankment earthwork, and open lined drains from Ch. 7350 in connection with the 3rd & 4th broad gauge railway lines.',
    engineeringSpecs: 'Corridor: Kanpur–Panki CNB–ETW Section (Zone-II, Ch. 7350 Onwards)',
    client: 'North Central Railway (Construction / Kanpur)',
    principalAuthority: 'North Central Railway, Allahabad Division',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: '3rd & 4th Line Formation (Zone-II)',
    location: 'Kanpur – Panki Section',
    state: 'Uttar Pradesh',
    period: '2005 – 2007',
    startDate: 'Mar 2005',
    endDate: 'Jun 2007',
    status: 'Completed',
    coordinates: [26.4632, 80.254],
    certificatePath: 'credentials/ncr-kanpur-panki-zone-2.jpg',
    sitePhotoPath: 'site-photos/ncr-kanpur-panki-line-1.jpg',
  },
  {
    id: 'proj-ncr-3rd4th-z3b',
    title: 'Kanpur–Panki 3rd & 4th Railway Line (Zone III-B, Ch. 7850 to 8350)',
    scope:
      'Execution of RCC retaining walls, track embankment earthwork, and drainage structures along the high-density Kanpur–Panki railway corridor.',
    engineeringSpecs: 'Chainage: Ch. 7850 to Ch. 8350 (Zone III-B, CNB–ETW Section)',
    client: 'North Central Railway (Construction / Kanpur)',
    principalAuthority: 'North Central Railway, Allahabad Division',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: '3rd & 4th Line Formation (Zone III-B)',
    location: 'Kanpur – Panki Section',
    state: 'Uttar Pradesh',
    period: '2004 – 2007',
    startDate: 'Oct 2004',
    endDate: 'May 2007',
    status: 'Completed',
    coordinates: [26.4718, 80.211],
    certificatePath: 'credentials/ncr-kanpur-panki-zone-3b.jpg',
  },
  {
    id: 'proj-ncr-3rd4th-z3a',
    title: 'Kanpur–Panki 3rd & 4th Railway Line (Zone III-A, Ch. 7350 to 7850)',
    scope:
      'Construction of reinforced concrete retaining walls, open drainage channels, and formation earthwork for railway capacity augmentation.',
    engineeringSpecs: 'Chainage: Ch. 7350 to Ch. 7850 (Zone III-A, CNB–ETW Section)',
    client: 'North Central Railway (Construction / Kanpur)',
    principalAuthority: 'North Central Railway, Allahabad Division',
    sector: 'Railways',
    projectType: 'Railway',
    projectSubType: '3rd & 4th Line Formation (Zone III-A)',
    location: 'Kanpur – Panki Section',
    state: 'Uttar Pradesh',
    period: '2005 – 2007',
    startDate: 'Apr 2005',
    endDate: 'Jul 2007',
    status: 'Completed',
    coordinates: [26.468, 80.2335],
    certificatePath: 'credentials/ncr-kanpur-panki-zone-3a.jpg',
  },
  {
    id: 'proj-br-panipat',
    title: 'IOCL Panipat Refinery Expansion: Civil, Structural & Underground Piping',
    scope:
      'Execution of refinery earthwork, sand filling, RCC/PCC foundations, structural shuttering, WBM plant roads, and underground RCC Hume pipe & SWS piping networks for Off-Site I and Delayed Coker Unit (DCU).',
    engineeringSpecs: 'Facility: Panipat Refinery Expansion (Off-Site I & DCU Complex)',
    client: 'Bridge & Roof Co. (India) Ltd.',
    principalAuthority: 'Indian Oil Corporation Limited (IOCL)',
    sector: 'PSU & Industrial',
    projectType: 'Industrial',
    projectSubType: 'Refinery Civil & Piping',
    location: 'Panipat Refinery',
    state: 'Haryana',
    period: '2003 – 2005',
    startDate: 'Jun 2003',
    endDate: 'Sep 2005',
    status: 'Completed',
    coordinates: [29.4765, 76.8812],
    certificatePath: 'credentials/br-iocl-panipat-refinery.jpg',
  },
  {
    id: 'proj-br-ntpc-vizag',
    title: 'NTPC Simhadri Super Thermal Power Project (Stage I & II): Plant Roads',
    scope:
      'Construction of heavy-duty plant road networks, cross-drainage structures, and bituminous surfacing for Stage I and Stage II of the coastal thermal power station.',
    engineeringSpecs: 'Facility: Simhadri Super Thermal Power Project (Stage I & Stage II)',
    client: 'Bridge & Roof Co. (India) Ltd.',
    principalAuthority: 'NTPC Limited, Visakhapatnam',
    sector: 'PSU & Industrial',
    projectType: 'Industrial',
    projectSubType: 'Thermal Power Plant Roads',
    location: 'Simhadri, Visakhapatnam',
    state: 'Andhra Pradesh',
    period: '2002 – 2004',
    startDate: 'Jan 2002',
    endDate: 'Apr 2004',
    status: 'Completed',
    coordinates: [17.5962, 83.0908],
    certificatePath: 'credentials/br-ntpc-simhadri-visakhapatnam.jpg',
  },
  {
    id: 'proj-br-rajarhat',
    title: 'New Town Kolkata (Rajarhat) Link Road: Bridges, Culverts & Box Drains',
    scope:
      'Construction of cross-drainage bridges, culverts, and separator box drains along the arterial link road from Kazi Nazrul Islam Avenue to the Krishnapur Canal bridge approach.',
    engineeringSpecs: 'Corridor: North–South Arterial Link Road, New Town Rajarhat',
    client: 'Bridge & Roof Co. (India) Ltd.',
    principalAuthority: 'West Bengal Housing Directorate (WBHD)',
    sector: 'Highways & Expressways',
    projectType: 'Bridge & Flyover',
    projectSubType: 'Arterial Link Bridges & Culverts',
    location: 'Rajarhat, New Town Kolkata',
    state: 'West Bengal',
    period: '2000 – 2003',
    startDate: 'May 2000',
    endDate: 'Mar 2003',
    status: 'Completed',
    coordinates: [22.5867, 88.4595],
    certificatePath: 'credentials/br-new-town-rajarhat-kolkata.jpg',
  },
  {
    id: 'proj-br-durgapur',
    title: 'Durgapur Expressway (Dankuni Package-I): Skew Minor Bridges & Toll Plaza',
    scope:
      'Construction of 4 Nos. Skew-type Minor Bridges over Dankuni Canal for service roads, 2 Nos. Skew Minor Bridges on the main expressway, cross-drainage structures, and Toll Plaza & Rest Area works.',
    engineeringSpecs: 'Structures: 6 Nos. Skew Minor Bridges & Toll Plaza (Km 5.00 to Km 10.00)',
    client: 'Bridge & Roof Co. (India) Ltd.',
    principalAuthority: 'West Bengal PW (Roads) Directorate',
    sector: 'Highways & Expressways',
    projectType: 'Bridge & Flyover',
    projectSubType: '6 Skew Minor Bridges & Toll Plaza',
    location: 'Dankuni, Durgapur Expressway',
    state: 'West Bengal',
    period: '1995 – 1998',
    startDate: 'Aug 1995',
    endDate: 'Dec 1998',
    status: 'Completed',
    coordinates: [22.6815, 88.2912],
    certificatePath: 'credentials/br-durgapur-expressway.jpg',
  },
];

export const SITE_PHOTOS: SitePhotoItem[] = [
  {
    id: 'ph-1',
    title: 'NCR Kanpur–Panki 3rd & 4th Line — RCC Retaining Wall & Track Formation',
    projectTag: 'Railways (NCR Kanpur)',
    locationLabel: 'Kanpur–Panki Section, U.P.',
    filePath: 'site-photos/ncr-kanpur-panki-line-1.jpg',
  },
  {
    id: 'ph-2',
    title: 'NCR Kanpur–Panki 3rd & 4th Line — Lined Drainage & Embankment Works',
    projectTag: 'Railways (NCR Kanpur)',
    locationLabel: 'Kanpur–Panki Section, U.P.',
    filePath: 'site-photos/ncr-kanpur-panki-line-2.jpg',
  },
  {
    id: 'ph-3',
    title: 'NCR Kanpur–Panki 3rd & 4th Line — Continuous Retaining Wall Alignment',
    projectTag: 'Railways (NCR Kanpur)',
    locationLabel: 'Kanpur–Panki Section, U.P.',
    filePath: 'site-photos/ncr-kanpur-panki-line-3.jpg',
  },
  {
    id: 'ph-4',
    title: 'NCR Kanpur–Panki 3rd & 4th Line — Completed Retaining Structure',
    projectTag: 'Railways (NCR Kanpur)',
    locationLabel: 'Kanpur–Panki Section, U.P.',
    filePath: 'site-photos/ncr-kanpur-panki-line-4.jpg',
  },
  {
    id: 'ph-6',
    title: 'GMC ROH Depot Upgradation — Machine Shop & Structural Shed Extension',
    projectTag: 'Railways (NCR Kanpur)',
    locationLabel: 'GMC Yard, Kanpur, U.P.',
    filePath: 'site-photos/gmc-roh-depot-kanpur.jpg',
  },
  {
    id: 'ph-7',
    title: 'NH-26 Sagar Bypass Flyover — High Embankment & Subgrade Compaction',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-embankment.jpg',
  },
  {
    id: 'ph-8',
    title: 'NH-26 Sagar Bypass Flyover — RHS 1st Span Superstructure Staging',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-rhs-span.jpg',
  },
  {
    id: 'ph-9',
    title: 'NH-26 Sagar Bypass — PSC Girder & Pier Cap Formwork',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-pier-cap-1.jpg',
  },
  {
    id: 'ph-10',
    title: 'NH-26 Sagar Bypass — Heavy Reinforcement Cage & Deck Staging',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-reinforcement-2.jpg',
  },
  {
    id: 'ph-11',
    title: 'NH-26 Flyover — Pier Shaft & Retaining Wall Execution',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-pier-shaft.jpg',
  },
  {
    id: 'ph-12',
    title: 'NH-26 Flyover — Deck Slab & PSC Girder Superstructure Progress',
    projectTag: 'Highways (NH-26 Flyover)',
    locationLabel: 'Sagar Bypass, NH-26, M.P.',
    filePath: 'site-photos/nh26-sagar-bypass-deck-slab.jpg',
  },
  {
    id: 'ph-13',
    title: 'Deep Bridge Foundation & High-Density Reinforcement Cage',
    projectTag: 'Bridges & RVNL Bina',
    locationLabel: 'Bina–Bhopal / NH-26 Section',
    filePath: 'site-photos/rvnl-bina-deep-foundation.jpg',
  },
  {
    id: 'ph-14',
    title: 'Minor Bridge RCC Box & Wing Wall Construction',
    projectTag: 'Bridges & RVNL Bina',
    locationLabel: 'Vidisha / Bina Section, M.P.',
    filePath: 'site-photos/rvnl-bina-minor-bridge-box.jpg',
  },
  {
    id: 'ph-15',
    title: 'Major Bridge 35m Box Girder Superstructure Staging',
    projectTag: 'Bridges & RVNL Bina',
    locationLabel: 'Jhansi–Lakhnadon Section, M.P.',
    filePath: 'site-photos/nh26-major-bridge-box-girder.jpg',
  },
  {
    id: 'ph-16',
    title: 'Bridge Superstructure Concreting & Deck Alignment',
    projectTag: 'Bridges & RVNL Bina',
    locationLabel: 'Jhansi–Lakhnadon Section, M.P.',
    filePath: 'site-photos/nh26-major-bridge-deck-concreting.jpg',
  },
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: 'cert-incorp',
    title: 'Certificate of Incorporation (Registrar of Companies)',
    issuer: 'ROC Kanpur, Ministry of Corporate Affairs',
    category: 'Corporate & Statutory',
    filePath: 'credentials/incorporation-certificate.pdf',
    fileType: 'pdf',
    referenceNote: 'CIN: U45203UP2003PTC028014 · Incorporated 23 Oct 2003',
  },
  {
    id: 'cert-gst',
    title: 'GST Registration Certificate (Form GST REG-06)',
    issuer: 'Government of India / Uttar Pradesh State Tax',
    category: 'Corporate & Statutory',
    filePath: 'credentials/gst-registration-certificate.pdf',
    fileType: 'pdf',
    referenceNote: 'GSTIN: 09AADCP3457A1ZN',
  },
  {
    id: 'cert-epf',
    title: 'Employees’ Provident Fund (EPFO) Establishment Code',
    issuer: 'EPFO Regional Office, Kanpur',
    category: 'Corporate & Statutory',
    filePath: 'credentials/epf-registration-certificate.pdf',
    fileType: 'pdf',
    referenceNote: 'EPF Code: EPF/RO/E-I/UP/29355',
  },
  {
    id: 'cert-msme',
    title: 'MSME Registration Certificate',
    issuer: 'Ministry of Micro, Small & Medium Enterprises',
    category: 'Corporate & Statutory',
    filePath: 'credentials/msme-registration-certificate.pdf',
    fileType: 'pdf',
    referenceNote: 'Registered Infrastructure Enterprise',
  },
  {
    id: 'cert-ncr-mnq',
    title: 'NCR Completion Certificate — ETW–MNQ New BG Line RCC Box Bridges',
    issuer: 'Executive Engineer / Const. / CNB, North Central Railway',
    category: 'Railways Credentials',
    filePath: 'credentials/ncr-etw-mnq-bridges.pdf',
    fileType: 'pdf',
    referenceNote: 'Bridge Nos. 7, 39, 40B & 48 on Etawah–Mainpuri Section',
  },
  {
    id: 'cert-ner-bui',
    title: 'North Eastern Railway Credential — Ballia Station Civil Works',
    issuer: 'Sr. DEN-II / Varanasi, North Eastern Railway',
    category: 'Railways Credentials',
    filePath: 'credentials/ner-ballia-station.pdf',
    fileType: 'pdf',
    referenceNote: 'Platform-2 Surface & PP Shelter Sheeting at Ballia',
  },
  {
    id: 'cert-rohgmc-jpg',
    title: 'LOI & Performance Credential — GMC ROH Depot Upgradation, Kanpur',
    issuer: 'Dy. Chief Engineer (Const.), North Central Railway, Kanpur',
    category: 'Railways Credentials',
    filePath: 'credentials/ncr-gmc-roh-depot-kanpur.jpg',
    fileType: 'jpg',
    referenceNote: 'ROH Facilities, Machine Shop & Shed Extension at GMC Kanpur',
  },
  {
    id: 'cert-zone2-jpg',
    title: 'NCR Completion Credential — Zone-II Kanpur–Panki 3rd & 4th Line',
    issuer: 'North Central Railway, Construction Division Kanpur',
    category: 'Railways Credentials',
    filePath: 'credentials/ncr-kanpur-panki-zone-2.jpg',
    fileType: 'jpg',
    referenceNote: 'RCC Retaining Wall, Embankment & Drain in Zone-II',
  },
  {
    id: 'cert-zone3a-jpg',
    title: 'NCR Completion Credential — Zone-3A Kanpur–Panki 3rd & 4th Line',
    issuer: 'North Central Railway, Construction Division Kanpur',
    category: 'Railways Credentials',
    filePath: 'credentials/ncr-kanpur-panki-zone-3a.jpg',
    fileType: 'jpg',
    referenceNote: 'Ch. 7350 to Ch. 7850 Retaining Wall & Formation',
  },
  {
    id: 'cert-zone3b-jpg',
    title: 'NCR Completion Credential — Zone-3B Kanpur–Panki 3rd & 4th Line',
    issuer: 'North Central Railway, Construction Division Kanpur',
    category: 'Railways Credentials',
    filePath: 'credentials/ncr-kanpur-panki-zone-3b.jpg',
    fileType: 'jpg',
    referenceNote: 'Ch. 7850 to Ch. 8350 Retaining Wall & Drain Works',
  },
  {
    id: 'cert-oriental-pe8',
    title: 'LOI — Purvanchal Expressway Package-VIII (Ghazipur)',
    issuer: 'Oriental Structural Engineers Pvt. Ltd. (OSE)',
    category: 'Highways & Bridges Credentials',
    filePath: 'credentials/ose-purvanchal-expressway-pkg8.pdf',
    fileType: 'pdf',
    referenceNote: 'VUP, LUP & Box Culverts on Purvanchal Expressway Pkg-VIII',
  },
  {
    id: 'cert-ssy-c5',
    title: 'Completion Credential — NH-26 Sagar Bypass Flyover (ADB II/C-5)',
    issuer: 'SsangYong Engineering & Construction Co. Ltd.',
    category: 'Highways & Bridges Credentials',
    filePath: 'credentials/ssangyong-nh26-sagar-flyover-c5.jpg',
    fileType: 'jpg',
    referenceNote: 'PSC Girder Flyover at Ch. 198+287 on Pile Foundation',
  },
  {
    id: 'cert-ssy-c6',
    title: 'Completion Credential — NH-26 Major Bridge No. 1 (ADB II/C-6)',
    issuer: 'SsangYong Engineering & Construction Co. Ltd.',
    category: 'Highways & Bridges Credentials',
    filePath: 'credentials/ssangyong-nh26-major-bridge-c6.jpg',
    fileType: 'jpg',
    referenceNote: '2×35m Box Girder Major Bridge on Well Foundation',
  },
  {
    id: 'cert-br-durgapur-1a',
    title: 'Completion Credential — Durgapur Expressway Skew Minor Bridges',
    issuer: 'Bridge & Roof Co. (India) Ltd.',
    category: 'Highways & Bridges Credentials',
    filePath: 'credentials/br-durgapur-expressway.jpg',
    fileType: 'jpg',
    referenceNote: 'Skew Minor Bridges on Dankuni Canal & Toll Plaza Works',
  },
  {
    id: 'cert-br-rajarhat-1a',
    title: 'Completion Credential — New Town Kolkata (Rajarhat) Link Road Bridges',
    issuer: 'Bridge & Roof Co. (India) Ltd.',
    category: 'Highways & Bridges Credentials',
    filePath: 'credentials/br-new-town-rajarhat-kolkata.jpg',
    fileType: 'jpg',
    referenceNote: 'Bridges, Culverts & Box Drains for WBHD New Town',
  },
  {
    id: 'cert-br-panipat-1a',
    title: 'Completion Credential — IOCL Panipat Refinery Expansion Project',
    issuer: 'Bridge & Roof Co. (India) Ltd.',
    category: 'Industrial & PSU Credentials',
    filePath: 'credentials/br-iocl-panipat-refinery.jpg',
    fileType: 'jpg',
    referenceNote: 'Off-Site Civil, Structural & Underground Piping Works',
  },
  {
    id: 'cert-br-ntpc-1a',
    title: 'Completion Credential — NTPC Simhadri Thermal Power Project',
    issuer: 'Bridge & Roof Co. (India) Ltd.',
    category: 'Industrial & PSU Credentials',
    filePath: 'credentials/br-ntpc-simhadri-visakhapatnam.jpg',
    fileType: 'jpg',
    referenceNote: 'Stage I & II Plant Roads & Bituminous Works, Visakhapatnam',
  },
];
