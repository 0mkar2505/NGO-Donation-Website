import { causes } from "../data/content.js";

export default function Causes() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-stone-50 py-16">
        <div className="container-px text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            Causes
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Causes of Malnutrition
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Understanding the root causes helps us target solutions that last.
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <section className="bg-stone-100 py-16">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <img
            src="/images/Cause.png"
            alt="Malnutrition causes illustration"
            className="w-full rounded-3xl object-cover shadow-md"
          />
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">
              Why it matters
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              Malnutrition is rarely caused by a single factor. It is the
              intersection of food insecurity, poor sanitation, limited
              healthcare, and gaps in public programs. Our work addresses each
              layer — so progress compounds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
