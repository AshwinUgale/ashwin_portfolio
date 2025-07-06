
import SidebarLayout from '@/components/SidebarLayout';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const Index = () => {
  useScrollOpacity();
  useKeyboardNavigation();
  
  return (
    <SidebarLayout>
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <div className="mt-16 text-center text-lg md:text-xl text-slate-300">
        Let’s build something great together. If you’re looking for someone to help drive your next project, solve problems, or bring new ideas to life, I’d love to hear from you. Reach out at <a href="mailto:ugaleashwin@gmail.com" className="underline hover:text-blue-400 transition">ugaleashwin@gmail.com</a> and let’s start a conversation.
      </div>
    </SidebarLayout>
  );
};

export default Index;
