import PusherServer from "pusher";
import PusherClient from "pusher-js";

import { env } from "~/env";

const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: "ap2",
});

const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

export { pusherClient, pusherServer };
