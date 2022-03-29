import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';

function ExploreDetails({ match }) {
  const pageTitle = match.params.type;
  return (
    <div>
      <Header
        title={ `Explore ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}` }
        searchBtnExists
      />
      <FooterMenu />
    </div>
  );
}

ExploreDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ExploreDetails;

// REFERENCIAS:
// TRANSFORMAR PRIMEIRA LETRA DA STRING EM UPPERCASE: https://flexiple.com/javascript-capitalize-first-letter/
