import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "[Founder Name]",
    role: "Founder & Chairperson",
    bio: "[Short bio — background, vision, years with the organisation.]",
  },
  {
    name: "[Executive Director]",
    role: "Executive Director",
    bio: "[Short bio — operations, programs led, key achievements.]",
  },
  {
    name: "[Board Member]",
    role: "Board Member",
    bio: "[Short bio — domain expertise, governance role.]",
  },
  {
    name: "[Board Member]",
    role: "Board Member",
    bio: "[Short bio — domain expertise, governance role.]",
  },
  {
    name: "[Treasurer]",
    role: "Treasurer",
    bio: "[Short bio — finance, audit, compliance oversight.]",
  },
  {
    name: "[Medical Advisor]",
    role: "Medical Advisor",
    bio: "[Short bio — clinical nutrition expertise, program design.]",
  },
];

export default function Team() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Our Team
        </h1>
        <p className="mt-3 text-stone-600">
          Meet the people leading the fight against child malnutrition across
          India.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.name + member.role}
            className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600">
              {member.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() ||
                "NGO"}
            </div>
            <h3 className="mt-4 font-semibold text-ink">{member.name}</h3>
            <p className="mt-1 text-sm font-medium text-brand-500">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {member.bio}
            </p>
          </div>
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
