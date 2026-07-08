import fs from "node:fs";
import path from "node:path";
import type { Connect } from "vite";
import type { Plugin } from "vite";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
};

function createProductMiddleware(root: string): Connect.NextHandleFunction {
  const resolvedRoot = path.resolve(root);

  return (req, res, next) => {
    if (!req.url) return next();

    const urlPath = decodeURIComponent(req.url.split("?")[0] ?? "");
    const rel = urlPath.replace(/^\/+/, "");
    const filePath = path.normalize(path.join(resolvedRoot, rel));

    if (!filePath.startsWith(resolvedRoot)) {
      res.statusCode = 403;
      res.end();
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      return next();
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    fs.createReadStream(filePath).pipe(res);
  };
}

function copyProductToDist(source: string, dest: string) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(source, dest, { recursive: true, force: true });
}

export function productStaticPlugin(productDir = "product"): Plugin {
  const source = path.resolve(process.cwd(), productDir);

  return {
    name: "product-static",
    configureServer(server) {
      server.middlewares.use("/product", createProductMiddleware(source));
    },
    configurePreviewServer(server) {
      server.middlewares.use("/product", createProductMiddleware(path.resolve(process.cwd(), "dist", productDir)));
    },
    closeBundle() {
      copyProductToDist(source, path.resolve(process.cwd(), "dist", productDir));
    },
  };
}
