import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="준열의 개발 블로그">
      <main style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 0',
      }}>
        <style>{`
          .minimal-card {
            border: 1px solid var(--ifm-color-emphasis-200);
            padding: 2rem;
            text-decoration: none;
            transition: border-color 0.2s ease;
          }

          .minimal-card:hover {
            border-color: var(--ifm-color-primary);
          }

          .minimal-card h3 {
            margin: 0.5rem 0;
            font-size: 1.25rem;
          }

          .minimal-card p {
            margin: 0;
            color: var(--ifm-font-color-secondary);
            font-size: 0.95rem;
          }

          .nav-link {
            color: var(--ifm-font-color-base);
            text-decoration: none;
            padding: 0.5rem 0;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s ease;
          }

          .nav-link:hover {
            border-bottom-color: var(--ifm-color-primary);
          }
        `}</style>

        <div className="container">
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <Heading as="h1" style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}>
              {siteConfig.title}
            </Heading>

            <p style={{
              fontSize: '1rem',
              color: 'var(--ifm-font-color-secondary)',
              marginBottom: '3rem',
            }}>
              개발과 공부를 기록하는 공간
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <Link to="/coding-test" className="minimal-card">
                <h3>Algorithms</h3>
                <p>알고리즘 학습 기록</p>
              </Link>

              <Link to="/project-remind" className="minimal-card">
                <h3>Projects</h3>
                <p>프로젝트 및 팀원들과의 협업 기록</p>
              </Link>

              <Link to="/core-javascript" className="minimal-card">
                <h3>Study</h3>
                <p>각종 스터디 기록</p>
              </Link>
            </div>

            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--ifm-color-emphasis-200)',
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
            }}>
              <a
                href="https://github.com/junye0l"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  color: 'var(--ifm-font-color-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-font-color-secondary)';
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ display: 'block' }}
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/%EC%A4%80%EC%97%B4-%EA%B9%80-173512366/?trk=opento_sprofile_goalscard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  color: 'var(--ifm-font-color-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-font-color-secondary)';
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ display: 'block' }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="mailto:junye0l@gmail.com"
                aria-label="Email"
                style={{
                  color: 'var(--ifm-font-color-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-font-color-secondary)';
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ display: 'block' }}
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
