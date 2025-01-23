import LocomotiveScroll from 'locomotive-scroll';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import styles from './aboutme.module.scss';
import Carousel from './Carrousel';

const animationVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const AboutMe = () => {
  const [animation, setAnimation] = useState('hidden');

  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      lerp: 0.1,
      duration: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.4,
      touchMultiplier: 0.5,
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
    locomotiveScroll.scrollTo(value);
  };

  return (
    <main className={styles.main}>
      <div className={styles.emptycontent}></div>
      <div className={styles.content}>
        <motion.h1
          initial="hidden"
          animate={animation === 'visible' || animation === 'completed' ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 0.5 }}
          variants={animationVariants}
        >
          Quem é Bruno B?
        </motion.h1>
        <motion.div
          className={styles.wrapperCarousel}
          initial="hidden"
          animate={animation === 'visible' || animation === 'completed' ? 'visible' : 'hidden'}
          onAnimationStart={(def) => {
            if (def === 'visible') {
              setAnimation('completed');
            }
          }}
          transition={{ duration: 1.5, delay: 0.75 }}
          variants={{
            hidden: { opacity: 0, x: 0 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <Carousel
            visible={animation === 'completed'}
            scrollTo={(value) => {
              handleScroll(value);
            }}
          />
        </motion.div>
      </div>
    </main>
  );
};

export default AboutMe;
