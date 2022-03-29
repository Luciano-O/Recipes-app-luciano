import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import styles from './styles.module.css';

function Header(props) {
  const history = useHistory();

  function handleClick() {
    history.push('/profile');
  }

  const { title, searchBtnExists } = props;
  const searchButton = (
    <button
      type="button"
      className={ styles.headerBtn }
      text="Search"
      name="search-btn"
      data-testid="search-top-btn"
      onClick={ () => {} }
      src={ searchIcon }
      alt="search-icon"
    >
      <img src={ searchIcon } alt="search-icon" />
    </button>
  );
  return (
    <div className={ styles.header_container }>
      <button
        type="button"
        className={ styles.headerBtn }
        text="Profile"
        name="profile-btn"
        data-testid="profile-top-btn"
        onClick={ () => handleClick() }
        src={ profileIcon }
        alt="profile-icon"
      >
        <img src={ profileIcon } alt="profile-icon" />
      </button>
      <h1 data-testid="page-title">
        {' '}
        {title}
        {' '}
      </h1>
      {!searchBtnExists
      && searchButton}
    </div>
  );
}

Header.propTypes = {
  searchBtnExists: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  props: PropTypes.shape({}).isRequired,
};

export default Header;
