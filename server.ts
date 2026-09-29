import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_ASSETS_DIR = path.join(__dirname, 'public');
const ALLOWED_ASSET_SUBDIRS = new Set([
  'credentials',
  'previews',
  'site-photos',
]);

// Legacy path aliases mapped to the clean public/ directory structure for backward compatibility
const LEGACY_PATH_MAP: Record<string, string> = {
  'Incorporation Certificate.pdf': 'credentials/incorporation-certificate.pdf',
  'GST REG-06.pdf': 'credentials/gst-registration-certificate.pdf',
  'EPF-Certificate.pdf': 'credentials/epf-registration-certificate.pdf',
  'MSME CERTIFICATE1.pdf': 'credentials/msme-registration-certificate.pdf',
  'LIST OF CLIENT.pdf': 'credentials/client-registry.pdf',
  '9-PDF-PIPL/NCR-CNB-(ETW-MNQ)-Certificate.pdf':
    'credentials/ncr-etw-mnq-bridges.pdf',
  '9-PDF-PIPL/Complition cert..pdf':
    'credentials/ncc-lucknow-agra-expressway.pdf',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/RAILWAYS-NER-BUI.pdf':
    'credentials/ner-ballia-station.pdf',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/LOI-ORIENTAL-PE8 PUVANCHAL EXPRESSWAY PROJECT.pdf':
    'credentials/ose-purvanchal-expressway-pkg8.pdf',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/LOI ROH GMC KNP.jpg':
    'credentials/ncr-gmc-roh-depot-kanpur.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Zone2 KNP.jpg':
    'credentials/ncr-kanpur-panki-zone-2.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Zone 3A.jpg':
    'credentials/ncr-kanpur-panki-zone-3a.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Certficate Zone3B KNP.jpg':
    'credentials/ncr-kanpur-panki-zone-3b.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/SSY-c5.jpg':
    'credentials/ssangyong-nh26-sagar-flyover-c5.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/SSY-c6.jpg':
    'credentials/ssangyong-nh26-major-bridge-c6.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Certificate of B&R Durgapur Express 1-A.jpg':
    'credentials/br-durgapur-expressway.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Certificate of Rajahat 1-A.jpg':
    'credentials/br-new-town-rajarhat-kolkata.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Certificate of B&R Panipat IOCL 1-A.jpg':
    'credentials/br-iocl-panipat-refinery.jpg',
  'PROFILE/Certificates-PIPL/Certificates-PIPL/Certificate of B&R - NTPC Vishakapatnamt 1-A.jpg':
    'credentials/br-ntpc-simhadri-visakhapatnam.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/NCR-Kanpur-3rd&4th Line.jpg':
    'site-photos/ncr-kanpur-panki-line-1.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/NCR-Kanpur-3rd&4th Line-2.jpg':
    'site-photos/ncr-kanpur-panki-line-2.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/NCR-Kanpur-3rd&4th Line3.jpg':
    'site-photos/ncr-kanpur-panki-line-3.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/NCR-Kanpur-3rd&4th Line-4.jpg':
    'site-photos/ncr-kanpur-panki-line-4.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/GMC-ROH-KANPUR-2.jpg':
    'site-photos/gmc-roh-depot-kanpur.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.08.07 embankment.JPG':
    'site-photos/nh26-sagar-bypass-embankment.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.08.09 RHS 1span.JPG':
    'site-photos/nh26-sagar-bypass-rhs-span.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.09.08 (1).JPG':
    'site-photos/nh26-sagar-bypass-pier-cap-1.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.09.08 (2).JPG':
    'site-photos/nh26-sagar-bypass-reinforcement-2.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.10.05 (4).JPG':
    'site-photos/nh26-sagar-bypass-pier-shaft.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/2010.10.12 206.JPG':
    'site-photos/nh26-sagar-bypass-deck-slab.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/17032010(009).jpg':
    'site-photos/rvnl-bina-deep-foundation.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/15012011(001).jpg':
    'site-photos/rvnl-bina-minor-bridge-box.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/06032011(001).jpg':
    'site-photos/nh26-major-bridge-box-girder.jpg',
  'PROFILE/Pictures of Flyover-SSy-RVNl Bina-L&T & Kanp/14072011047.jpg':
    'site-photos/nh26-major-bridge-deck-concreting.jpg',
};

export interface InquirySubmission {
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

const inquiriesStore: InquirySubmission[] = [];

// Lightweight in-memory rate limiter for inquiry submissions (max 10 per 15 mins per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

const MIME_MAP: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
};

// Pre-rendered high-resolution JPEG previews for PDF credentials so inline modal viewing works reliably across all browsers and sandboxed iframes
const PDF_PREVIEW_MAP: Record<string, string> = {
  'credentials/ose-purvanchal-expressway-pkg8.pdf':
    'previews/ose-purvanchal-expressway-pkg8.jpg',
  'credentials/ner-ballia-station.pdf': 'previews/ner-ballia-station.jpg',
  'credentials/ncc-lucknow-agra-expressway.pdf':
    'previews/ncc-lucknow-agra-expressway.jpg',
  'credentials/ncr-etw-mnq-bridges.pdf': 'previews/ncr-etw-mnq-bridges.jpg',
  'credentials/incorporation-certificate.pdf':
    'previews/incorporation-certificate.jpg',
  'credentials/gst-registration-certificate.pdf':
    'previews/gst-registration-certificate.jpg',
  'credentials/epf-registration-certificate.pdf':
    'previews/epf-registration-certificate.jpg',
  'credentials/msme-registration-certificate.pdf':
    'previews/msme-registration-certificate.jpg',
  'credentials/client-registry.pdf': 'previews/client-registry.jpg',
};

