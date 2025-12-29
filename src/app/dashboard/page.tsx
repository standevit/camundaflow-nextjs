import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "2rem",
        color: "white",
        marginBottom: "2rem"
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Willkommen im Portal, {session.user?.name}! 👋
        </h1>
        <p style={{ opacity: 0.9 }}>
          Sie haben erfolgreich mit GitHub angemeldet.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            📊 Ihre Projekte
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Verwalten Sie Ihre Camunda-Projekte und Workflows.
          </p>
          <button style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Projekte anzeigen
          </button>
        </div>

        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            🔧 Ressourcen
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Zugriff auf Dokumentation und Tools.
          </p>
          <button style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Ressourcen öffnen
          </button>
        </div>

        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            👤 Benutzerprofil
          </h2>
          <div style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Name:</strong> {session.user?.name}
          </div>
          <div style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Email:</strong> {session.user?.email}
          </div>
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt="Profile" 
              style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                marginTop: "1rem" 
              }} 
            />
          )}
        </div>
      </div>
    </div>
  )
}
