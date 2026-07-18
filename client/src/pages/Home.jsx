import { Link } from "react-router-dom";
import { Heart, ArrowRight, Calendar, Utensils, Map, HeartHandshake } from "lucide-react";
import Button from "../components/Button.jsx";
import ProgramsCarousel from "../components/ProgramsCarousel.jsx";
import { stats, causes, testimonials } from "../data/content.js";

const iconMap = { calendar: Calendar, utensils: Utensils, map: Map, heart: HeartHandshake };

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-stone-50 to-stone-50">
        <div className="container-px grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700">
              <Heart className="h-4 w-4 fill-brand-500 text-brand-500" />
              Ending child malnutrition since 1990
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Every child deserves a{" "}
              <span className="text-brand-500">full plate.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              We deliver nutritious meals, maternal care, and community
              awareness to the communities that need it most across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/donate">
                <Button>
                  Donate Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#programs">
                <Button variant="outline">Explore Programs</Button>
              </a>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/AboutUs.jpg"
                alt="Children being helped"
                className="aspect-[3/4] w-full rounded-3xl object-cover shadow-lg"
              />
              <div className="mt-10 grid grid-rows-2 gap-4">
                <img
                  src="/images/Cause.png"
                  alt="Nutrition causes"
                  className="aspect-square w-full rounded-3xl object-cover shadow-lg"
                />
                <div className="flex items-center justify-center rounded-3xl bg-brand-500 p-6 text-white shadow-lg">
                  <div className="text-center">
                    <p className="font-display text-4xl font-extrabold">12M+</p>
                    <p className="text-sm text-brand-100">meals served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ink py-14 text-white">
        <div className="container-px grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.label} className="text-center">
                <Icon className="mx-auto h-7 w-7 text-brand-400" />
                <p className="mt-3 font-display text-3xl font-extrabold">{s.value}</p>
                <p className="mt-1 text-sm text-stone-400">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container-px scroll-mt-24 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              We are a non-profit fighting malnutrition by providing nutritious
              food, better healthcare, child development programs, and family
              education across India.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Nutritious food for underprivileged communities",
                "Better healthcare & child development",
                "Empowering families through education",
                "Serving communities across India since 1990",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700">
                  <span className="mt-1 text-brand-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/images/AboutUs.jpg"
            alt="Helping hands"
            className="w-full rounded-3xl object-cover shadow-md"
          />
        </div>
      </section>

      {/* CAUSES */}
      <section id="causes" className="scroll-mt-24 bg-stone-100 py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Causes of Malnutrition
            </h2>
            <p className="mt-3 text-stone-600">
              Understanding the root causes helps us target solutions that last.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {causes.map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-display text-2xl font-bold text-brand-200">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="container-px scroll-mt-24 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-3 text-stone-600">
            Targeted, measurable interventions across the country.
          </p>
        </div>
        <div className="mt-12">
          <ProgramsCarousel />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-stone-100 py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Stories from the ground
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-3xl border border-stone-200 bg-white p-7 shadow-sm"
              >
                <blockquote className="flex-1 text-stone-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-stone-100 pt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-stone-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section id="donate-cta" className="container-px py-20">
        <div className="overflow-hidden rounded-3xl bg-brand-500 px-8 py-14 text-center text-white shadow-lg sm:px-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Make a difference today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-50">
            Your contribution goes directly to meals, care, and awareness.
            Every rupee counts.
          </p>
          <Link to="/donate" className="mt-8 inline-block">
            <Button variant="outline" className="border-white bg-white text-brand-600 hover:bg-brand-50">
              Donate Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 border-t border-stone-200 py-16">
        <div className="container-px text-center">
          <h2 className="font-display text-2xl font-bold text-ink">Contact Us</h2>
          <p className="mt-3 text-stone-600">info@fightmalnutritionindia.org</p>
          <p className="text-stone-600">+91 98765 43210</p>
        </div>
      </section>
    </div>
  );
}
