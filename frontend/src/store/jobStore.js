import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useJobStore = create(
  persist(
    (set) => ({
      formData: null,
      fetchedJobs: [],
      hasFetchedJobs: false,

      setFormData: (formData) => set({ formData }),
      clearFormData: () => set({ formData: null }),

      setFetchedJobs: (jobs) =>
        set({ fetchedJobs: jobs, hasFetchedJobs: true }),

      addJob: (job) =>
        set((state) => ({
          fetchedJobs: [job, ...state.fetchedJobs],
        })),

      clearJobs: () => set({ fetchedJobs: [], hasFetchedJobs: false }),
    }),
    {
      name: "post-job-storage",
      partialize: (state) => ({
        formData: state.formData,
        fetchedJobs: state.fetchedJobs,
        hasFetchedJobs: state.hasFetchedJobs,
      }),
    }
  )
);
