import { Suspense } from "react";
import MicroservicesContent from "@/components/MicroservicesContent";

export default function MicroservicesPage() {
  return (
    <Suspense fallback={<div className="container"><div className="main-content"><div className="card">Učitavanje...</div></div></div>}>
      <div className="container">
        <MicroservicesContent />
      </div>
    </Suspense>
  );
}
