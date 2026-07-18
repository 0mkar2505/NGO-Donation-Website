import { Link } from "react-router-dom";
import { Heart, ArrowRight, Calendar, Utensils, Map, HeartHandshake } from "lucide-react";
import Button from "../components/Button.jsx";
import { stats, testimonials } from "../data/content.js";

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
              <Link to="/programs">
                <Button variant="outline">Explore Programs</Button>
              </Link>
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
                <p className="mt-3 font-display text-3xl font-extrabold">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-stone-400">{s.label}</p>
              </div>
            );
          })}
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
      <section className="container-px py-20">
        <div className="overflow-hidden rounded-3xl bg-brand-500 px-8 py-14 text-center text-white shadow-lg sm:px-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Make a difference today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-50">
            Your contribution goes directly to meals, care, and awareness.
            Every rupee counts.
          </p>
          <Link to="/donate" className="mt-8 inline-block">
            <Button
              variant="outline"
              className="border-white bg-white text-brand-600 hover:bg-brand-50"
            >
              Donate Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
