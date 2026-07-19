import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import { about, stats, gallery } from "../data/content.js";
import { Calendar, Utensils, Map, HeartHandshake } from "lucide-react";

const iconMap = { calendar: Calendar, utensils: Utensils, map: Map, heart: HeartHandshake };

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-stone-50 py-16">
        <div className="container-px text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            About Us
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Who we are
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            {about.intro}
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              {about.mission}
            </p>
            <ul className="mt-6 space-y-3">
              {about.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700">
                  <span className="mt-1 text-brand-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/donate" className="mt-8 inline-block">
              <Button>Support Our Mission</Button>
            </Link>
          </div>
          <img
            src="/images/AboutUs.jpg"
            alt="Our team helping communities"
            className="w-full rounded-3xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="container-px max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-ink">Our Story</h2>
          <div className="mt-6 space-y-4 text-stone-600">
            {about.story.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">
            What guides us
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {about.values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm"
            >
              <h3 className="font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">
            From the field
          </h2>
          <p className="mt-3 text-stone-600">
            A glimpse of our work across communities.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <img
                src={g.src}
                alt={g.caption}
                className="h-44 w-full object-cover"
              />
              <figcaption className="p-3 text-xs text-stone-500">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

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
    </div>
  );
}