function sanitizeInput(input: unknown, maxLength = 500): string {
  return String(input ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

// Pre-Verify & Cache Resolved File Paths for Instant Lookup
const resolvedFileCache = new Map<
  string,
  { absPath: string; mimeType: string; fileName: string }
>();

function resolveSafeFile(
  requestedPath: string
): { absPath: string; mimeType: string; fileName: string } | null {
  if (!requestedPath || requestedPath.includes('\0')) {
    return null;
  }

  const mappedRequest = LEGACY_PATH_MAP[requestedPath] || requestedPath;
  const cached = resolvedFileCache.get(mappedRequest);
  if (cached) {
    return cached;
  }

  const normalized = path
    .normalize(mappedRequest)
    .replace(/^(\.\.(\/|\\|$))+/, '')
    .replace(/^[/\\]+/, '');

  const segments = normalized.split(path.sep);
  if (segments.length !== 2 || !ALLOWED_ASSET_SUBDIRS.has(segments[0])) {
    return null;
  }

  const absPath = path.resolve(PUBLIC_ASSETS_DIR, normalized);

  // Prevent directory traversal outside public/ directory
  if (!absPath.startsWith(PUBLIC_ASSETS_DIR + path.sep)) {
    return null;
  }

  const fileName = path.basename(absPath);
  const ext = path.extname(fileName).replace('.', '').toLowerCase();
  const mimeType = MIME_MAP[ext];

  // Only serve safe visual/document formats (.pdf, .jpg, .jpeg, .png)
  if (!mimeType) {
    return null;
  }

  try {
    const stat = fs.statSync(absPath);
    if (!stat.isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  const result = { absPath, mimeType, fileName };
  resolvedFileCache.set(mappedRequest, result);
  return result;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');

  // Security & Performance Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-DNS-Prefetch-Control', 'on');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=()'
    );
    next();
  });

  // Strict JSON payload size limit to prevent abuse
  app.use(express.json({ limit: '16kb' }));

  app.get('/api/health', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ status: 'ok', inquiriesLogged: inquiriesStore.length });
  });

  app.post('/api/inquiries', (req, res) => {
    const clientIp =
      String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'local')
        .split(',')[0]
        .trim();

    const now = Date.now();
    const rateEntry = rateLimitMap.get(clientIp);
    if (rateEntry && now < rateEntry.resetAt) {
      if (rateEntry.count >= RATE_LIMIT_MAX) {
        res.status(429).json({
          error: 'Too many inquiries submitted recently. Please try again in a few minutes.',
        });
        return;
      }
      rateEntry.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    const body = req.body || {};
    const name = sanitizeInput(body.name, 120);
    const organization = sanitizeInput(
      body.organization || 'Independent / Direct Inquiry',
      160
    );
    const email = sanitizeInput(body.email, 160);
    const phone = sanitizeInput(body.phone, 40);
    const sector = sanitizeInput(
      body.sector || 'General Civil & Structural',
      120
    );
    const location = sanitizeInput(body.location || 'Pan-India', 120);
    const message = sanitizeInput(body.message, 2000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phone.replace(/[^0-9]/g, '');

    if (!name || !emailRegex.test(email) || phoneDigits.length < 10 || message.length < 10) {
      res.status(400).json({
        error:
          'Please provide a valid name, email address, 10-digit phone number, and project inquiry details.',
      });
      return;
    }

    const refNum = `PIPL-${new Date().getFullYear()}-${String(1000 + inquiriesStore.length + 1)}`;
    const record: InquirySubmission = {
      id: `${now}`,
      referenceNo: refNum,
      name,
      organization,
      email,
      phone,
      sector,
      location,
      message,
      submittedAt: new Date(now).toISOString(),
    };

    inquiriesStore.unshift(record);
    res.setHeader('Cache-Control', 'no-store');
    res.status(201).json({ inquiry: record });
  });

  // High-Speed Cached File & Credential Streaming Endpoint
  app.get('/api/file', (req, res) => {
    const rawRequestedPath = String(req.query.path || '');
    const canonicalPath =
      LEGACY_PATH_MAP[rawRequestedPath] || rawRequestedPath;
    const isDownload = req.query.download === '1';
    const isPreview = req.query.preview === '1';

    // When previewing a PDF credential inside the modal, serve its pre-rendered high-resolution JPEG so it never gets blocked by browser PDF iframe restrictions
    const effectivePath =
      isPreview && !isDownload && PDF_PREVIEW_MAP[canonicalPath]
        ? PDF_PREVIEW_MAP[canonicalPath]
        : canonicalPath;

    const resolved =
      resolveSafeFile(effectivePath) || resolveSafeFile(canonicalPath);

    if (!resolved) {
      res.status(404).json({ error: 'Document or image not found' });
      return;
    }

    const { absPath, mimeType, fileName } = resolved;

    res.setHeader('Content-Type', mimeType);
    res.setHeader(
      'Cache-Control',
      'public, max-age=604800, stale-while-revalidate=86400, immutable'
    );
    res.setHeader(
      'Content-Disposition',
      `${isDownload ? 'attachment' : 'inline'}; filename="${encodeURIComponent(fileName)}"`
    );

    res.sendFile(absPath, {
      maxAge: '7d',
      etag: true,
      lastModified: true,
      acceptRanges: true,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '7d',
        etag: true,
        lastModified: true,
      })
    );
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Prem Infrastructure Corporate Website running on http://0.0.0.0:${PORT}`
    );
  });
}

startServer();
