import { Link } from "react-router-dom";
import { Download } from "lucide-react";

const reports = [
  { year: "2024-25", file: "/documents/annual-report-2024-25.pdf", thumb: "/images/report-2024-25.jpg" },
  { year: "2023-24", file: "/documents/annual-report-2023-24.pdf", thumb: "/images/report-2023-24.jpg" },
  { year: "2022-23", file: "/documents/annual-report-2022-23.pdf" },
];

export default function Reports() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Annual Reports &amp; Financials
        </h1>
        <p className="mt-3 text-stone-600">
          We believe in complete transparency. Download our audited financial
          reports below.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {reports.map((report) => (
          <a
            key={report.year}
            href={report.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:bg-stone-50"
          >
            {report.thumb && (
              <img
                src={report.thumb}
                alt={`Annual Report ${report.year} cover`}
                className="h-16 w-12 flex-shrink-0 rounded object-cover"
              />
            )}
            <span className="font-medium text-ink">
              Annual Report {report.year}
            </span>
            <span className="ml-auto flex items-center gap-1 text-sm font-medium text-brand-500">
              <Download className="h-4 w-4" /> Download PDF
            </span>
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
