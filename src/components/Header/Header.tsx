'use client';
import Link from 'next/link';

import { motion, useAnimate } from 'motion/react';
import { useEffect } from 'react';
import styles from './header.module.scss';

const Header = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {}, []);
  window.addEventListener('animationIntroInit', () => {
    console.log('animationIntroInit');
    animate(scope.current, {
      opacity: 1,
      y: 0,
    });
  });

  return (
    <motion.header
      ref={scope}
      className={styles.header}
      initial={{ opacity: 1, y: -59 }}
      transition={{ duration: 0.3, ease: 'linear' }}
      // animate={{
      //   opacity: 1,
      //   y: 0,
      //   transition: {
      //     duration: 1.5,
      //     ease: 'easeInOut',
      //     delay: 1,
      //   },
      // }}
    >
      <div>
        <h1>
          dev.<span>BrunoB</span>
        </h1>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href={'/?sections=aboutme'}>Sobre mim</Link>
          </li>
          <li>
            <Link href="/?sections=contact">Contato</Link>
          </li>
          <li>
            <Link href="/?sections=main">Blog</Link>
          </li>
        </ul>
      </div>
    </motion.header>
  );
};

export default Header;
