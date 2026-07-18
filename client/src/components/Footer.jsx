import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-stone-300">
      <div className="container-px grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Fight Malnutrition India
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
            A non-profit dedicated to ending child malnutrition across India
            through nutritious food, maternal care, and community awareness
            since 1990.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/#about" className="hover:text-brand-300">About</a></li>
            <li><a href="/#causes" className="hover:text-brand-300">Causes</a></li>
            <li><a href="/#programs" className="hover:text-brand-300">Programs</a></li>
            <li><Link to="/donate" className="hover:text-brand-300">Donate</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-300">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>info@fightmalnutritionindia.org</li>
            <li>+91 98765 43210</li>
            <li><Link to="/admin" className="text-brand-400 hover:text-brand-300">Admin Panel</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Fight Malnutrition India. All Rights Reserved.
      </div>
    </footer>
  );
}
