import React, { Fragment } from 'react';
import GlobalStyles from './styles/Global';
import DishForm from './components/DishForm';

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <DishForm />;
    </Fragment>
  );
};
export default App;
