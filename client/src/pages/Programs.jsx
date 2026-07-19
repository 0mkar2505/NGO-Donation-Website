import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button.jsx";
import ProgramsCarousel from "../components/ProgramsCarousel.jsx";
import { programs } from "../data/content.js";

function Slideshow({ slides }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink shadow-md">
      <div className="relative h-[22rem] sm:h-[28rem]">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.caption}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Programs() {
  const slides = programs.map((p) => ({
    src: p.image,
    caption: p.title,
  }));
  const impacts = programs.filter((p) => p.impactImage);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-stone-50 py-16">
        <div className="container-px text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            Programs
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Our Programs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Targeted, measurable interventions across the country.
          </p>
        </div>
      </section>

      {/* Program detail carousel */}
      <section className="container-px py-16">
        <ProgramsCarousel />
      </section>

      {/* Screenshots slideshow */}
      <section className="bg-stone-100 py-16">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink">
              On the ground
            </h2>
            <p className="mt-3 text-stone-600">
              A rotating look at our programs in action.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <Slideshow slides={slides} />
          </div>
        </div>
      </section>

      {/* Impact graphs (separate entity) */}
      <section className="container-px py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">
            Measurable impact
          </h2>
          <p className="mt-3 text-stone-600">
            The outcomes each program is designed to deliver.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-2">
          {impacts.map((p) => (
            <div
              key={p.title}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-ink">{p.title}</p>
              <img
                src={p.impactImage}
                alt={`${p.title} impact`}
                className="mt-4 max-h-80 w-full rounded-xl border border-stone-100 object-contain"
              />
              <ul className="mt-4 space-y-1">
                {p.impact.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <span className="mt-0.5 text-brand-500">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="overflow-hidden rounded-3xl bg-brand-500 px-8 py-14 text-center text-white shadow-lg sm:px-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Fund a program today
          </h2>
          <Link to="/donate" className="mt-8 inline-block">
            <Button
              variant="outline"
              className="border-white bg-white text-brand-600 hover:bg-brand-50"
            >
              Donate Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
