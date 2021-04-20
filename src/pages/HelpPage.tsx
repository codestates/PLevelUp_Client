import React from 'react';
import HelpContainer from '../components/help/HelpContainer';
import { withRouter } from 'react-router-dom';
export default withRouter(function HelpPage({ match }) {
  // const category = match.params.category || 'Club';

  return (
    <>
      <HelpContainer />
    </>
  );
});
