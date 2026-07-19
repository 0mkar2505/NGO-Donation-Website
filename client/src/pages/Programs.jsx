import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProgramsCarousel from "../components/ProgramsCarousel.jsx";
import { programs } from "../data/content.js";

export default function Programs() {
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

      <section className="container-px py-16">
        <ProgramsCarousel />
      </section>

      <section className="bg-stone-100 py-16">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
                  {p.region}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {p.description}
                </p>
                {p.impactImage && (
                  <img
                    src={p.impactImage}
                    alt={`${p.title} impact`}
                    className="mt-4 w-full rounded-xl border border-stone-100"
                  />
                )}
              </div>
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
