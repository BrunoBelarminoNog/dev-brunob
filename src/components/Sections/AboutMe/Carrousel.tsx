import { mix, motion, useAnimation } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styles from './aboutme.module.scss';

const sections = [1, 2, 3, 4, 5];
let activeIndex = 0;
let currentSection = 0;
let previousSection = 0;
let scrollF = 0;
const animationVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const Carousel = ({ scrollTo }: { scrollTo: (value: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const progressControl = useAnimation();
  const elementControl = useAnimation();
  //   const [scrollY, setScrollY] = useState(0);
  //   const [currentSection, setCurrentSection] = useState(0);

  //   let currentScroll = 0;

  //   const handleScroll = (scrollY: number) => {
  //     const sectionWidth = window.innerWidth / 2;
  //     scrollY = Math.round(scrollY);

  //     let currentPos = scrollY / sectionWidth;
  //     currentPos = Number.parseFloat(currentPos.toFixed(3));

  //     if (currentPos >= 0 && currentPos < 0.8) {
  //       activeIndex = 0;
  //       currentScroll = 0;
  //     } else if (currentPos >= 0.8 && currentPos < 1) {
  //       activeIndex = 0;
  //       const diff = (currentPos - 0.8) * sectionWidth;
  //       currentScroll = diff;
  //     } else if (currentPos >= 1 && currentPos < 1.8) {
  //       activeIndex = 1;
  //       currentScroll = sectionWidth * 1;
  //     } else if (currentPos >= 1.8 && currentPos < 2) {
  //       const diff = (currentPos - 1.8) * sectionWidth;
  //       currentScroll = diff + sectionWidth;
  //     } else if (currentPos >= 2 && currentPos < 2.6) {
  //       activeIndex = 2;
  //       currentScroll = sectionWidth * 2;
  //     } else if (currentPos >= 2.6 && currentPos < 2.9) {
  //       const diff = (currentPos - 2.6) * sectionWidth;
  //       currentScroll = diff + sectionWidth * 2;
  //     } else if (currentPos >= 2.9) {
  //       activeIndex = 3;
  //       currentScroll = sectionWidth * 3;
  //     }

  //     controls.start({
  //       x: currentScroll * -1,
  //       transition: { type: 'spring', stiffness: 80, damping: 20 },
  //     });
  //   };

  const handleScroll = (scrollY: number) => {
    const sectionWidth = window.innerWidth / 2;
    const normalizedScroll = scrollY / sectionWidth;
    const roundedScroll = Number(normalizedScroll.toFixed(3));
    const threshold = 0.1; // 20% transition zone

    let activeIndex = Math.floor(roundedScroll);
    let currentScroll = activeIndex * sectionWidth;

    // Calculate transition effect within the last 20% of each section
    let offset = roundedScroll - activeIndex;
    if (offset >= 1 - threshold && offset < 1) {
      const progress = (offset - (1 - threshold)) / threshold;
      currentScroll += progress * sectionWidth;
    }

    // Ensure the last slide enters fully at or beyond 2.9
    if (roundedScroll >= 2.7) {
      activeIndex = 3;
      currentScroll = sectionWidth * 3;
      offset = 0;
    }
    // console.log({
    //   activeIndex,
    //   currentScroll,
    //   offset,
    //   roundedScroll,
    //   progress: (offset - (1 - threshold)) / threshold,
    //   transit: roundedScroll / 3,
    // });
    controls.start({
      x: -currentScroll,
      transition: { ease: 'easeOut', duration: 0.25 },
    });
    const mixColor = mix('#ff0088', '#008cff');

    progressControl.start({
      scaleX: roundedScroll / 3.01,
      backgroundColor: mixColor(offset),
      transition: {
        default: { type: 'spring', bounce: 0.2 },
        backgroundColor: { ease: 'linear', duration: 0.1 },
      },
    });
    elementControl.start({
      backgroundColor: mixColor(offset),
      transition: { ease: 'linear', duration: 0.1 },
    });
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      //   setScrollY(value);
      //   console.log(value);
      handleScroll(value);
    },
    // delay in ms
    5,
  );

  window.addEventListener('scroll', () => {
    debounced(window.scrollY);
    // setScrollY(window.scrollY);
  });

  useEffect(() => {
    elementControl.start({
      scaleX: 0.9,
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.5, delay: 3 },
    });
    // return () => {
    //   window.removeEventListener('scroll', () => {
    //     handleScroll(window.scrollY);
    //     // setScrollY(window.scrollY);
    //   });
    // };
  }, []);

  return (
    <div ref={containerRef} className={styles.carouselContainer}>
      <motion.div
        initial={{ backgroundColor: '#ff0088', scaleX: 0.7, opacity: 0 }}
        className={styles.carouselTrack}
        animate={elementControl}
      />
      <motion.div
        initial={{ scaleX: 0, backgroundColor: '#ff0088' }}
        style={{
          position: 'absolute',
          width: '90%',
          bottom: 0,
          left: 0,
          height: 2,
          originX: 0,
        }}
        animate={progressControl}
        // drag="x"
        // dragConstraints={{ left: 0, right: 0 }}
        // dragElastic={0.1}
      />
      <motion.div className={styles.carouselInner} animate={controls} style={{ display: 'flex' }}>
        {/* {sections.map((section, index) => (
          <div className={styles.carouselSection} key={index}>
            <h1>Section {section}</h1>
          </div>
        ))} */}

        <section className={styles.carouselSection}>
          <p>Olá, sou de São Paulo/Br e atuo com desenvolvimento web desde 2020.</p>
          <p>
            Com uma mente analitica e um olhar criativo, busco sempre a combinação perfeita entre
            funcionalidade e estética.
          </p>
          <p>Atualmente, sou desenvolvedor front-end sênior no Grupo Boticário.</p>
          <p>
            Minha paixão por compartilhar conhecimento também me levou a criar um blog, onde exploro
            desde os desafios do desenvolvimento front-end moderno até insights sobre monitoramento
            de apps e muito mais.
          </p>
        </section>
        <section className={styles.carouselSection}>
          <h2>Experiência</h2>
          <p>
            <strong>Desenvolvedor Front-end Sênior</strong>
            <br />
            Grupo Boticário
            <br />
            2021 - Atual
          </p>
        </section>

        <section className={styles.carouselSection}>
          <h2>Formação</h2>
          <p>
            <strong>Engenharia de Software</strong>
            <br />
            Universidade de São Paulo
            <br />
            2020 - 2024
          </p>
          <p>
            <strong>Design de Interfaces</strong>
            <br />
            Alura
            <br />
            2019
          </p>
        </section>

        <section className={styles.carouselSection}>
          <h2>Formação</h2>
          <p>
            <strong>Engenharia de Software</strong>
            <br />
            Universidade de São Paulo
            <br />
            2020 - 2024
          </p>
          <p>
            <strong>Design de Interfaces</strong>
            <br />
            Alura
            <br />
            2019
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Carousel;
