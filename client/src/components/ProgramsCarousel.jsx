import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { programs } from "../data/content.js";

export default function ProgramsCarousel() {
  const [index, setIndex] = useState(0);
  const total = programs.length;
  const p = programs[index];

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-12">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          {p.region}
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
          {p.title}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
          {p.description}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {p.impact.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-stone-700"
            >
              <span className="mt-0.5 text-brand-500">✓</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm text-stone-400">
            {index + 1} / {total}
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Previous program"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next program"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {programs.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to program ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-500" : "w-2 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
