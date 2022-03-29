import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import styles from './styles.module.css';
import Search from '../Search/Search';

function Header(props) {
  const history = useHistory();
  const [isSearchInputVisible, toggleIsSearchInputVisable] = useState(false);

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
      onClick={ () => { toggleIsSearchInputVisable(!isSearchInputVisible); } }
      src={ searchIcon }
      alt="search-icon"
    >
      <img src={ searchIcon } alt="search-icon" />
    </button>
  );
  return (
    <>
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
      <div>{isSearchInputVisible && <Search props={ { ...props } } />}</div>
    </>
  );
}
Header.defaultProps = {
  searchBtnExists: false,
};

Header.propTypes = {
  searchBtnExists: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
