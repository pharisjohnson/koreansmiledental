import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Instagram" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight">Korean Smile</span>
          <span className="eyebrow text-[0.6rem] mt-1">Dental Clinic</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.78rem] tracking-[0.18em] uppercase font-medium link-underline"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/booking" className="btn-primary">Book Visit</Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container-luxe py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.18em] uppercase font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Book Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
