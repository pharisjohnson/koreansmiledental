import { createFileRoute, Link } from "@tanstack/react-router";
import smile1 from "@/assets/smile-1.jpg";
import smile2 from "@/assets/smile-2.jpg";
import smile3 from "@/assets/smile-3.jpg";
import veneers from "@/assets/veneers.jpg";
import hero from "@/assets/hero-smile.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Smile Gallery — Korean Smile Dental" },
      { name: "description", content: "Real smile transformations from patients of Korean Smile Dental." },
      { property: "og:title", content: "Smile Gallery — Korean Smile Dental" },
      { property: "og:description", content: "Real smile transformations from our patients." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const ITEMS = [
  { src: smile1, label: "Whitening + Scaling", w: 896, h: 1120 },
  { src: hero, label: "Veneers — Cosmetic Reshape", w: 1280, h: 1600 },
  { src: smile3, label: "Smile Design", w: 896, h: 1120 },
  { src: veneers, label: "Single Veneer Detail", w: 1024, h: 1280 },
  { src: smile2, label: "Invisalign — 9 months", w: 896, h: 1120 },
  { src: smile1, label: "Crowns + Whitening", w: 896, h: 1120 },
];

function GalleryPage() {
  return (
    <>
      <section className="bg-secondary py-28">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Smile Gallery</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            Quiet transformations, <span className="italic">remarkable results.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
            Every smile here belongs to a real patient who placed their trust in our team.
            Browse a selection of recent work — and imagine what's possible for yours.
          </p>
        </div>
      </section>

      <section className="py-20 container-luxe">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <figure key={i} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  width={item.w}
                  height={item.h}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between">
                <span className="eyebrow">Case {String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-display">{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="py-28 container-luxe text-center bg-muted">
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mx-auto leading-tight">
          Could yours be next?
        </h2>
        <Link to="/booking" className="btn-primary mt-10">Start your transformation</Link>
      </section>
    </>
  );
}
