import type {CSSProperties, ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {motion, useReducedMotion, type Variants} from 'framer-motion';
import styles from './projects.module.css';

type ProjectScope = 'Team' | 'Solo';

type Project = {
  title: string;
  short: string;
  description: string;
  period: string;
  role: string;
  label: string;
  scope: ProjectScope;
  tags: string[];
  href: string;
  image?: string;
  repo?: string;
  live?: string;
  accent: string;
  accentSoft: string;
};

const projects: Project[] = [
  {
    title: 'WHYNE',
    short: 'WHYNE',
    description:
    '사용자가 다양한 와인 리뷰를 확인하고, 구매 여부를 쉽게 판단할 수 있는 와인 리뷰 플랫폼',
    period: '2025.09 - 2025.10',
    role: 'Team Lead',
    label: 'Codeit',
    scope: 'Team',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'TanStack Query'],
    href: '/blog/middle-project-remind',
    repo: 'https://github.com/junye0l/WHYNE',
    image: '/img/projects/whyne/whyne-banner.png',
    accent: '#d8c7b1',
    accentSoft: 'rgba(216, 199, 177, 0.35)',
  },
  {
    title: 'Coworkers',
    short: 'Coworkers',
    description:
      '여러 명이 하나의 그룹을 만들어 할 일(Task)을 함께 공유하고 관리할 수 있는 협업용 To-do 플랫폼',
    period: '2025.11 - 2025.12',
    role: 'Team Lead',
    label: 'Codeit',
    scope: 'Team',
    tags: ['Next.js', 'TypeScript', 'Lottie', 'Jotai'],
    href: '/blog/high-project-remind',
    repo: 'https://github.com/junye0l/coworkers',
    image: '/img/projects/coworkers/coworkers-banner.png',
    accent: '#b8c9dd',
    accentSoft: 'rgba(184, 201, 221, 0.35)',
  },
  {
    title: 'Badge Generator',
    short: 'Badge',
    description:
      'GitHub README 뱃지를 한 번에 만들고 미리보는 사이드 프로젝트.',
    period: '2025.12 ~ ing',
    role: 'Solo Builder',
    label: 'Side Project',
    scope: 'Solo',
    tags: ['GitHub', 'README', 'Badge', 'Side Project'],
    href: '/blog/badge-generator',
    image: '/img/projects/badge-generator/og.png',
    repo: 'https://github.com/junye0l/badge-generator',
    accent: '#b9d6c3',
    accentSoft: 'rgba(185, 214, 195, 0.35)',
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {opacity: 0, y: 26},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18,
    },
  },
  hover: {
    y: -12,
    scale: 1.035,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  },
  tap: {
    y: -10,
    scale: 0.99,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  },
};

export default function Projects(): ReactNode {
  const reduceMotion = useReducedMotion();

  const openRepo = (repo?: string) => {
    if (!repo || typeof window === 'undefined') {
      return;
    }

    window.open(repo, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout title="Projects" description="프로젝트 모음">
      <main className={styles.page}>
        <section className={styles.gridSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                Projects Archive
              </Heading>
              <p className={styles.sectionSubtitle}>
                진행한 프로젝트의 맥락과 결과를 한눈에 볼 수 있게 정리했습니다.
              </p>
            </div>

            <motion.div
              className={styles.grid}
              variants={gridVariants}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  className={styles.card}
                  variants={cardVariants}
                  whileHover={reduceMotion ? undefined : 'hover'}
                  whileTap={reduceMotion ? undefined : 'tap'}
                  whileFocus={reduceMotion ? undefined : 'hover'}
                  role="link"
                  tabIndex={project.repo ? 0 : -1}
                  aria-label={
                    project.repo
                      ? `${project.title} repository`
                      : project.title
                  }
                  aria-disabled={!project.repo}
                  onClick={(event) => {
                    if (event.defaultPrevented) {
                      return;
                    }

                    openRepo(project.repo);
                  }}
                  onKeyDown={(event) => {
                    if (!project.repo) {
                      return;
                    }

                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openRepo(project.repo);
                    }
                  }}
                  style={
                    {
                      '--accent': project.accent,
                      '--accent-soft': project.accentSoft,
                    } as CSSProperties
                  }
                >
                  <div className={styles.cardMedia}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.cardMediaFallback}>
                        <span>{project.short}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.typeBadge}>{project.label}</span>
                      <span className={styles.role}>{project.role}</span>
                      <span className={styles.period}>{project.period}</span>
                    </div>
                    <Heading as="h3" className={styles.cardTitle}>
                      {project.title}
                    </Heading>
                    <p className={styles.cardDescription}>
                      {project.description}
                    </p>
                    <div className={styles.tagRow}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <Link
                      className={styles.primaryAction}
                      to={project.href}
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      회고
                    </Link>
                    {project.live ? (
                      <a
                        className={styles.secondaryAction}
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        Live
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
