"use client";

import { Pause, Play, Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";

const PLAYBACK_SPEEDS = [
  "0.500x",
  "0.625x",
  "0.750x",
  "0.875x",
  "1.000x",
  "1.250x",
  "1.500x",
  "1.750x",
  "2.000x",
] as const;

const Page = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] =
    useState<(typeof PLAYBACK_SPEEDS)[number]>("1.000x");

  useEffect(() => {
    if (!audioRef.current) return;
    if (!muted) setVolume((prev) => (prev <= 0 ? 0.5 : prev));
    audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!audioRef.current) return;
    setMuted(volume <= 0);
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = parseFloat(playbackSpeed.slice(0, -1));
  }, [playbackSpeed]);

  return (
    <div className="flex size-full items-center justify-center">
      <audio
        ref={audioRef}
        className="pointer-events-none hidden size-0 select-none"
        onLoadedData={(e) =>
          setTotalTime((e.target as HTMLAudioElement).duration)
        }
        onTimeUpdate={(e) =>
          setCurrentTime((e.target as HTMLAudioElement).currentTime)
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(e) => {
          setMuted((e.target as HTMLAudioElement).muted);
          setVolume(e.currentTarget.volume);
        }}
        onSeeking={() => audioRef.current?.pause()}
        src="/audio/s7hUSqPVyF5981Fc.wav"
        controls
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <Slider
            className="w-56"
            rangeClassName="bg-blue-500"
            value={[currentTime]}
            onValueChange={(value) => {
              if (typeof value[0] !== "undefined" && audioRef.current)
                audioRef.current.currentTime = value[0];
            }}
            min={0}
            max={totalTime}
          />
          <p>{`00:${Math.round(currentTime).toString().padStart(2, "0")}/00:${Math.round(totalTime)}`}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setMuted((prev) => !prev)}>
            {muted || volume <= 0 ? (
              <VolumeOff />
            ) : volume <= 0.33 ? (
              <Volume />
            ) : volume <= 0.66 ? (
              <Volume1 />
            ) : (
              <Volume2 />
            )}
          </Button>
          <Slider
            className="w-16"
            trackClassName="bg-primary/20"
            rangeClassName="bg-primary"
            value={[muted ? 0 : volume * 100]}
            onValueChange={(value) =>
              typeof value[0] !== "undefined" && setVolume(value[0] / 100)
            }
            min={0}
            max={100}
          />
          <Select
            value={playbackSpeed}
            onValueChange={(val) =>
              setPlaybackSpeed(val as (typeof PLAYBACK_SPEEDS)[number])
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent className="min-w-20">
              {PLAYBACK_SPEEDS.map((speed) => (
                <SelectItem key={speed} value={speed}>
                  {speed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={async () => {
              if (!playing) await audioRef.current?.play();
              else audioRef.current?.pause();
            }}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
