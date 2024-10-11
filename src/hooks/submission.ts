import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";

const useSubmitPuzzle = () => {
  const pathname = usePathname();
  const puzzleRoute = pathname.split("/")[2]!;

  const submitPuzzle = api.submission.submitPuzzle.useMutation();
  const startPuzzle = api.useUtils().submission.startPuzzle;

  return ({ answer }: { answer: string }) => {
    if (!puzzleRoute) return;
    toast.loading("Submitting puzzle...");
    submitPuzzle.mutate(
      {
        manualSubmission: false,
        puzzleId: puzzleRoute,
        answer: answer,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Submitted Puzzle Successfully");
          void startPuzzle.refetch();
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      },
    );
  };
};

export { useSubmitPuzzle };
