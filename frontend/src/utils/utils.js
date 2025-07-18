const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

//save token
export function saveAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Get user info
export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Remove token & user on logout
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
