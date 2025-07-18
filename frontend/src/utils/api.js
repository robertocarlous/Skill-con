import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { useUserStore } from "../store/userStore";

// Use Vite environment variable for API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Helper to handle JSON responses and errors
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Something went wrong");
  }
  return data;
}

// Signup with Firebase and backend
export async function signupUser({
  fullName,
  email,
  password,
  confirmPassword,
}) {
  if (password !== confirmPassword) throw new Error("Passwords do not match");
  // 1. Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: fullName });
  // 2. Get ID token
  const idToken = await userCredential.user.getIdToken();
  // 3. Send to backend (fullName, email, idToken)
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ fullName, email, idToken }),
  });
  return handleResponse(res);
}

// Login with Firebase and get profile from backend
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await userCredential.user.getIdToken();

  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  const userData = await handleResponse(res);
  useUserStore.getState().setUser(userData);
  return userData;
}

// Verify OTP (unchanged)
export async function verifyOtp(email, otp) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "OTP verification failed");
  return data;
}

// 3. Verify NIN
// export async function verifyNIN({ userId, nin }) {
//   const res = await fetch(`${API_BASE_URL}/auth/verify-nin`, {
//     method: "POST",
//     headers: defaultHeaders,
//     body: JSON.stringify({ userId, nin }),
//   });
//   return handleResponse(res);
// }

// 4. Update Role (artisan or client)
export async function updateUserRole({ userId, role }) {
  const res = await fetch(`${API_BASE_URL}/users/role`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ userId, role }),
  });
  return handleResponse(res);
}

// 5. Create Artisan Profile
export async function createArtisanProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/artisans/profile`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// 6. Upload Certifications
export async function uploadCertifications(userId, files) {
  const formData = new FormData();
  formData.append("userId", userId);
  files.forEach((file) => formData.append("certificates[]", file));

  const res = await fetch(`${API_BASE_URL}/artisans/certifications`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
}

// 7. Create Client Profile
export async function createClientProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/clients/profile`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// 8. Get Job Feeds
export async function getJobFeeds() {
  const token = auth.currentUser && (await auth.currentUser.getIdToken());
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

export async function getProfile(idToken) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return handleResponse(res);
}

// Update client profile (with image upload)
export async function updateClientProfile({
  profileImage,
  bio,
  location,
  idToken,
}) {
  let imageUrl = null;
  if (profileImage) {
    const formData = new FormData();
    formData.append("image", profileImage);
    const res = await fetch(`${API_BASE_URL}/profile/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    imageUrl =
      data.image || data.profileImage || data.url || data.user?.profileImage;
  }
  // Update profile fields
  const res2 = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      bio,
      location,
      ...(imageUrl ? { profileImage: imageUrl } : {}),
    }),
  });
  const data2 = await res2.json();
  if (!res2.ok) throw new Error(data2.error || "Profile update failed");
  return data2;
}

// Update artisan profile (with image and certifications upload)
export async function updateArtisanProfile({
  profileImage,
  bio,
  location,
  skill,
  yearsOfExperience,
  certifications,
  idToken,
}) {
  let imageUrl = null;
  if (profileImage) {
    const formData = new FormData();
    formData.append("image", profileImage);
    const res = await fetch(`${API_BASE_URL}/profile/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    imageUrl =
      data.image || data.profileImage || data.url || data.user?.profileImage;
  }
  // Upload certifications if provided
  if (certifications && certifications.length > 0) {
    const certForm = new FormData();
    certifications
      .slice(0, 3)
      .forEach((file) => certForm.append("certification", file));
    const resCert = await fetch(
      `${API_BASE_URL}/profile/upload-certification`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: certForm,
      }
    );
    const dataCert = await resCert.json();
    if (!resCert.ok)
      throw new Error(dataCert.error || "Certification upload failed");
  }
  // Update profile fields
  const res2 = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      bio,
      location,
      skill,
      yearsOfExperience,
      ...(imageUrl ? { profileImage: imageUrl } : {}),
    }),
  });
  const data2 = await res2.json();
  if (!res2.ok) throw new Error(data2.error || "Profile update failed");
  return data2;
}

export async function logoutUser() {
  // Call backend logout endpoint (optional, for audit/logging)
  await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
  // Sign out from Firebase
  await signOut(auth);
  // Clear Zustand user store
  useUserStore.getState().clearUser();
}

export async function resendOtp(email) {
  const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to resend OTP");
  }
  return res.json();
}
