'use client';
import Sections from '@/components/Sections/Sections';
import { AnimatePresence } from 'motion/react';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <AnimatePresence>
        <Sections />
      </AnimatePresence>
      <div className={styles.skills}>
        <p>
          <span>Front-end</span> ReactJS, Next.js, Gatsby, Angular |<span>Mobile</span> React
          Native, Flutter, Android Studio |<span>Arquitetura</span> Microfrontends, JamStack, PWA |
          <span>Design</span> Design System, UX/UI |<span>Monitoria</span> New Relic, Datadog,
          Amazon CloudWatch |<span>Dados</span> Analytics, Tag Manager, Locker Studio
        </p>
        <p aria-hidden>
          <span>Front-end</span> ReactJS, Next.js, Gatsby, Angular |<span>Mobile</span> React
          Native, Flutter, Android Studio |<span>Arquitetura</span> Microfrontends, JamStack, PWA |
          <span>Design</span> Design System, UX/UI |<span>Monitoria</span> New Relic, Datadog,
          Amazon CloudWatch |<span>Dados</span> Analytics, Tag Manager, Locker Studio
        </p>
      </div>
    </div>
  );
}
