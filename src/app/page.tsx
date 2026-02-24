import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import InterestedPositions from '@/components/InterestedPositions';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Education from '@/components/Education';
import Coursework from '@/components/Coursework';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <InterestedPositions />
        <Projects />
        <Publications />
        <Education />
        <Coursework />
        <Awards />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
