import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import Button from '../../Components/Button/Button';

function ExploreDetails({ match }) {
  const pageTitle = match.params.type;
  const nationalityBtn = (<Button
    dataTest="explore-by-nationality"
    onClick={ () => {} }
    name="explore-by-nationality-btn"
    className="none"
    text="By Nationality"
    disabled={ false }
  />);
  return (
    <div>
      <Header
        title={ `Explore ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}` }
        searchBtnExists
      />
      <Button
        dataTest="explore-by-ingredient"
        onClick={ () => {} }
        name="explore-by-ingredient-btn"
        className="none"
        text="By Ingredient"
        disabled={ false }
      />
      { pageTitle === 'foods' ? nationalityBtn : null }
      <Button
        dataTest="explore-surprise"
        onClick={ () => {} }
        name="explore-surprise-btn"
        className="none"
        text="Surprise Me!"
        disabled={ false }
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
