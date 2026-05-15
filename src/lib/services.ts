export type Service = {
  slug: string;
  name: string;
  description: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "preventive",
    name: "Preventive & Diagnostic",
    tagline: "01 — Foundation",
    blurb:
      "Routine care that protects your smile for life. Early detection, gentle maintenance, and modern imaging.",
    services: [
      { slug: "checkups", name: "Dental Checkups & X-Rays", description: "Comprehensive exams with digital low-dose imaging for early detection." },
      { slug: "scaling-polishing", name: "Scaling & Polishing", description: "Professional teeth cleaning that removes plaque and restores natural shine." },
      { slug: "sealants", name: "Dental Sealants", description: "Protective coatings for children and adults, shielding teeth from decay." },
    ],
  },
  {
    slug: "restorative",
    name: "Restorative & Surgical",
    tagline: "02 — Restore",
    blurb:
      "From quiet repairs to advanced reconstruction — restoring function and beauty with precision craftsmanship.",
    services: [
      { slug: "fillings", name: "Dental Fillings", description: "Tooth-coloured composite fillings, virtually invisible." },
      { slug: "root-canals", name: "Root Canals", description: "Pain-free endodontic treatment to save and preserve natural teeth." },
      { slug: "post-core", name: "Post & Core", description: "Structural foundation for severely damaged teeth before crowning." },
      { slug: "extractions", name: "Tooth Extractions", description: "Gentle removal of compromised teeth with full aftercare." },
      { slug: "oral-surgery", name: "Oral Surgery Procedures", description: "Specialist surgical care performed in-clinic." },
      { slug: "dentures", name: "Dentures & Partials", description: "Custom-fit prosthetics that look and feel natural." },
      { slug: "crowns", name: "Dental Crowns", description: "Hand-finished ceramic crowns colour-matched to your smile." },
    ],
  },
  {
    slug: "orthodontics",
    name: "Orthodontics & Implants",
    tagline: "03 — Align",
    blurb:
      "Discreet alignment and life-long tooth replacement, using the latest Korean orthodontic technology.",
    services: [
      { slug: "braces", name: "Orthodontic Braces", description: "Modern fixed braces for comprehensive alignment." },
      { slug: "invisalign", name: "Invisalign Aligners", description: "Nearly invisible clear aligners — straighten on your terms." },
      { slug: "implants", name: "Dental Implants", description: "Titanium-rooted permanent replacements that feel natural." },
      { slug: "mini-screw-implants", name: "Mini Screw Implants", description: "Specialised micro-implants for precise orthodontic anchorage." },
    ],
  },
  {
    slug: "cosmetic",
    name: "Cosmetic Dentistry",
    tagline: "04 — Refine",
    blurb:
      "The signature Korean smile — bright, balanced, and unmistakably yours.",
    services: [
      { slug: "whitening", name: "Teeth Whitening", description: "Professional in-clinic and take-home whitening systems." },
      { slug: "veneers", name: "Dental Veneers", description: "Ultra-thin porcelain veneers for an effortless, refined smile." },
    ],
  },
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c.name })),
);
