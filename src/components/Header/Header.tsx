'use client';
import Link from 'next/link';

import { motion, useAnimate } from 'motion/react';
import { useEffect } from 'react';
import styles from './header.module.scss';

const Header = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    window.addEventListener('animationIntroInit', () => {
      animate(scope.current, {
        opacity: 1,
        y: 0,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.header
      ref={scope}
      className={styles.header}
      initial={{ opacity: 1, y: -72 }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={'/?sections=main'}>
            dev.<span>BrunoB</span>
          </Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <Link href={'/?sections=aboutme'}>Sobre mim</Link>
            </li>
            <li>
              <Link href="/?sections=contact">Contato</Link>
            </li>
          </ul>
        </div>
      </div>
      <motion.div whileTap={{ scale: 0.9, transition: { duration: 0.25 } }} className={styles.blog}>
        <a href="https://brunobr.dev" target="_blank" rel="noreferrer">
          <span>blog</span>
        </a>
      </motion.div>
    </motion.header>
  );
};

export default Header;
