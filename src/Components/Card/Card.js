import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styles from './styles.module.css';

function CardComponent(props) {
  const {
    thumb,
    title,
    datatestRecipeCard,
    datatestCardImage,
    datatestCardName,
    onClick,
    category,
    hidden,
  } = props;
  return (
    <Card
      style={ { width: '10rem' } }
      onClick={ () => { onClick(); } }
      aria-hidden="true"
      className={ styles.Card }
      data-testid={ datatestRecipeCard }
    >
      <Card.Img
        variant="top"
        src={ thumb }
        data-testid={ datatestCardImage }
        alt={ title }
      />
      <Card.Body>
        <Card.Text>
          <span hidden={ hidden }>{category}</span>
        </Card.Text>

        <Card.Title
          className={ styles.card_title }
          data-testid={ datatestCardName }
        >
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
CardComponent.defaultProps = {
  datatestCardImage: '',
  datatestCardName: '',
  datatestRecipeCard: '',
  thumb: '',
  title: '',
  onClick: () => {},
  category: '',
  hidden: true,
};

CardComponent.propTypes = {
  datatestCardImage: PropTypes.string,
  datatestCardName: PropTypes.string,
  datatestRecipeCard: PropTypes.string,
  thumb: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  category: PropTypes.string,
  hidden: PropTypes.bool,
};
export default CardComponent;
