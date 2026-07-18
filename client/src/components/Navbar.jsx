import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/Logo.png"
            alt="Fight Malnutrition India logo"
            className="h-9 w-auto rounded-md"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            Fight Malnutrition
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-stone-600 transition hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Donate Now
          </Link>
        </div>

        <button
          className="text-stone-700 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-stone-100 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-stone-700"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-500 px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
