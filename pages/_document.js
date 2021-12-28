import Document, { Html, Head, Main, NextScript } from "next/document";
import { MEASUREMENT_ID } from "@config/index";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          /> */}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <link rel="preconnect" href="https://fonts.googleapis.com/" />
          <link rel="preconnect" href="https://fonts.gstatic.com/" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="my-element"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
