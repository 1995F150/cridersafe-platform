"use client";

import { useEffect, useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low";
type IncidentStatus = "New" | "Reviewing" | "Acknowledged";

type Incident = {
  id: string;
  title: string;
  location: string;
  time: string;
  severity: Severity;
  status: IncidentStatus;
  source: string;
  confidence: number;
  description: string;
  signals: string[];
};

const incidents: Incident[] = [
  {
    id: "INC-0247",
    title: "Probable vaping event",
    location: "Restroom B · 2nd floor",
    time: "2:14 PM",
    severity: "High",
    status: "New",
    source: "CriderSafe Air A-204",
    confidence: 94,
    description:
      "Sensor fusion detected a rapid particulate rise, elevated VOC response, and a short acoustic event consistent with aerosol use. No restroom camera is used.",
    signals: ["PM2.5 spike", "VOC anomaly", "Acoustic event", "Occupancy: 3"],
  },
  {
    id: "INC-0246",
    title: "Possible physical altercation",
    location: "West hallway · Camera C-18",
    time: "2:06 PM",
    severity: "Critical",
    status: "Reviewing",
    source: "CriderSafe Vision C-18",
    confidence: 87,
    description:
      "Vision analysis detected rapid strike-like motion, a fall event, and crowd convergence. Human review is required before any action is taken.",
    signals: ["Strike-like motion", "Fall detected", "Crowd convergence"],
  },
  {
    id: "INC-0245",
    title: "Sensor tamper detected",
    location: "Restroom A · 1st floor",
    time: "1:48 PM",
    severity: "Medium",
    status: "Acknowledged",
    source: "CriderSafe Air A-109",
    confidence: 99,
    description:
      "The enclosure accelerometer reported repeated movement followed by an unexpected orientation change.",
    signals: ["Enclosure movement", "Orientation changed"],
  },
  {
    id: "INC-0244",
    title: "Unusual running pattern",
    location: "East hallway · Camera C-07",
    time: "1:31 PM",
    severity: "Low",
    status: "Acknowledged",
    source: "CriderSafe Vision C-07",
    confidence: 71,
    description:
      "Multiple people accelerated through the corridor at the same time. No additional threat indicators were detected.",
    signals: ["Rapid movement", "4 people", "No fall event"],
  },
];

const zones = [
  { name: "Main entrance", devices: 6, state: "normal" },
  { name: "West hallway", devices: 10, state: "alert" },
  { name: "Restroom A", devices: 2, state: "warning" },
  { name: "Restroom B", devices: 2, state: "alert" },
  { name: "Cafeteria", devices: 8, state: "normal" },
  { name: "East hallway", devices: 9, state: "normal" },
];

function statusClass(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedId, setSelectedId] = useState(incidents[0].id);
  const [acknowledged, setAcknowledged] = useState<string[]>(["INC-0245", "INC-0244"]);
  const [heartbeat, setHeartbeat] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => {
      setNow(new Date());
      setHeartbeat((value) => (value + 1) % 4);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const selected = useMemo(
    () => incidents.find((incident) => incident.id === selectedId) ?? incidents[0],
    [selectedId],
  );

  const selectedAcknowledged = acknowledged.includes(selected.id);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            CS
          </div>
          <div>
            <div className="brand-name">CriderSafe</div>
            <div className="brand-subtitle">Command</div>
          </div>
        </div>

        <div className="site-switcher">
          <span className="site-dot" />
          <div>
            <strong>Demo Campus</strong>
            <span>Bland County prototype</span>
          </div>
          <span className="chevron">⌄</span>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          <button className="nav-item active"><span>⌂</span>Overview</button>
          <button className="nav-item"><span>◉</span>Incidents <b>2</b></button>
          <button className="nav-item"><span>▦</span>Live map</button>
          <button className="nav-item"><span>◫</span>Vision</button>
          <button className="nav-item"><span>≋</span>Air sensors</button>
          <button className="nav-item"><span>◆</span>Devices</button>
          <button className="nav-item"><span>⌁</span>Analytics</button>
        </nav>

        <div className="nav-divider" />
        <nav className="nav-list" aria-label="Administration navigation">
          <button className="nav-item"><span>♙</span>Users & roles</button>
          <button className="nav-item"><span>☷</span>Audit log</button>
          <button className="nav-item"><span>⚙</span>Settings</button>
        </nav>

        <div className="sidebar-footer">
          <div className="system-pill"><span className="pulse-dot" />Local Core healthy</div>
          <span>CriderSafe Platform · Prototype v0.1</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">SCHOOL SAFETY OPERATIONS</p>
            <h1>Command overview</h1>
          </div>
          <div className="topbar-actions">
            <div className="live-status"><span className="pulse-dot" />Live · {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" }) : "connecting"}</div>
            <button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button>
            <div className="avatar">AD</div>
          </div>
        </header>

        <section className="prototype-banner">
          <div>
            <strong>Prototype environment</strong>
            <span>All people, incidents, device counts, and sensor readings shown here are simulated for demonstration.</span>
          </div>
          <span className="prototype-tag">SIMULATED DATA</span>
        </section>

        <section className="metric-grid" aria-label="System summary">
          <article className="metric-card">
            <div className="metric-top"><span>Vision cameras</span><span className="metric-icon">◫</span></div>
            <div className="metric-value">42 <small>/ 42</small></div>
            <div className="metric-foot good"><span>●</span>All cameras online</div>
          </article>
          <article className="metric-card">
            <div className="metric-top"><span>Air sensors</span><span className="metric-icon">≋</span></div>
            <div className="metric-value">15 <small>/ 16</small></div>
            <div className="metric-foot warn"><span>●</span>1 sensor needs attention</div>
          </article>
          <article className="metric-card accent-card">
            <div className="metric-top"><span>Active incidents</span><span className="metric-icon">!</span></div>
            <div className="metric-value">2</div>
            <div className="metric-foot danger"><span>●</span>1 critical · 1 high</div>
          </article>
          <article className="metric-card">
            <div className="metric-top"><span>AI service health</span><span className="metric-icon">◇</span></div>
            <div className="metric-value">99.98<small>%</small></div>
            <div className="metric-foot good"><span>●</span>Inference services healthy</div>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel campus-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">LIVE DEVICE VIEW</p>
                <h2>Campus zones</h2>
              </div>
              <div className="sync-label"><span className="sync-bars">{"•".repeat(heartbeat + 1)}</span> synced now</div>
            </div>
            <div className="campus-map">
              <div className="map-label north">N</div>
              {zones.map((zone, index) => (
                <button className={`zone zone-${index + 1} ${zone.state}`} key={zone.name}>
                  <span className="zone-status" />
                  <strong>{zone.name}</strong>
                  <small>{zone.devices} devices</small>
                </button>
              ))}
              <div className="map-corridor corridor-one" />
              <div className="map-corridor corridor-two" />
              <div className="map-corridor corridor-three" />
            </div>
            <div className="map-legend">
              <span><i className="legend-dot normal" />Normal</span>
              <span><i className="legend-dot warning" />Attention</span>
              <span><i className="legend-dot alert" />Active incident</span>
            </div>
          </div>

          <div className="panel incident-detail">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">INCIDENT DETAIL</p>
                <h2>{selected.id}</h2>
              </div>
              <span className={`severity-badge ${statusClass(selected.severity)}`}>{selected.severity}</span>
            </div>

            <div className="incident-hero">
              <div className="incident-symbol">{selected.source.includes("Air") ? "≋" : "◫"}</div>
              <div>
                <h3>{selected.title}</h3>
                <p>{selected.location} · {selected.time}</p>
              </div>
            </div>

            <div className="confidence-block">
              <div className="confidence-row"><span>AI confidence</span><strong>{selected.confidence}%</strong></div>
              <div className="confidence-track"><div className="confidence-fill" style={{ width: `${selected.confidence}%` }} /></div>
            </div>

            <p className="incident-description">{selected.description}</p>
            <div className="signal-list">
              {selected.signals.map((signal) => <span key={signal}>{signal}</span>)}
            </div>

            <div className="source-box">
              <span>Source device</span>
              <strong>{selected.source}</strong>
              <small>Edge inference · local processing</small>
            </div>

            <div className="review-notice">
              <strong>Human review required</strong>
              <span>CriderSafe produces safety alerts, not disciplinary decisions.</span>
            </div>

            <div className="detail-actions">
              <button
                className="primary-button"
                disabled={selectedAcknowledged}
                onClick={() => setAcknowledged((items) => items.includes(selected.id) ? items : [...items, selected.id])}
              >
                {selectedAcknowledged ? "Acknowledged" : "Acknowledge incident"}
              </button>
              <button className="secondary-button">Open incident</button>
            </div>
          </div>
        </section>

        <section className="panel incident-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">REAL-TIME EVENT QUEUE</p>
              <h2>Recent incidents</h2>
            </div>
            <button className="text-button">View all incidents →</button>
          </div>

          <div className="incident-table-wrap">
            <table className="incident-table">
              <thead>
                <tr><th>Incident</th><th>Location</th><th>Source</th><th>Confidence</th><th>Status</th><th>Time</th></tr>
              </thead>
              <tbody>
                {incidents.map((incident) => {
                  const isAcknowledged = acknowledged.includes(incident.id);
                  const displayStatus = isAcknowledged ? "Acknowledged" : incident.status;
                  return (
                    <tr
                      key={incident.id}
                      className={selectedId === incident.id ? "selected-row" : ""}
                      onClick={() => setSelectedId(incident.id)}
                    >
                      <td><div className="incident-name"><span className={`severity-dot ${statusClass(incident.severity)}`} /><div><strong>{incident.title}</strong><small>{incident.id}</small></div></div></td>
                      <td>{incident.location}</td>
                      <td>{incident.source.includes("Air") ? "Air sensor" : "Vision"}</td>
                      <td><strong>{incident.confidence}%</strong></td>
                      <td><span className={`status-chip ${statusClass(displayStatus)}`}>{displayStatus}</span></td>
                      <td>{incident.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bottom-grid">
          <article className="panel privacy-panel">
            <div className="privacy-icon">⌾</div>
            <div>
              <p className="panel-kicker">PRIVACY BY DESIGN</p>
              <h3>Local-first processing</h3>
              <p>Prototype architecture keeps camera inference on the school network. Restroom Air devices use environmental event detection without cameras.</p>
            </div>
          </article>
          <article className="panel core-panel">
            <div className="panel-heading compact">
              <div><p className="panel-kicker">CRIDERSAFE CORE</p><h3>Service status</h3></div>
              <span className="health-badge">Healthy</span>
            </div>
            <div className="service-row"><span>Vision inference</span><strong>12 ms</strong></div>
            <div className="service-row"><span>Sensor fusion</span><strong>8 ms</strong></div>
            <div className="service-row"><span>Event bus</span><strong>Online</strong></div>
          </article>
        </section>
      </main>
    </div>
  );
}
