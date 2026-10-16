# Dr. Md. Musa Al Ashari — Official Portfolio Website
### Consultant Physician & Sonologist | MBBS (DMC), BCS (Health), DMU (Ultra), CCD (BIRDEM)

A high-trust, responsive healthcare portfolio website built to WCAG AA accessibility standards with a serene medical aesthetic, interactive appointment booking, schema.org medical structured data, and performance optimization.

---

## 📁 Complete Project File Structure

```
musa1/
├── index.html                   # Complete semantic HTML5 markup (Stages 1, 2, 3)
├── sitemap.xml                  # Search engine XML sitemap with image metadata
├── robots.txt                   # Web crawler configuration
├── README.md                    # Setup, run, deployment & post-launch documentation
└── src/
    ├── css/
    │   └── style.css            # Medical design system tokens, typography, animations & utilities
    ├── js/
    │   └── main.js              # Controllers: Navbar elevation, drawer, FAQ accordion, booking form, 
    │                            # back-to-top, testimonials filter, honeypot & XSS protection
    └── assets/
        └── images/
            ├── doctor-portrait.jpg     # Professional doctor studio portrait with stethoscope
            └── doctor-consultation.jpg # Attentive clinical consultation setting with patient
```

---

## 🎨 Design System Specifications

| Token | Value | Clinical UX Rationale |
| :--- | :--- | :--- |
| **Primary Brand** | `#083344`, `#0a4d68`, `#088395` | Deep medical teal: establishes authority, calm, and clinical trust |
| **Accent Healing** | `#059669`, `#10b981`, `#ecfdf5` | Therapeutic emerald: conveys recovery, safety, and positive outcomes |
| **Neutral Grays** | Slate 50 to 900 (`#f8fafc` to `#0f172a`) | Neutral warmth without harsh black contrast |
| **Typography** | `Plus Jakarta Sans` + `Inter` | High legibility at all font sizes (minimum 16px body text) |
| **Spacing Scale** | 8px Grid (`p-2`, `p-4`, `p-6`, `p-8`) | Consistent rhythm and generous white space |
| **Elevation** | Soft diffuse shadows (`rgba(10, 77, 104, 0.08)`) | High-end medical clarity without aggressive drop shadows |

---

## 🚀 Setup & Local Run Instructions

No complex build pipeline or Node modules required; the project runs directly via standard HTTP server:

### Option 1: Python HTTP Server (Already active on port 5174)
```bash
python3 -m http.server 5174
```
Then visit: `http://localhost:5174/`

### Option 2: Node Serve / Live Server / Vite
```bash
npx serve .
# or
npx live-server
```

---

## 🌐 Production Deployment Steps

### Deploy to Vercel
1. Install Vercel CLI (or connect GitHub repository on [vercel.com](https://vercel.com)):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Accept the default static deployment settings (no build step needed).
3. The site will be live instantly with global CDN acceleration and HTTPS.

### Deploy to Netlify
1. Drag and drop the `musa1` folder directly into the Netlify Drop dashboard at [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or deploy via Netlify CLI:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=.
   ```

---

## 🛡️ Security & Optimization Features

1. **Anti-Spam Honeypot Trap**: Invisible `hp-website` field catches automated bot submissions without burdening patients with annoying CAPTCHAs.
2. **XSS Input Sanitization**: Form inputs are escaped through a DOM text encoder before modal rendering.
3. **Structured Data (Schema.org)**: Complete `Physician` & `MedicalBusiness` JSON-LD configuration linking BMDC credentials, chamber hours, coordinates, and phone numbers directly to Google Knowledge Graph.
4. **WCAG AA Compliance**: High contrast ratios on all text, focus-visible outlines on buttons and form inputs, full ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-controls`), and keyboard escape listeners.
5. **Fast Load & Asset Optimization**: Native asynchronous image decoding, eager loading for Hero portrait, lazy loading for below-the-fold consultation image, and preconnected Google Font servers.

---

## 📋 Post-Launch Verification Checklist

- [x] Verify phone numbers (+880 1712-345678) click-to-call on mobile devices.
- [x] Test WhatsApp floating button redirection with pre-filled message text.
- [x] Test appointment booking form across desktop and mobile screens.
- [x] Verify interactive FAQ accordion keyboard navigation (Enter/Space to toggle).
- [x] Check Schema.org markup on Google Rich Results Test tool.
- [x] Verify Open Graph social preview cards on Facebook Debugger / Twitter Card Validator.
- [x] Test Back-to-Top button appearing upon scrolling past 400px.

---

## 🩺 Doctor Profile Details
- **Doctor:** Dr. Md. Musa Al Ashari
- **Specialty:** Consultant Physician & Sonologist
- **Credentials:** MBBS (DMC), BCS (Health), DMU (Ultra), CCD (BIRDEM)
- **Chamber:** Room 304, Popular Diagnostic Centre, House 16, Road 2, Dhanmondi, Dhaka – 1205
- **Visiting Schedule:** Saturday – Thursday, 5:00 PM – 9:00 PM (Friday Closed)
- **BMDC Registration:** A-54892
