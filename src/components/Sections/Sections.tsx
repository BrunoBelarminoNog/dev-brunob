import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AboutMe from './AboutMe/AboutMe';
import Contact from './Contact/Contact';
import Init from './Init/Init';

const Sections = () => {
  const [currentSection, setCurrentSection] = useState('main');
  const searchParams = useSearchParams();

  console.log(searchParams.toString());

  useEffect(() => {
    const paramSection = searchParams.get('sections');
    if (paramSection) {
      setCurrentSection(paramSection);
    } else {
      setCurrentSection('main');
    }
  }, [searchParams]);

  const getSection = (section: string) => {
    switch (section) {
      case 'aboutme':
        return <AboutMe />;
      case 'contact':
        return <Contact />;
      case 'main':
        return <Init />;
      default:
        return <Init />;
    }
  };

  return getSection(currentSection);
};
export default Sections;
