/**
 * CandidateDirectory.jsx
 * ----------------------
 * Week 1 — Read-only candidate directory.
 * Fetches from GET /api/candidates and renders each candidate as a
 * thermal-printed security badge card.
 *
 * TODO (future weeks):
 *   - Add/Edit/Delete UI (Week 2 scope)
 *   - Pagination or infinite scroll
 *   - Sort controls (by rating, name, status)
 *   - Candidate detail modal/page
 */

import { useState, useEffect, useCallback } from "react";
import RatingDots from "../components/RatingDots";
import "./CandidateDirectory.css";

// Keep in sync with field enum in backend/models/Candidate.js
const FIELD_OPTIONS = [
  "Web Development",
  "Security Ops",
  "Data & Analytics",
  "Design",
  "Product",
  "Software Engineering",
  "DevOps",
];

// Keep in sync with taskStatus enum in backend/models/Candidate.js
const STATUS_COLORS = {
  "Not Started": "status--not-started",
  "In Progress": "status--in-progress",
  Blocked:       "status--blocked",
  Complete:      "status--complete",
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CandidateDirectory() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [filterGroup, setFilterGroup] = useState("");
  const [filterField, setFilterField] = useState("");

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterGroup) params.set("group", filterGroup);
      if (filterField) params.set("field", filterField);
      const res = await fetch(`${API_BASE}/api/candidates?${params.toString()}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const json = await res.json();
      setCandidates(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filterGroup, filterField]);

  useEffect(() => { fetchCandidates(); }, [fetchCandidates]);

  return (
    <div className="directory">
      <header className="directory__header">
        <div className="directory__header-stripe" />
        <div className="directory__header-body">
          <span className="directory__badge-label">SAFEX SECURITY CLEARANCE</span>
          <h1 className="directory__title">INTERN CANDIDATE REGISTRY</h1>
          <span className="directory__subtitle">
            CLASSIFICATION: INTERNAL USE ONLY &nbsp;·&nbsp; WEEK 01
          </span>
        </div>
      </header>

      <section className="directory__filters" aria-label="Filter candidates">
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-group">GROUP</label>
          <select id="filter-group" className="filter-select" value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}>
            <option value="">ALL GROUPS</option>
            {["Group 1","Group 2","Group 3","Group 4"].map((g) => (
              <option key={g} value={g}>{g.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-field">FIELD</label>
          <select id="filter-field" className="filter-select" value={filterField}
            onChange={(e) => setFilterField(e.target.value)}>
            <option value="">ALL FIELDS</option>
            {FIELD_OPTIONS.map((f) => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>
        {(filterGroup || filterField) && (
          <button className="filter-reset"
            onClick={() => { setFilterGroup(""); setFilterField(""); }}>
            CLEAR FILTERS
          </button>
        )}
      </section>

      {loading && (
        <div className="directory__state" role="status" aria-live="polite">
          <span className="state-dot state-dot--blink" />
          RETRIEVING RECORDS…
        </div>
      )}
      {!loading && error && (
        <div className="directory__state directory__state--error" role="alert">
          <span className="state-dot state-dot--error" />
          RETRIEVAL FAILED: {error}
          <button className="filter-reset" onClick={fetchCandidates} style={{ marginLeft: "1rem" }}>
            RETRY
          </button>
        </div>
      )}
      {!loading && !error && candidates.length === 0 && (
        <div className="directory__state" role="status">
          <span className="state-dot" />
          NO RECORDS MATCH CURRENT FILTER PARAMETERS.
        </div>
      )}

      {!loading && !error && candidates.length > 0 && (
        <main className="directory__grid" aria-label="Candidate badges">
          {candidates.map((c) => (
            <article key={c._id} className="badge" aria-label={`Candidate: ${c.name}`}>
              <div className={`badge__stripe badge__stripe--${slugify(c.field)}`} />
              <div className="badge__body">
                <div className="badge__photo" aria-hidden="true">
                  <span className="badge__photo-initials">{initials(c.name)}</span>
                </div>
                <div className="badge__info">
                  <p className="badge__field-label">{c.field.toUpperCase()}</p>
                  <h2 className="badge__name">{c.name.toUpperCase()}</h2>
                  <p className="badge__role">{c.role}</p>
                  <dl className="badge__meta">
                    <div className="badge__meta-row">
                      <dt>GROUP</dt><dd>{c.group.toUpperCase()}</dd>
                    </div>
                    <div className="badge__meta-row">
                      <dt>RATING</dt><dd><RatingDots value={c.rating} /></dd>
                    </div>
                    <div className="badge__meta-row">
                      <dt>STATUS</dt>
                      <dd>
                        <span className={`status-pill ${STATUS_COLORS[c.taskStatus] || ""}`}>
                          {c.taskStatus.toUpperCase()}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="badge__barcode" aria-hidden="true">
                <span className="badge__barcode-value">{c._id}</span>
              </div>
            </article>
          ))}
        </main>
      )}

      <footer className="directory__footer">
        SAFEX PORTAL v1.0 &nbsp;·&nbsp; AUTHORISED PERSONNEL ONLY
      </footer>
    </div>
  );
}

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-");
}
