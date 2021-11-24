import { createProxyMiddleware } from "http-proxy-middleware";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: "http://dev.exam105.com:9090",
  changeOrigin: true,
  pathRewrite: { [`^/api/proxy`]: "" },
  secure: false,
});

export default function handler(req, res) {
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}
export const config = { api: { externalResolver: true, bodyParser: false } };
