const HeadContent = (): JSX.Element => {
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
    </>
  );
};

export default HeadContent;
