import { Link } from "react-router-dom";
import { Download } from "lucide-react";

const reports = [
  { year: "2024-25", file: "/documents/annual-report-2024-25.pdf", thumb: "/images/report-2024-25.jpg" },
  { year: "2023-24", file: "/documents/annual-report-2023-24.pdf", thumb: "/images/report-2023-24.jpg" },
];

export default function Reports() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Annual Reports &amp; Financials
        </h1>
        <p className="mt-3 text-stone-600">
          We believe in complete transparency. Hover a report to download our
          audited financials.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
        {reports.map((report) => (
          <a
            key={report.year}
            href={report.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="overflow-hidden">
              <img
                src={report.thumb}
                alt={`Annual Report ${report.year} cover`}
                className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-ink">
                Annual Report {report.year}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-brand-500 opacity-0 transition group-hover:opacity-100">
                <Download className="h-4 w-4" /> Download PDF
              </span>
            </div>
          </a>
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
