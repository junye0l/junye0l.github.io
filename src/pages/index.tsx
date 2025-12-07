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

            <nav style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '4rem',
              borderBottom: '1px solid var(--ifm-color-emphasis-200)',
            }}>
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
              <Link to="/blog/tags" className="nav-link">
                Tags
              </Link>
            </nav>

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
          </div>
        </div>
      </main>
    </Layout>
  );
}
