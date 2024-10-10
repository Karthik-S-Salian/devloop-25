import { withAuth } from "next-auth/middleware";

const routeConfig = {
  unprotected: ["/", "/login", "/round/(.*)"],
  protected: {
    USER: ["/puzzle/(.*)"],
    ADMIN: ["/admin/(.*)"],
  },
} as const;

const middlewareWithAuth = withAuth(
  (req) => {
    console.log("i am running");
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = new URL(req.url).pathname;

        if (token) {
          const userRole = token.role;

          if (
            routeConfig.unprotected.some((pattern) => {
              const matched = new RegExp(pattern).test(pathname);
              console.log("Matched route: ", pattern);
              return matched;
            }) ||
            routeConfig.protected[userRole].some((pattern) => {
              const matched = new RegExp(pattern).test(pathname);
              console.log("Matched route: ", pattern);
              return matched;
            })
          )
            return true;

          console.log("unauthorized to view the page");
        } else {
          console.log("Not logged in");
        }

        return true;
      },
    },
  },
);

const config = {
  matcher: ["/(.*)"],
};

export { config };
export default middlewareWithAuth;
