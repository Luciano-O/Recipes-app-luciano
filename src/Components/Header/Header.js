import React from 'react';
import Button from '../Button/Button';

function Header() {
  return (
    <div>
      <Button
        className="styles.headerBtn"
        text="Search"
        name="profile-btn"
        data-testid="profile-top-btn"
        onClick={ () => {} }
      />
      <h1 data-testid="page-title"> Foods </h1>
      <Button
        className="styles.headerBtn"
        text="Search"
        name="search-btn"
        data-testid="search-top-btn"
        onClick={ () => {} }
      />
    </div>
  );
}

export default Header;
