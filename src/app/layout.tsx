import "../styles/globals.css";

export const metadata = {
  title: "CamundaFlow",
  description: "Process automation & BPMN consulting"
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4">
          <nav className="max-w-5xl mx-auto flex gap-6 text-lg">
            <a href="/">Home</a>
            <a href="/contact">Kontakt</a>
            <a href="/bpmn-viewer">BPMN Viewer</a>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto py-10">
          {children}
        </main>
      </body>
    </html>
  );
}

