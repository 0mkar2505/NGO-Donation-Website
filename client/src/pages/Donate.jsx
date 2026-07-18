import { useState, useEffect } from "react";
import { Heart, CheckCircle2, Loader2, IndianRupee } from "lucide-react";
import Button from "../components/Button.jsx";
import { api } from "../lib/api.js";

const presetAmounts = [500, 1000, 2000, 5000];

export default function Donate() {
  const [form, setForm] = useState({ name: "", email: "", amount: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [recent, setRecent] = useState([]);

  const loadRecent = async () => {
    try {
      const data = await api("/donations");
      setRecent(data.slice(0, 8));
    } catch {
      setRecent([]);
    }
  };

  useEffect(() => {
    loadRecent();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await api("/donate", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      setStatus("success");
      setMessage(res.message || "Thank you for your donation!");
      setForm({ name: "", email: "", amount: "" });
      loadRecent();
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
          <Heart className="h-4 w-4 fill-brand-500 text-brand-500" /> Support the cause
        </span>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-ink">
          Make a Donation
        </h1>
        <p className="mt-3 text-stone-600">
          Your gift helps us put nutritious food on the plates of children who
          need it most.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-5">
        {/* FORM */}
        <form
          onSubmit={submit}
          className="lg:col-span-3 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {presetAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => setForm((f) => ({ ...f, amount: String(amt) }))}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  Number(form.amount) === amt
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium text-stone-700">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Doe"
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />

          <label className="mt-4 block text-sm font-medium text-stone-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />

          <label className="mt-4 block text-sm font-medium text-stone-700">
            Amount (₹)
          </label>
          <div className="relative mt-1">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="1000"
              className="w-full rounded-xl border border-stone-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </>
            ) : (
              <>
                <Heart className="h-4 w-4" /> Donate ₹{form.amount || 0}
              </>
            )}
          </Button>

          {message && (
            <p
              className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                status === "success"
                  ? "bg-green-50 text-green-700"
                  : status === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {status === "success" && <CheckCircle2 className="h-4 w-4" />}
              {message}
            </p>
          )}
        </form>

        {/* RECENT */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-ink">
            Recent Donations
          </h2>
          <ul className="mt-4 space-y-3">
            {recent.length === 0 && (
              <li className="rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-500">
                Be the first to donate!
              </li>
            )}
            {recent.map((d) => (
              <li
                key={d._id || d.id}
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-ink">{d.name}</p>
                  <p className="text-xs text-stone-400">
                    {d.date ? new Date(d.date).toLocaleDateString() : ""}
                  </p>
                </div>
                <span className="font-display font-bold text-brand-600">
                  ₹{d.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
