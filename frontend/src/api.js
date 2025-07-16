import { saveAuth } from './utils.js';
import { getToken } from './utils.js';
import { clearAuth } from './utils.js';

const API_BASE_URL = ''; 

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper to handle JSON responses and errors
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

// 1. Register User
export async function registerUser(data) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function loginUser({email, password}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email,password}),
  });

  const result = await handleResponse(res);

  saveAuth(result.token, result.user);

  return result;
}


// 3. Verify NIN
export async function verifyNIN({ userId, nin }) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-nin`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ userId, nin }),
  });
  return handleResponse(res);
}

// 4. Update Role (artisan or client)
export async function updateUserRole({ userId, role }) {
  const res = await fetch(`${API_BASE_URL}/users/role`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ userId, role }),
  });
  return handleResponse(res);
}

// 5. Create Artisan Profile
export async function createArtisanProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/artisans/profile`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// 6. Upload Certifications
export async function uploadCertifications(userId, files) {
  const formData = new FormData();
  formData.append('userId', userId);
  files.forEach((file) => formData.append('certificates[]', file));

  const res = await fetch(`${API_BASE_URL}/artisans/certifications`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
}

// 7. Create Client Profile
export async function createClientProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/clients/profile`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// 8. Get Job Feeds
export async function getJobFeeds() {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

const handleLogout = () => {
  clearAuth();
  window.location.href = '/'; // or navigate using React Router
};