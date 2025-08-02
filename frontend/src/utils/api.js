import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

// Use Vite environment variable for API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

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
  // Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: fullName });

  console.debug("Sending verification email to:", userCredential.user.email);
  await sendEmailVerification(userCredential.user, {
    url: window.location.origin + "/verify-email-complete",
    handleCodeInApp: true,
  });

  const idToken = await userCredential.user.getIdToken();
  // Send to backend (fullName, email, idToken)
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ fullName, email, idToken }),
  });
  // Set user in Zustand store
  useUserStore.getState().setUser({
    email,
    fullName,
    firebaseUid: userCredential.user.uid,
    emailVerified: false,
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

  const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  await handleResponse(loginRes);

  const profileRes = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
  });

  const profileData = await handleResponse(profileRes);
  // Set user in Zustand store
  useUserStore.getState().setUser({
    ...profileData,
    firebaseUid: userCredential.user.uid,
  });

  useAuthStore.getState().setAuthenticated(true);
  return profileData;
}

// Logout user and clear store
export async function logoutUser() {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  await signOut(auth);
  useUserStore.getState().clearUser();
}

// Get user profile
export async function getProfile() {
  const res = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
}

// Update User Role (artisan or client)
export async function updateUserRole(role) {
  const res = await fetch(`${API_BASE_URL}/api/auth/set-role`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify({ role }),
  });
  return handleResponse(res);
}

// Create Artisan Profile
export async function createArtisanProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/api/artisans/profile`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// Upload Certifications
export async function uploadCertifications(userId, files) {
  const formData = new FormData();
  formData.append("userId", userId);
  files.forEach((file) => formData.append("certificates[]", file));

  const res = await fetch(`${API_BASE_URL}/api/artisans/certifications`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
}

// Create Client Profile
export async function createClientProfile(profileData) {
  const res = await fetch(`${API_BASE_URL}/api/clients/profile`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  return handleResponse(res);
}

// Update client profile (with image upload)
export async function updateClientProfile({ profileImage, bio, location }) {
  let imageUrl = null;
  if (profileImage) {
    const formData = new FormData();
    formData.append("image", profileImage);
    const res = await fetch(`${API_BASE_URL}/api/profile/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    imageUrl =
      data.image || data.profileImage || data.url || data.user?.profileImage;
  }

  const res2 = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: defaultHeaders,
    credentials: "include",
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
}) {
  let imageUrl = null;

  if (profileImage) {
    const formData = new FormData();
    formData.append("image", profileImage);
    const res = await fetch(`${API_BASE_URL}/api/profile/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    imageUrl =
      data.image || data.profileImage || data.url || data.user?.profileImage;
  }

  if (certifications && certifications.length > 0) {
    const certForm = new FormData();
    certifications
      .slice(0, 3)
      .forEach((file) => certForm.append("certification", file));

    const resCert = await fetch(
      `${API_BASE_URL}/api/profile/upload-certification`,
      {
        method: "POST",
        credentials: "include",
        body: certForm,
      }
    );
    const dataCert = await resCert.json();
    if (!resCert.ok)
      throw new Error(dataCert.error || "Certification upload failed");
  }

  const res2 = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: defaultHeaders,
    credentials: "include",
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

// Post Job
export async function postJob(jobData) {
  const res = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify(jobData),
  });

  return handleResponse(res);
}

// Get Jobs
export async function getJobs() {
  const res = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: "GET",
    headers: defaultHeaders,
    credentials: "include",
  });

  return handleResponse(res);
}
