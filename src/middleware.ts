import { withAuth } from "next-auth/middleware";

// TODO(Omkar): Better role hierarchy and sibling routes
const routeConfig = {
  unprotected: ["/", "/auth/(.*)", "/round/(.*)", "/story/(.*)"],
  protected: {
    USER: ["/puzzle/(.*)", "/leaderboard"],
  },
} as const;

const middlewareWithAuth = withAuth(
  async (req) => {
    const pathname = new URL(req.url).pathname;
    console.log("Middleware running on: ", pathname);

    // TODO(Omkar): Authorize puzzle based on round
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (token?.role === "ADMIN") return true;

        const pathname = new URL(req.url).pathname;

        if (
          pathname.startsWith("/api") ||
          routeConfig.unprotected.some((pattern) =>
            new RegExp(`^${pattern}$`).test(pathname),
          ) ||
          (token &&
            routeConfig.protected[token.role].some((pattern) =>
              new RegExp(`^${pattern}$`).test(pathname),
            ))
        )
          return true;

        return false;
      },
    },
  },
);

const config = {
  matcher: ["/(.*)"],
};

export { config };
export default middlewareWithAuth;
