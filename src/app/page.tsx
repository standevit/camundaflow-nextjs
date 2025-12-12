import fs from "fs";
import path from "path";

export default function HomePage() {
  const filePath = path.join(process.cwd(), "public/index.html");
  const html = fs.readFileSync(filePath, "utf8");

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

