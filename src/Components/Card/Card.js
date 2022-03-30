import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function Card(props) {
  const { thumb, title, datatestRecipeCard, datatestCardImage, datatestCardName } = props;
  return (
    <div className={ styles.Card } data-testid={ datatestRecipeCard }>
      <img
        src={ thumb }
        data-testid={ datatestCardImage }
        alt={ title }
      />
      <h3 data-testid={ datatestCardName }>{ title }</h3>
    </div>
  );
}

Card.defaultProps = {
  datatestCardImage: '',
  datatestCardName: '',
  datatestRecipeCard: '',
  thumb: '',
  title: '',
};

Card.propTypes = {
  datatestCardImage: PropTypes.string,
  datatestCardName: PropTypes.string,
  datatestRecipeCard: PropTypes.string,
  thumb: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
