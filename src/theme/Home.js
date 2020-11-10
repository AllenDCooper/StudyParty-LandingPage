import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, {useState } from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';

function Index() {

  const [show, setShow] = useState(1);

  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero show={show} setShow={setShow} />
      <ProductValues />
      {/* <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA /> */}
      <ProductSmokingHero show={show} setShow={setShow} />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);