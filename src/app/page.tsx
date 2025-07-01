import { CTA } from "@/components/CTA";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import Image from "next/image";


export default async function Home() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tasks/today`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const result = await response.json();


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Hero />
      <Demo allTasks={result.data.tasks} />
      <Features />
      <Testimonials />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
