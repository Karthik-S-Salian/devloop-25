import { create } from "zustand";

type State = {
  manualSubmission: boolean;
  submissionNote: string;
};

type Actions = {
  makeManualSubmission: () => void;
  makeAutoSubmission: () => void;
  setSubmissionNote: (note: string) => void;
};

const useSubmission = create<State & Actions>()((set) => ({
  manualSubmission: true,
  makeManualSubmission: () => set({ manualSubmission: true }),
  makeAutoSubmission: () => set({ manualSubmission: false }),
  submissionNote: "",
  setSubmissionNote: (note) => set({ submissionNote: note }),
}));

export { useSubmission };
