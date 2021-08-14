import { FAV_ICON } from "@utils/constants";
import { GA_TRACKING_ID } from "@utils/gtag";

const HeadContent = () => (
  <>
    <script src="//use.typekit.net/gqm2kup.js"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `try{Typekit.load({ async: true });}catch(e){}`,
      }}
    />
    <link
      rel="shortcut icon"
      sizes="16x16 24x24 32x32 48x48 64x64"
      href="/favicon.ico"
    />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="57x57" href={`${FAV_ICON}&w=57&h=57`} />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="57x57"
      href={`${FAV_ICON}&w=57&h=57`}
    />
    <link rel="apple-touch-icon" sizes="72x72" href={`${FAV_ICON}&w=72&h=72`} />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href={`${FAV_ICON}&w=114&h=114`}
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href={`${FAV_ICON}&w=120h=120`}
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href={`${FAV_ICON}&w=144&h=144`}
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href={`${FAV_ICON}&w=152&h=152`}
    />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
      }}
    />
  </>
);

export default HeadContent;
