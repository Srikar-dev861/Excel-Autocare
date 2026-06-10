import server from "../dist/server/server.js";

function normalizeHeaders(headers) {
  const result = new Headers();
  for (const [key, value] of Object.entries(headers || {})) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        result.append(key, item);
      }
    } else {
      result.append(key, value);
    }
  }
  return result;
}

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  const request = new Request(url.toString(), {
    method: req.method,
    headers: normalizeHeaders(req.headers),
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });

  const response = await server.fetch(request, {}, { waitUntil: () => {} });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const buffer = response.body ? Buffer.from(await response.arrayBuffer()) : undefined;
  res.end(buffer);
}
