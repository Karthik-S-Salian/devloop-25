"use client";

import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";
import UploadEmailFile from "./_components/UploadEmailFile";

const Page = () => {
  const { data: roundStatus, refetch: refetchRoundStatus } =
    api.admin.getRoundStatus.useQuery();
  const startRound = api.admin.startRound.useMutation();
  const stopRound = api.admin.stopRound.useMutation();

  return (
    <div className="flex w-full h-full justify-center items-center gap-6 flex-wrap">

      <div className="flex flex-col items-center justify-center gap-4 border border-purple-700 rounded p-4">
        <strong className={`text-lg font-bold ${roundStatus ? "text-green-600" : "text-red-600"}`}>{roundStatus ? "Live" : "Not Live"}</strong>
        <div className="flex w-full items-center justify-between gap-6">
          <Button
          disabled={roundStatus}
            onClick={() => {
              toast.loading("Starting round...");
              startRound.mutate(void null, {
                onSuccess: () => {
                  void refetchRoundStatus();
                  toast.dismiss();
                  toast.success("Round started!");
                },
                onError: ({ message }) => {
                  void refetchRoundStatus();
                  toast.error(message);
                },
              });
            }}
          >
            Start Round
          </Button>
          <Button
          disabled={!roundStatus}
            onClick={() => {
              toast.loading("Stopping round...");
              stopRound.mutate(void null, {
                onSuccess: () => {
                  void refetchRoundStatus();
                  toast.dismiss();
                  toast.success("Round stopped!");
                },
                onError: ({ message }) => {
                  void refetchRoundStatus();
                  toast.error(message);
                },
              });
            }}
          >
            Stop Round
          </Button>
        </div>
      </div>
      <UploadEmailFile />
    </div>
  );
};

export default Page;