export const SECTIONS = [
  { id: 'about', label: 'About', no: '01' },
  { id: 'experience', label: 'Experience', no: '02' },
  { id: 'projects', label: 'Projects', no: '03' },
  { id: 'other', label: 'Other Work', no: '04' },
  { id: 'skills', label: 'Stack', no: '05' },
  { id: 'education', label: 'Education', no: '06' },
  { id: 'certifications', label: 'Certs', no: '07' },
] as const;

export const LINKS = {
  github: 'https://github.com/AshwinUgale',
  linkedin: 'https://linkedin.com/in/ashwin-ugale/',
  email: 'mailto:ugaleashwin@gmail.com',
  resume: '/Ashwin_Ugale_resume.pdf',
};

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const openTerminal = () => window.dispatchEvent(new CustomEvent('open-portfolio-chat'));
export const openPalette = () => window.dispatchEvent(new CustomEvent('open-command-palette'));
