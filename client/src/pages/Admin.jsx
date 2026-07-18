import { useState, useEffect } from "react";
import {
  LogIn,
  LogOut,
  Trash2,
  Loader2,
  ShieldAlert,
  Download,
  Search,
} from "lucide-react";
import Button from "../components/Button.jsx";
import { api } from "../lib/api.js";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function Admin() {
  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [analytics, setAnalytics] = useState(null);

  const loadDonations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10, search });
      const data = await api(`/admin/donations?${params}`, {
        headers: authHeader(),
      });
      setDonations(data.donations);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await api("/admin/analytics", { headers: authHeader() });
      setAnalytics(data);
    } catch {
      /* analytics is non-critical */
    }
  };

  useEffect(() => {
    if (token) {
      loadDonations();
      loadAnalytics();
    }
  }, [token, page, search]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api("/admin/login", {
        method: "POST",
        body: JSON.stringify(creds),
      });
      localStorage.setItem("adminToken", res.token);
      setToken(res.token);
      setCreds({ username: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setDonations([]);
  };

  const remove = async (id) => {
    if (!confirm("Delete this donation record?")) return;
    try {
      await api(`/admin/donations/${id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      loadDonations();
    } catch (err) {
      setError(err.message);
    }
  };

  const exportCsv = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/admin/donations/export`,
        { headers: authHeader() }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "donations.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Export failed");
    }
  };

  if (!token) {
    return (
      <div className="container-px flex min-h-[70vh] items-center justify-center py-16">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
        >
          <h1 className="font-display text-2xl font-bold text-ink">Admin Login</h1>
          <p className="mt-1 text-sm text-stone-500">
            Access donation records.
          </p>
          <label className="mt-6 block text-sm font-medium text-stone-700">
            Username
          </label>
          <input
            value={creds.username}
            onChange={(e) => setCreds((c) => ({ ...c, username: e.target.value }))}
            required
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <label className="mt-4 block text-sm font-medium text-stone-700">
            Password
          </label>
          <input
            type="password"
            value={creds.password}
            onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))}
            required
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <Button type="submit" className="mt-6 w-full">
            <LogIn className="h-4 w-4" /> Login
          </Button>
          {error && (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <ShieldAlert className="h-4 w-4" /> {error}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="container-px py-16">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            Donation Records
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {donations.length} shown · {analytics?.totalCount || 0} total
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      {error && (
        <p className="mx-auto mt-6 max-w-5xl rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {analytics && (
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">Total Raised</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand-600">
              ₹{analytics.totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">Total Donations</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {analytics.totalCount}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">Top Donor</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {analytics.topDonors[0]?.name || "—"}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:min-w-[16rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email"
            className="w-full rounded-xl border border-stone-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <Button variant="outline" onClick={exportCsv}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="mx-auto mt-4 max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-stone-400">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </td>
              </tr>
            )}
            {!loading && donations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-stone-400">
                  No donations found.
                </td>
              </tr>
            )}
            {!loading &&
              donations.map((d) => (
                <tr key={d._id || d.id} className="hover:bg-stone-50">
                  <td className="px-5 py-4 font-medium text-ink">{d.name}</td>
                  <td className="px-5 py-4 text-stone-600">{d.email}</td>
                  <td className="px-5 py-4 font-semibold text-brand-600">
                    ₹{d.amount}
                  </td>
                  <td className="px-5 py-4 text-stone-500">
                    {d.date ? new Date(d.date).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => remove(d._id || d.id)}
                      aria-label="Delete donation"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-4 flex max-w-5xl items-center justify-between text-sm">
        <span className="text-stone-500">
          Page {page} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="px-4 py-2"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
