import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How is my donation used?",
    a: "The majority of every donation goes directly to field programs — nutrition kits, health-worker training, and community outreach. The remainder covers essential operational and monitoring costs.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "Yes. We are registered under Section 80G of the Income Tax Act. You will receive a receipt eligible for tax exemption.",
  },
  {
    q: "Can I get a refund?",
    a: "Donations are generally non-refundable. If you made an error in your donation, contact us within 7 days at info@fightmalnutritionindia.org.",
  },
  {
    q: "How do I report an issue or file a grievance?",
    a: "Email us at info@fightmalnutritionindia.org or call +91 98765 43210. We respond within 5 business days.",
  },
  {
    q: "Do you accept CSR / corporate donations?",
    a: "Yes, we are CSR-1 registered. Contact us at info@fightmalnutritionindia.org for partnership details.",
  },
];

export default function FAQ() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-stone-600">
          Everything you need to know about donating and working with us.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
              {faq.q}
              <Plus className="h-5 w-5 text-brand-500 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
