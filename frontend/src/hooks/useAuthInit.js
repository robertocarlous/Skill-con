import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";
import { getProfile } from "../utils/api";

export const useAuthInit = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const profile = await getProfile();
        useUserStore.getState().setUser(profile);
        useAuthStore.getState().setAuthenticated(true);
      } catch (err) {
        useAuthStore.getState().setAuthenticated(false);
        useUserStore.getState().clearUser();
        console.log("Not authenticated", err);
      }
    };
    init();
  }, []);
};
