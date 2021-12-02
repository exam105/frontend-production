import { API_URL } from "../../../config/";
import { createProxyMiddleware } from "http-proxy-middleware";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: `${API_URL}`,
  changeOrigin: true,
  pathRewrite: { [`^/api/proxy`]: "" },
  secure: false,
});

export default function handler(req, res) {
  console.log(
    `Method: ${req.method} URL: ${req.url} Status Code: ${res.statusCode}`
  );
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
