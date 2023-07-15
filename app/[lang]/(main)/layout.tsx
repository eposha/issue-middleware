import Test from './Test';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Test />
        {children}
      </body>
    </html>
  );
}
