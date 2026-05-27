const API_BASE_URL = 'https://vishvakumarj-alarm-dashboard-system-shm7-code-redirect-2.apps.rm2.thpm.p1.openshiftapps.com';

export async function fetchAlarmSummary() {
  const response = await fetch(`${API_BASE_URL}/api/alarms/summary`);

  if (!response.ok) {
    throw new Error('Failed to fetch alarm summary');
  }

  return response.json();
}

export async function fetchAlarms() {
  const response = await fetch(`${API_BASE_URL}/api/alarms`);

  if (!response.ok) {
    throw new Error('Failed to fetch alarms');
  }

  return response.json();
}
