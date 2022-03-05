import React from 'react';
import Document, { Html, Head, Main, DocumentInitialProps, DocumentContext, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

class CustomDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          resetServerContext();
          return <App {...props} />;
        },
      });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="pl">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
