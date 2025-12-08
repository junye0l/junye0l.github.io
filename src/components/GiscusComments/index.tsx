import React, {useEffect, useRef} from 'react';
import {useColorMode} from '@docusaurus/theme-common';

export default function GiscusComments(): React.ReactElement {
  const {colorMode} = useColorMode();
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'junye0l/junye0l.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOPyFUow');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOPyFUo84Czign');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', colorMode === 'dark' ? 'noborder_dark' : 'noborder_light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    giscusRef.current.appendChild(script);

    return () => {
      if (giscusRef.current) {
        giscusRef.current.innerHTML = '';
      }
    };
  }, [colorMode]);

  return <div ref={giscusRef} />;
}
