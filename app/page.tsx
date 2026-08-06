import Authors from "@/components/Authors";
import Curriculum from "@/components/Curriculum";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import SignupForm from "@/components/SignupForm";
import Testimonials from "@/components/Testimonials";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Curriculum />
        <Authors />
        <Testimonials />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
