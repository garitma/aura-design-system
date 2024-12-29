import Script from "next/script";

const HeadContent = () => {
  return (
    <>
      <link
        rel="shortcut icon"
        sizes="16x16 24x24 32x32 48x48 64x64"
        href="/favicon.ico"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: ` (function(d) {
                var config = {
                  kitId: 'ybc4cml',
                  scriptTimeout: 3000,
                  async: true
                },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
              })(document);`,
        }}
      />
    </>
  );
};

export default HeadContent;
