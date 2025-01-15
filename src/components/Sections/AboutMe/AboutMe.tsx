import LocomotiveScroll from 'locomotive-scroll';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import styles from './aboutme.module.scss';
import Carousel from './Carrousel';

const scrollPrevious = 0;
const animationVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const AboutMe = () => {
  // const lenisRef = useRef<LenisRef>(null);
  const wrapper = useRef<HTMLElement>(null);
  const content = useRef<HTMLElement>();
  // const { scrollY } = useScroll({
  //   target: wrapper,
  // });
  const [scaleX, setScaleX] = useState(0);
  const { scrollY } = useScroll();
  const [animation, setAnimation] = useState('hidden');

  let scale = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // console.log('Page scroll: ', latest);

    const top = latest;

    const sectionWidth = window.innerWidth / 2;
    const activeIndex = Math.floor(top / sectionWidth);
    let value = 0;

    value = top / sectionWidth;
    // console.log(activeIndex, latest);

    // console.log('value', value);
  });

  const locomotiveScroll = new LocomotiveScroll({
    // el: wrapperElement as HTMLElement,
    lenisOptions: {
      // wrapper: wrapperElement as HTMLElement,
      // content: element as HTMLElement,
      lerp: 0.5,
      duration: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.5,
      // normalizeWheel: true,
      touchMultiplier: 0,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    },
    scrollCallback: (instance) => {
      // instance.
    },
    autoStart: true,
  });

  useEffect(() => {
    window.addEventListener('playSectionAboutmeContent', () => {
      setAnimation('visible');
    });

    return () => {
      window.removeEventListener('playSectionAboutmeContent', () => {
        setAnimation('hidden');
      });
    };
  }, []);

  const handleScroll = (value: number) => {
    // locomotiveScroll.scrollTo(100);
    // window.scrollTo({ left: 0, top: value, behavior: 'smooth' });
    locomotiveScroll.stop();
    // console.log('scroll', value);
    window.scrollTo(0, value);
    // locomotiveScroll.start();
  };

  return (
    <main className={styles.main + ' '} ref={wrapper}>
      <div className={styles.emptycontent}></div>
      <div className={styles.content}>
        <motion.h1
          initial="hidden"
          animate={animation}
          transition={{ duration: 1 }}
          variants={animationVariants}
        >
          Quem é Bruno B?
        </motion.h1>
        {/* <motion.div
          id="scroll-indicator"
          style={{
            scaleX,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            originX: 0,
            backgroundColor: '#ff0088',
          }}
        /> */}
        <motion.div
          className={styles.wrapperCarousel}
          initial="hidden"
          animate={animation}
          transition={{ duration: 1.5, delay: 1 }}
          variants={{
            hidden: { opacity: 0, x: 0 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <Carousel
            scrollTo={(value) => {
              handleScroll(value);
            }}
          />
          {/* <div>
            <div>
              <section>
                <p>Olá, sou de São Paulo/Br e atuo com desenvolvimento web desde 2020.</p>
                <p>
                  Com uma mente analitica e um olhar criativo, busco sempre a combinação perfeita
                  entre funcionalidade e estética.
                </p>
                <p>Atualmente, sou desenvolvedor front-end sênior no Grupo Boticário.</p>
                <p>
                  Minha paixão por compartilhar conhecimento também me levou a criar um blog, onde
                  exploro desde os desafios do desenvolvimento front-end moderno até insights sobre
                  monitoramento de apps e muito mais.
                </p>
              </section>
              <section>
                <h2>Experiência</h2>
                <p>
                  <strong>Desenvolvedor Front-end Sênior</strong>
                  <br />
                  Grupo Boticário
                  <br />
                  2021 - Atual
                </p>
                <p>
                  <strong>Desenvolvedor Front-end Pleno</strong>
                  <br />
                  Grupo Boticário
                  <br />
                  2020 - 2021
                </p>
                <p>
                  <strong>Desenvolvedor Web</strong>
                  <br />
                  Freelancer
                  <br />
                  2019 - 2020
                </p>
                <p>
                  <strong>Assistente de Vitrinismo</strong>
                  <br />
                  Grupo Boticário
                  <br />
                  2017 - 2019
                </p>
              </section>

              <section>
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
            </div>
          </div> */}
        </motion.div>
      </div>
    </main>
  );
};

export default AboutMe;
