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
    <div className="flex size-full items-center justify-center">

      <div className="flex size-96 flex-col items-center justify-center gap-4">
        <div>{roundStatus ? "Live" : "Not Live"}</div>
        <div className="flex w-full items-center justify-between">
          <Button
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
      <div>
        <UploadEmailFile />
      </div>
    </div>
  );
};

export default Page;