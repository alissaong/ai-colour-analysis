import React, { useEffect } from 'react';

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    // Check if script is already added
    const existingEmbedScript = document.querySelector('script[src="https://alissaong.disqus.com/embed.js"]');
    if (!existingEmbedScript) {
      const script = document.createElement('script');
      script.src = 'https://alissaong.disqus.com/embed.js';
      script.setAttribute('data-timestamp', (+new Date()).toString());
      script.async = true;
      (document.head || document.body).appendChild(script);
    } else if ((window as any).DISQUS) {
      // If Disqus is already loaded, reset it to reload the thread
      (window as any).DISQUS.reset({
        reload: true,
      });
    }

    // Add count.js script if not present
    const existingCountScript = document.getElementById('dsq-count-scr');
    if (!existingCountScript) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//alissaong.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, []);

  return (
    <section className="w-full bg-white border-t border-[#e7eeff] py-12 px-6 mt-16">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-extrabold text-[#111c2d] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7c3aed]">forum</span>
          Community Discussion &amp; Feedback
        </h3>
        
        {/* Disqus Embed Container */}
        <div id="disqus_thread" className="min-h-[200px]" />

        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" rel="nofollow">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </section>
  );
};
