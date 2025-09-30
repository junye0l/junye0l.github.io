import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({x: e.clientX, y: e.clientY});
    };

    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      setIsDark(htmlElement.getAttribute('data-theme') === 'dark');
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const glowSize = 250;
  
  const bgGradient = isDark 
    ? 'linear-gradient(135deg, #0a5f56 0%, #1a7a4f 100%)' 
    : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="준열의 개발 블로그">
      <main style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: bgGradient,
        transition: 'background 0.3s ease',
      }}>
        <div
          style={{
            position: 'fixed',
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 40%, transparent 70%)',
            pointerEvents: 'none',
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: `translate(-50%, -50%)`,
            transition: 'left 0.1s ease-out, top 0.1s ease-out',
            filter: 'blur(30px)',
            zIndex: 10,
          }}
        />

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              borderRadius: '50%',
              border: `3px solid rgba(255,255,255,${isDark ? 0.2 : 0.3})`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: `0 0 20px rgba(255,255,255,${isDark ? 0.1 : 0.2})`,
            }}
          />
        ))}

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 200%;
            }
          }

          .hero-content {
            animation: fadeInUp 1s ease-out;
          }

          .card {
            position: relative;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 100%
            );
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            overflow: hidden;
          }

          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            transform: skewX(-25deg);
            animation: shine 3s infinite;
          }

          .card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
          }

          .card:hover::before {
            animation: shine 1s infinite;
          }

          .card:hover::after {
            opacity: 1;
          }

          .btn-primary {
            background: white;
            color: #11998e;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            color: #11998e;
          }
        `}</style>

        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          opacity: isVisible ? 1 : 0,
        }}>
          <div className="hero-content" style={{
            textAlign: 'center',
            color: 'white',
          }}>
            <Heading as="h1" style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              marginBottom: '1rem',
              fontWeight: 'bold',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              {siteConfig.title}
            </Heading>
            
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 'semibold',
              margin: '2rem 0 3rem',
              opacity: 0.9,
              animation: 'fadeInUp 1s ease-out 0.6s both',
            }}>
              개발과 공부를 기록하는 공간입니다
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'fadeInUp 1s ease-out 0.9s both',
            }}>
              <Link to="/blog" className="btn-primary">
                Blog
              </Link>
              <Link to="/blog/tags" className="btn-primary">
                Tags
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '4rem',
              animation: 'fadeInUp 1s ease-out 1.2s both',
            }}>
              <Link to="/coding-test" className="card" style={{textDecoration: 'none', color: 'white'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1}}>📚</div>
                <h3 style={{fontSize: '2rem', marginBottom: '0.5rem', position: 'relative', zIndex: 1}}>Algorithms</h3>
                <p style={{fontSize: '1rem', fontWeight: 'semibold', opacity: 0.8, position: 'relative', zIndex: 1}}>알고리즘 학습 기록</p>
              </Link>

              <Link to="/daily-mission" className="card" style={{textDecoration: 'none', color: 'white'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1}}>🚀</div>
                <h3 style={{fontSize: '2rem', marginBottom: '0.5rem', position: 'relative', zIndex: 1}}>Team Mission</h3>
                <p style={{fontSize: '1rem', fontWeight: 'semibold', opacity: 0.8, position: 'relative', zIndex: 1}}>프로젝트 및 팀원들과의 협업 기록</p>
              </Link>

              <Link to="/core-javascript" className="card" style={{textDecoration: 'none', color: 'white'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1}}>💡</div>
                <h3 style={{fontSize: '2rem', marginBottom: '0.5rem', position: 'relative', zIndex: 1}}>Study</h3>
                <p style={{fontSize: '1rem', fontWeight: 'semibold', opacity: 0.8, position: 'relative', zIndex: 1}}>각종 스터디 기록</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
