const API_URL = 'http://localhost:5000/api'

function getToken() {
  const session = localStorage.getItem('dassetpro_session')

  if (!session) {
    throw new Error('You are not logged in')
  }

  const sessionData = JSON.parse(session)

  if (!sessionData.token) {
    throw new Error('Authentication token not found')
  }

  return sessionData.token
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

export async function getProcurementRequests() {
  const response = await fetch(`${API_URL}/procurement`, {
    method: 'GET',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch procurement requests')
  }

  return result.data
}
export async function getProcurementRequest(id: string) {
  const response = await fetch(`${API_URL}/procurement/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to fetch procurement request'
    )
  }

  return result.data
}

export async function createProcurementRequest(data: {
  title: string
  category: string
  department: string
  requestedBy: string
  amount: number
  priority?: string
  description?: string
  vendor?: string
  deliveryDate?: string
  justification?: string
}) {
  const response = await fetch(`${API_URL}/procurement`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create procurement request')
  }

  return result.data
}

export async function submitProcurementRequest(id: string) {
  const response = await fetch(`${API_URL}/procurement/${id}/submit`, {
    method: 'PATCH',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit request')
  }

  return result.data
}

export async function approveProcurementRequest(id: string) {
  const response = await fetch(`${API_URL}/procurement/${id}/approve`, {
    method: 'PATCH',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to approve request')
  }

  return result.data
}

export async function completeProcurementRequest(id: string) {
  const response = await fetch(`${API_URL}/procurement/${id}/complete`, {
    method: 'PATCH',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to complete request')
  }

  return result.data
}

export async function deleteProcurementRequest(id: string) {
  const response = await fetch(`${API_URL}/procurement/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete request')
  }

  return result
}

export async function updateProcurementRequest(
  id: string,
  data: {
    title: string;
    category: string;
    department: string;
    requestedBy: string;
    amount: number;
    priority: string;
  }
) {
  const response = await fetch(`${API_URL}/procurement/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update procurement request"
    );
  }

  return result.data;
}
