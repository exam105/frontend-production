import { createProxyMiddleware } from "http-proxy-middleware";
import { API_URL } from "../../../config/";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: { API_URL },
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
