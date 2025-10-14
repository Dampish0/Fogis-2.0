import React, { useEffect, useMemo, useState } from "react";
import useClubStore from "../../../store/clubstore";
import Navbar from "../../../components/navbar/Navbar";

const PAGE_SIZE = 10;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function TeamEditPage() {
  const {
    clubs,
    loading,
    error,
    fetchClubs,
    createClub,
    updateClub,
    deleteClub,
    clearError,
  } = useClubStore();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", location: "", email: "" });
  const [form, setForm] = useState({
    _id: null,
    name: "",
    trainers: "",
    location: "",
    established: "",
    phoneNumber: "",
    email: "",
    adress: "",
    logoFile: null,
  });

  const listParams = useMemo(() => {
    const p = { page, limit: PAGE_SIZE };
    if (filters.name) p.name = filters.name;
    if (filters.location) p.location = filters.location;
    if (filters.email) p.email = filters.email;
    return p;
  }, [filters, page]);

  useEffect(() => {
    fetchClubs(listParams);
  }, [fetchClubs, listParams]);

  async function handleCreate(e) {
    e.preventDefault();
    const logo = await fileToBase64(form.logoFile);
    const payload = {
      name: form.name.trim(),
      trainers: form.trainers
        ? form.trainers.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      location: form.location || "",
      established: form.established || "",
      phoneNumber: form.phoneNumber || "",
      email: form.email.trim(),
      adress: form.adress || "",
      logo,
    };
    await createClub(payload);
    await fetchClubs(listParams);
    resetForm();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!form._id) return;
    const updates = {
      name: form.name.trim(),
      trainers: form.trainers
        ? form.trainers.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      location: form.location || "",
      established: form.established || "",
      phoneNumber: form.phoneNumber || "",
      email: form.email.trim(),
      adress: form.adress || "",
    };
    if (form.logoFile) {
      updates.logo = await fileToBase64(form.logoFile);
    }
    await updateClub(form._id, updates);
    await fetchClubs(listParams);
    resetForm();
  }

  async function handleDelete(id) {
    if (!window.confirm("Är du säker på att du vill radera klubben?")) return;
    await deleteClub(id);
    await fetchClubs(listParams);
    if (form._id === id) resetForm();
  }

  function resetForm() {
    setForm({
      _id: null,
      name: "",
      trainers: "",
      location: "",
      established: "",
      phoneNumber: "",
      email: "",
      adress: "",
      logoFile: null,
    });
    clearError();
  }

  function selectForEdit(club) {
    setForm({
      _id: club._id,
      name: club.name || "",
      trainers: Array.isArray(club.trainers)
        ? club.trainers
            .map((t) => (typeof t === "string" ? t : t?.name || t?._id || ""))
            .filter(Boolean)
            .join(", ")
        : "",
      location: club.location || "",
      established: club.established || "",
      phoneNumber: club.phoneNumber || "",
      email: club.email || "",
      adress: club.adress || "",
      logoFile: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <div style={{ padding: 16, marginTop: 30 }}>
      <h1 style={{ textAlign: "center", margin: 0, marginBottom: 16 }}>Hantera klubb</h1>


        <div style={{ marginBottom: 12 }}>
          {error && (
            <div style={{ color: "red", marginBottom: 8 }}>
              Fel: {error} <button onClick={clearError}>x</button>
            </div>
          )}
          {loading && <div style={{ marginBottom: 8 }}>Laddar...</div>}
        </div>

        <fieldset style={{ marginBottom: 16 }}>
          <legend>Filter</legend>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              placeholder="Namn"
              value={filters.name}
              onChange={(e) =>
                setFilters((f) => ({ ...f, name: e.target.value }))
              }
            />
            <input
              placeholder="Ort"
              value={filters.location}
              onChange={(e) =>
                setFilters((f) => ({ ...f, location: e.target.value }))
              }
            />
            <input
              placeholder="Email"
              value={filters.email}
              onChange={(e) =>
                setFilters((f) => ({ ...f, email: e.target.value }))
              }
            />
            <button onClick={() => setPage(1)}>Sök</button>
            <button
              onClick={() => {
                setFilters({ name: "", location: "", email: "" });
                setPage(1);
              }}
            >
              Nollställ
            </button>
          </div>
        </fieldset>

        <form
          onSubmit={form._id ? handleUpdate : handleCreate}
          style={{ marginBottom: 24 }}
        >
          <fieldset
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
            }}
          >
            <legend>{form._id ? "Uppdatera klubb" : "Skapa ny klubb"}</legend>

            <label>
              Namn*
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
              />
            </label>

            <label>
              Tränare (komma-separerade id/namn)
              <input
                value={form.trainers}
                onChange={(e) =>
                  setForm((s) => ({ ...s, trainers: e.target.value }))
                }
              />
            </label>

            <label>
              Ort
              <input
                value={form.location}
                onChange={(e) =>
                  setForm((s) => ({ ...s, location: e.target.value }))
                }
              />
            </label>

            <label>
              Grundad (år/datum)
              <input
                value={form.established}
                onChange={(e) =>
                  setForm((s) => ({ ...s, established: e.target.value }))
                }
              />
            </label>

            <label>
              Telefon
              <input
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm((s) => ({ ...s, phoneNumber: e.target.value }))
                }
              />
            </label>

            <label>
              Email*
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
              />
            </label>

            <label>
              Adress
              <input
                value={form.adress}
                onChange={(e) =>
                  setForm((s) => ({ ...s, adress: e.target.value }))
                }
              />
            </label>

            <label>
              Logotyp (PNG/JPG)
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    logoFile: e.target.files?.[0] || null,
                  }))
                }
              />
            </label>
          </fieldset>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="submit" disabled={loading}>
              {form._id ? "Spara ändringar" : "Skapa klubb"}
            </button>
            {form._id && (
              <button type="button" onClick={resetForm}>
                Avbryt
              </button>
            )}
          </div>
        </form>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>ID</th>
              <th>Namn</th>
              <th>Ort</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Grundad</th>
              <th>Adress</th>
              <th>Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((c) => (
              <tr key={c._id} style={{ borderTop: "1px solid #eee" }}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>{c.location || "-"}</td>
                <td>{c.email || "-"}</td>
                <td>{c.phoneNumber || "-"}</td>
                <td>{c.established || "-"}</td>
                <td>{c.adress || "-"}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => selectForEdit(c)}>Redigera</button>
                  <button onClick={() => handleDelete(c._id)}>Ta bort</button>
                </td>
              </tr>
            ))}
            {clubs.length === 0 && !loading && (
              <tr>
                <td colSpan={8} style={{ padding: 12 }}>
                  Inga klubbar hittades.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Föregående
          </button>
          <span>Sida {page}</span>
          <button onClick={() => setPage((p) => p + 1)}>Nästa</button>
        </div>
      </div>
    </div>
  );
}
