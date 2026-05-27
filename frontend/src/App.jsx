import { useEffect, useState } from 'react'
import './App.css'
import { fetchAlarms, fetchAlarmSummary } from './services/alarmApi'

const services = [
  {
    id: 1,
    name: 'SNMP Trap Receiver',
    type: 'Collector',
    health: 'OK',
    status: 'Running',
    lastUpdated: '2026-05-27 11:20:00',
  },
  {
    id: 2,
    name: 'Alarm Read API',
    type: 'Spring Boot',
    health: 'OK',
    status: 'Running',
    lastUpdated: '2026-05-27 11:25:00',
  },
  {
    id: 3,
    name: 'PostgreSQL Database',
    type: 'Database',
    health: 'WARNING',
    status: 'Running',
    lastUpdated: '2026-05-27 11:28:00',
  },
]

function App() {
  const [activePage, setActivePage] = useState('Home')
  const [alerts, setAlerts] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const menuItems = [
    'Home',
    'Alerts',
    'Services',
    'Devices',
    'Configurations',
    'Monitoring',
  ]

  async function loadDashboardData() {
    try {
      setLoading(true)
      setError('')

      const summaryData = await fetchAlarmSummary()
      const alarmData = await fetchAlarms()

      setSummary(summaryData)
      setAlerts(alarmData)
    } catch (err) {
      console.error(err)
      setError('Unable to load alarm dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <h1>AlarmNMS</h1>
            <span>Network Monitoring</span>
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? 'menu-item active' : 'menu-item'}
              onClick={() => setActivePage(item)}
            >
              <span className="menu-icon">{getMenuIcon(item)}</span>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <TopBar activePage={activePage} />

        {loading && <LoadingPage />}
        {error && !loading && <ErrorPage message={error} onRetry={loadDashboardData} />}

        {!loading && !error && activePage === 'Home' && (
          <HomePage summary={summary} onRefresh={loadDashboardData} />
        )}

        {!loading && !error && activePage === 'Alerts' && (
          <AlertsPage alerts={alerts} onRefresh={loadDashboardData} />
        )}

        {!loading && !error && activePage === 'Services' && <ServicesPage />}

        {!loading && !error && activePage === 'Devices' && (
          <PlaceholderPage title="Devices" />
        )}

        {!loading && !error && activePage === 'Configurations' && (
          <PlaceholderPage title="Configurations" />
        )}

        {!loading && !error && activePage === 'Monitoring' && (
          <PlaceholderPage title="Monitoring" />
        )}
      </main>
    </div>
  )
}

function TopBar({ activePage }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Home</span>
        <span className="separator">›</span>
        <strong>{activePage}</strong>
      </div>

      <div className="top-actions">
        <button className="admin-btn">Admin</button>
        <button className="notification-btn">
          🔔
          <span>3</span>
        </button>
      </div>
    </header>
  )
}

function HomePage({ summary, onRefresh }) {
  return (
    <section className="page">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <div className="action-buttons">
          <button onClick={onRefresh}>Refresh</button>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard title="Total Alerts" value={summary.total} color="blue" />
        <SummaryCard title="Critical Alerts" value={summary.critical} color="red" />
        <SummaryCard title="Major Alerts" value={summary.major} color="orange" />
        <SummaryCard title="Minor Alerts" value={summary.minor} color="yellow" />
        <SummaryCard title="Cleared Alerts" value={summary.cleared} color="green" />
      </div>

      <div className="content-card">
        <h3>System Flow</h3>
        <p>
          SNMP Trap / Query System → Database → Spring Boot Read API → React Dashboard
        </p>
      </div>
    </section>
  )
}

function AlertsPage({ alerts, onRefresh }) {
  return (
    <section className="page">
      <FilterPanel />

      <div className="section-header">
        <h2>Alerts</h2>
        <div className="action-buttons">
          <button onClick={onRefresh}>Refresh</button>
          <button>Import</button>
          <button>Export</button>
          <button className="primary">+ Add Alert</button>
        </div>
      </div>

      <SearchBar />

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Alert Name</th>
              <th>Device</th>
              <th>Service</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Source IP</th>
              <th>Created Time</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{alert.id}</td>
                <td className="link-text">{alert.alarmName}</td>
                <td>{alert.deviceName}</td>
                <td>Network</td>
                <td>
                  <span className={`badge ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
                  </span>
                </td>
                <td>
                  <span className={`status ${alert.status.toLowerCase()}`}>
                    {alert.status}
                  </span>
                </td>
                <td>{alert.sourceIp}</td>
                <td>{alert.createdTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ServicesPage() {
  return (
    <section className="page">
      <FilterPanel />

      <div className="section-header">
        <h2>Services</h2>
        <div className="action-buttons">
          <button>Export</button>
          <button className="primary">+ Add Service</button>
        </div>
      </div>

      <SearchBar />

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Service Name</th>
              <th>Type</th>
              <th>Health</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{service.id}</td>
                <td className="link-text">{service.name}</td>
                <td>{service.type}</td>
                <td>
                  <span className={`badge ${service.health.toLowerCase()}`}>
                    {service.health}
                  </span>
                </td>
                <td>{service.status}</td>
                <td>{service.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function FilterPanel() {
  return (
    <div className="filter-panel">
      <div className="filter-title">Filter</div>

      <div className="filters">
        <label>
          By health status
          <select>
            <option>All</option>
            <option>OK</option>
            <option>Warning</option>
            <option>Critical</option>
          </select>
        </label>

        <label>
          By configuration status
          <select>
            <option>All</option>
            <option>Applied</option>
            <option>Modified</option>
          </select>
        </label>

        <label>
          By backend
          <select>
            <option>All</option>
            <option>OpenShift</option>
            <option>Spring Boot</option>
            <option>PostgreSQL</option>
          </select>
        </label>

        <button className="apply-btn">Apply Filters</button>
      </div>
    </div>
  )
}

function SearchBar() {
  return (
    <div className="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  )
}

function SummaryCard({ title, value, color }) {
  return (
    <div className={`summary-card ${color}`}>
      <span>{title}</span>
      <h3>{value}</h3>
    </div>
  )
}

function PlaceholderPage({ title }) {
  return (
    <section className="page">
      <h2>{title}</h2>
      <div className="content-card">
        <p>{title} page will be implemented later.</p>
      </div>
    </section>
  )
}

function LoadingPage() {
  return (
    <section className="page">
      <div className="content-card">
        <h2>Loading alarm dashboard...</h2>
      </div>
    </section>
  )
}

function ErrorPage({ message, onRetry }) {
  return (
    <section className="page">
      <div className="content-card">
        <h2>{message}</h2>
        <button onClick={onRetry}>Retry</button>
      </div>
    </section>
  )
}

function getMenuIcon(item) {
  const icons = {
    Home: '▦',
    Alerts: '⚠',
    Services: '⚙',
    Devices: '▣',
    Configurations: '▤',
    Monitoring: '📈',
  }

  return icons[item] || '•'
}

export default App  