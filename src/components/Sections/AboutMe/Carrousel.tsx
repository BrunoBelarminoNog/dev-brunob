import { mix, motion, useAnimation } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styles from './aboutme.module.scss';

const Carousel = ({
  scrollTo,
  visible,
}: {
  scrollTo: (value: number) => void;
  visible: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const elemCarouselBorder = useAnimation();
  const elemCarouselWrapper = useAnimation();
  const elemCarouselBarProgress = useAnimation();
  const elemCarouselPointsProgress = useAnimation();
  const elementCarouselSlides = useAnimation();

  const mixColor = mix('#ff0088', '#008cff');

  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resizeKey, setResizeKey] = useState(0);

  const handleScroll = (scrollY: number) => {
    const slideWidth = Math.min(window.innerWidth * 0.5, 700);
    const normalizedSlide = scrollY / (slideWidth * 0.5);
    const roundedSlide = Number(normalizedSlide.toFixed(3));
    const current = Math.round(roundedSlide);
    const newScroll = -current * slideWidth;

    const offsetCarrosel = roundedSlide / 3;
    let offsetSlide = 0;

    if (current === 0) {
      offsetSlide = roundedSlide * 2;
    } else if (current < totalSlides - 1) {
      offsetSlide = roundedSlide - (current - 0.5);
    } else {
      offsetSlide = (roundedSlide - (totalSlides - 1) + 0.5) * 2;
    }
    offsetSlide = Number(offsetSlide.toFixed(2));

    const progressWidth = +(offsetCarrosel * 100).toFixed(2);

    elemCarouselBarProgress.start({
      maxWidth: `${progressWidth}%`,
      backgroundColor: mixColor(offsetSlide),
      transition: {
        default: { type: 'spring', bounce: 0.2, visualDuration: 0.3 },
        backgroundColor: { ease: 'linear', duration: 0.1 },
      },
    });
    elemCarouselBorder.start({
      backgroundColor: mixColor(offsetSlide),
      transition: { ease: 'linear', duration: 0.1 },
    });
    elemCarouselPointsProgress.start({
      backgroundColor: mixColor(offsetSlide),
      transition: { ease: 'linear', duration: 0.1 },
    });

    if (currentSlide !== current) {
      elementCarouselSlides.start({
        x: newScroll,
        transition: { type: 'spring', bounce: 0.4 },
      });

      setCurrentSlide(current);
    }
  };

  const debouncedScroll = useDebouncedCallback((value) => {
    handleScroll(value);
  }, 5);

  const debouncedResize = useDebouncedCallback(() => {
    setTimeout(() => {
      setResizeKey(Math.random());
    }, 100);
    setTimeout(() => {
      scrollTo(0);
    }, 200);
  }, 100);

  window.addEventListener('scroll', () => {
    debouncedScroll(window.scrollY);
  });

  window.addEventListener('resize', () => {
    debouncedResize();
  });

  useEffect(() => {
    if (containerRef.current && totalSlides === 0) {
      const slidesLength = containerRef.current.querySelectorAll('.sectionCarousel').length;
      setTotalSlides(slidesLength);
    }
    if (totalSlides !== 0 && visible) {
      elemCarouselBorder.start({
        opacity: 1,
        x: 0,
        transition: { ease: 'easeOut', duration: 1, delay: 0.5 },
      });
      elemCarouselWrapper.start({
        opacity: 1,
        x: 0,
        transition: { ease: 'easeOut', duration: 0.5, delay: 1 },
      });
    }
  }, [totalSlides, visible]);

  const getLeft = (index: number) => {
    if (index === 0) {
      return '0px';
    }

    if (index === 1) {
      return `${Math.min(window.innerWidth * 0.5, 700) / 2 / (totalSlides - 1)}px`;
    }
    if (index < totalSlides - 1) {
      return `${(Math.min(window.innerWidth * 0.5, 700) / 2 / (totalSlides - 1)) * (index + 1)}px`;
    }
    return `${(Math.min(window.innerWidth * 0.5, 700) / 2 / (totalSlides - 1)) * (index + 2)}px`;
  };

  return (
    <div ref={containerRef} className={styles.carouselContainer}>
      <motion.div
        initial={{ backgroundColor: '#ff0088', opacity: 0, x: -100 }}
        className={styles.carouselBorder}
        animate={elemCarouselBorder}
      />
      <motion.div
        className={styles.carouselProgress}
        initial={{ opacity: 0, x: -10 }}
        animate={elemCarouselWrapper}
      >
        <motion.div
          className={styles.carouselProgressInner}
          initial={{ maxWidth: '0%', backgroundColor: '#ff0088' }}
          animate={elemCarouselBarProgress}
          onClick={() => {
            scrollTo(0);
          }}
        />
        {totalSlides > 0 &&
          Array.from({ length: totalSlides }).map((_, index) => (
            <motion.span
              key={index + resizeKey.toString()}
              initial={{ backgroundColor: '#ff0088' }}
              animate={elemCarouselPointsProgress}
              onClick={() => {
                if (index === currentSlide + 1) {
                  scrollTo(index * 0.5 * Math.min(window.innerWidth * 0.5, 700));
                }
              }}
              style={{
                left: `${getLeft(index)}`,
                opacity: `${index === currentSlide + 1 ? 1 : 0}`,
                cursor: `${index === currentSlide + 1 ? 'pointer' : 'default'}`,
                transform: `${index === currentSlide + 1 || index < currentSlide + 1 ? 'translateX(-14px)' : 'translateX(-180px)'}`,
              }}
            />
          ))}
      </motion.div>
      <motion.div
        className={styles.carouselInner}
        animate={elementCarouselSlides}
        style={{ display: 'flex' }}
      >
        <section className={styles.carouselSection + ' sectionCarousel'}>
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
        <section className={styles.carouselSection + ' sectionCarousel'}>
          <h2>Experiência</h2>
          <p>
            <strong>Desenvolvedor Front-end Sênior</strong>
            <br />
            Grupo Boticário
            <br />
            2021 - Atual
          </p>
        </section>

        <section className={styles.carouselSection + ' sectionCarousel'}>
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

        <section className={styles.carouselSection + ' sectionCarousel'}>
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
