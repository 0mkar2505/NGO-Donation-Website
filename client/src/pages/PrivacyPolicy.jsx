import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-10 space-y-8 text-stone-700">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              1. Information We Collect
            </h2>
            <p className="mt-3 leading-relaxed">
              When you make a donation, we collect the information you provide:
              your full name, email address, and the donation amount. We do not
              collect payment card details directly — those are handled by our
              payment processor.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              2. How We Use Your Information
            </h2>
            <p className="mt-3 leading-relaxed">
              We use your information to process donations, send receipts,
              maintain accurate records, and communicate about our programs.
              Your email is used only for transactional and occasional
              update messages that you can opt out of at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              3. Sharing of Information
            </h2>
            <p className="mt-3 leading-relaxed">
              We do not sell or share your personal data with third parties for
              marketing. The only sharing is with our payment processor purely
              to complete your transaction, governed by their own privacy
              policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              4. Data Retention &amp; Your Rights
            </h2>
            <p className="mt-3 leading-relaxed">
              We retain donation records as required for financial and legal
              compliance. You may request access to, correction of, or deletion
              of your personal data by contacting us at
              info@fightmalnutritionindia.org.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              5. Contact
            </h2>
            <p className="mt-3 leading-relaxed">
              Questions about this policy? Email
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
