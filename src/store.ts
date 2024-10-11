import { create } from "zustand";

type State = {
  manualSubmission: boolean;
};

type Actions = {
  makeManualSubmission: () => void;
  makeAutoSubmission: () => void;
};

const useSubmission = create<State & Actions>()((set) => ({
  manualSubmission: true,
  makeManualSubmission: () => set({ manualSubmission: true }),
  makeAutoSubmission: () => set({ manualSubmission: false }),
}));

export { useSubmission };
