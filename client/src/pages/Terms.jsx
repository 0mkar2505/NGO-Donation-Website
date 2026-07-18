import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-10 space-y-8 text-stone-700">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3 leading-relaxed">
              By accessing this website and making a donation, you agree to
              these terms. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              2. Donations
            </h2>
            <p className="mt-3 leading-relaxed">
              Donations are voluntary contributions to support our malnutrition
              relief programs. All donations are final and non-refundable except
              where required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              3. Refund &amp; Cancellation
            </h2>
            <p className="mt-3 leading-relaxed">
              If a donation was made in error, contact
              info@fightmalnutritionindia.org within 7 days of the transaction
              with your details. Refunds are granted at our discretion and
              processed to the original payment method where possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              4. Use of Site
            </h2>
            <p className="mt-3 leading-relaxed">
              You agree not to misuse the site, attempt unauthorized access, or
              interfere with its operation. We may suspend access for violations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              5. Contact
            </h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms? Email
              info@fightmalnutritionindia.org or call +91 98765 43210.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
