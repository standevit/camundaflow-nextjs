import fs from "fs";
import path from "path";

export default function StaticHtmlPage({ file }: { file: string }) {
  const filePath = path.join(process.cwd(), "public", "static_html", file);
  let html = "";
  try {
    html = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    return <div className="text-center py-20"><h1 className="text-4xl">404 – Stranica nije pronađena</h1></div>;
  }
  return (
    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
