import { Hero } from "@/conponents/Hero";
import { Contact } from "@/conponents/Contact";
import { AdminPanel } from "@/conponents/AdminPanel";
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AdminPanel />
      <Hero />
      <Contact />
    </div>
  );
}
