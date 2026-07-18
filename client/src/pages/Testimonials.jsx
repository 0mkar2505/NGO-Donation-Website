import { testimonials } from "../data/content.js";

export default function Testimonials() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-stone-50 py-16">
        <div className="container-px text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            Testimonials
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Stories from the ground
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            The people whose lives are changed by your support.
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
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
      </section>
    </div>
  );
}
