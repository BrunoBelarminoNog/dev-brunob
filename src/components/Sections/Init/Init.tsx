import { useSections } from '@/contexts/sections/sectionsContext';
import { motion, MotionConfig } from 'motion/react';
import { useEffect, useState } from 'react';
import styles from './init.module.scss';

const variants = {
  delay: (custom: number) => ({
    transition: { delay: custom + 1, duration: 1 },
    x: 0,
    opacity: 1,
  }),
  zoom: (custom: number) => ({
    transition: { delay: custom + 1, duration: 0.3, ease: 'easeOut' },
    scale: 1,
    opacity: 1,
  }),
};

const animationVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const zoomVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1 },
};

const Init = () => {
  const { currentSection, previousSection } = useSections();

  const delayAnimation = currentSection === 'main' && previousSection === 'main' ? 7.5 : 2;

  const [animation, setAnimation] = useState('hidden');

  useEffect(() => {
    window.addEventListener('playSectionInitContent', () => {
      setAnimation('visible');
    });

    return () => {
      window.removeEventListener('playSectionInitContent', () => {
        setAnimation('hidden');
      });
    };
  }, []);

  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.main className={styles.main} exit={{ opacity: 0 }}>
        <motion.div exit={{ x: 10 }} animate="delay" className={styles.content}>
          <motion.h1
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            // variants={variants}
            // custom={delayAnimation}
            initial="hidden"
            animate={animation}
            transition={{ duration: 1 }}
            variants={animationVariants}
          >
            Bruno B.
          </motion.h1>
          <motion.h2
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            // variants={variants}
            // custom={delayAnimation}
            initial="hidden"
            animate={animation}
            transition={{ duration: 1 }}
            variants={animationVariants}
          >
            Front-end - Arquitetura - Dados
          </motion.h2>
          {/* <p>
            Combinando inovação, design e tecnologia, crio interfaces que não apenas funcionam, mas
            emocionam.
          </p> */}
          <motion.p
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            // variants={variants}
            // custom={delayAnimation + 0.3}
            initial="hidden"
            animate={animation}
            transition={{ duration: 1, delay: 0.3 }}
            variants={animationVariants}
          >
            <span>Criação</span> de experiências imersivas
          </motion.p>
          <motion.p
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            // variants={variants}
            // custom={delayAnimation + 0.4}
            initial="hidden"
            animate={animation}
            transition={{ duration: 1, delay: 0.4 }}
            variants={animationVariants}
          >
            <span>Desenvolvimento</span> de aplicações escaláveis
          </motion.p>
          <motion.p
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            // variants={variants}
            // custom={delayAnimation + 0.5}
            initial="hidden"
            animate={animation}
            transition={{ duration: 1, delay: 0.5 }}
            variants={animationVariants}
          >
            <span>Monitoria</span> de dados estratégicos
          </motion.p>

          <motion.div
            // variants={variants}
            // custom={delayAnimation + 1}
            // initial={{ opacity: 0, scale: 0.2 }}
            // animate="zoom"
            initial="hidden"
            animate={animation}
            transition={{ duration: 1, delay: 1 }}
            variants={zoomVariants}
            whileHover={{ scale: 1.1, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.25 } }}
            className={styles.blog}
          >
            <a href="https://brunobr.dev" target="_blank" rel="noreferrer">
              <span>blog</span> dev.brunob
            </a>
          </motion.div>
          <motion.div
            // variants={variants}
            // custom={delayAnimation + 2}
            // initial={{ opacity: 0, x: -100 }}
            // animate="delay"
            initial="hidden"
            animate={animation}
            transition={{ duration: 1, delay: 2 }}
            variants={animationVariants}
            className={styles.social}
          >
            <a href="https://www.linkedin.com/in/brunobr/" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://www.linkedin.com/in/brunobr/" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </motion.div>
        <div className={styles.emptycontent}></div>
      </motion.main>
    </MotionConfig>
  );
};

export default Init;
