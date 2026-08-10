import { next } from "@vercel/functions";

export const config = {
  matcher: "/(.*)",
};

export default function middleware(request) {
  // 認証を一時的に外したい時は Vercel の環境変数に BASIC_AUTH_DISABLED=1 を設定する
  if (process.env.BASIC_AUTH_DISABLED === "1") {
    return next();
  }

  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;
  const authorization = request.headers.get("authorization");

  if (user && password && authorization) {
    const expectedAuthorization = `Basic ${btoa(`${user}:${password}`)}`;

    if (authorization === expectedAuthorization) {
      return next();
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="DRESSING ROOM", charset="UTF-8"',
    },
  });
}
