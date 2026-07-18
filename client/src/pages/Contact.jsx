import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { contact } from "../data/content.js";

export default function Contact() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-stone-50 py-16">
        <div className="container-px text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            Contact
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Questions, partnerships, or volunteering — we'd love to hear from
            you.
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <Mail className="h-6 w-6 text-brand-500" />
            <div>
              <p className="font-semibold text-ink">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-stone-600 hover:text-brand-600"
              >
                {contact.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <Phone className="h-6 w-6 text-brand-500" />
            <div>
              <p className="font-semibold text-ink">Phone</p>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="text-sm text-stone-600 hover:text-brand-600"
              >
                {contact.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <MapPin className="h-6 w-6 text-brand-500" />
            <div>
              <p className="font-semibold text-ink">Address</p>
              <p className="text-sm text-stone-600">{contact.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <Clock className="h-6 w-6 text-brand-500" />
            <div>
              <p className="font-semibold text-ink">Hours</p>
              <p className="text-sm text-stone-600">{contact.hours}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
