import { Helmet, HelmetProvider } from "react-helmet-async";
const Helmets = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
};

export default Helmets;
