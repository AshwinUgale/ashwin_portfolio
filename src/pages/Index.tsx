
import SidebarLayout from '@/components/SidebarLayout';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <SidebarLayout>
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Contact />
    </SidebarLayout>
  );
};

export default Index;
