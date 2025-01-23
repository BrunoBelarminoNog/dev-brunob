import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import styles from './contact.module.scss';

const animationVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [animation, setAnimation] = useState('hidden');

  useEffect(() => {
    window.addEventListener('playSectionContactContent', () => {
      setAnimation('visible');
    });

    return () => {
      window.removeEventListener('playSectionContactContent', () => {
        setAnimation('hidden');
      });
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <motion.h1
          initial="hidden"
          animate={animation === 'visible' || animation === 'completed' ? 'visible' : 'hidden'}
          transition={{ duration: 1 }}
          variants={animationVariants}
        >
          Quer falar comigo?
        </motion.h1>
      </div>
    </main>
  );
};

export default Contact;
