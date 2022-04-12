import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <Button
      variant="none"
      type="button"
      text="Search"
      name="search-btn"
      data-testid="search-top-btn"
      onClick={ () => { toggleIsSearchInputVisable(!isSearchInputVisible); } }
      src={ searchIcon }
    >
      <FontAwesomeIcon icon={ faMagnifyingGlass } />
    </Button>
  );
  return (
    <header className={ styles.header_body }>
      <div className={ styles.header_container }>
        <Button
          variant="none"
          type="button"
          className={ styles.headerBtn }
          text="Profile"
          name="profile-btn"
          data-testid="profile-top-btn"
          onClick={ () => handleClick() }
          src={ profileIcon }
          alt="profile-icon"
        >
          <FontAwesomeIcon icon={ faUser } />
        </Button>
        <h1
          data-testid="page-title"
          className={ styles.headerTitle }
        >
          {' '}
          {title}
          {' '}
        </h1>
        {!searchBtnExists
          ? searchButton
          : (
            <Button
              variant="none"
              type="button"
              className={ styles.headerBtn }
              text="Profile"
              name="profile-btn"
              data-testid="profile-top-btn"
              onClick={ () => handleClick() }
              src={ profileIcon }
              alt="profile-icon"
              disabled
            />)}
      </div>
      <div>{isSearchInputVisible && <Search props={ { ...props } } />}</div>
    </header>
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
