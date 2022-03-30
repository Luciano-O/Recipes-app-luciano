import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import Button from '../../Components/Button/Button';
import { getEmail } from '../../Helpers/localStorageSaves';

function Profile() {
  const history = useHistory();
  const { email } = getEmail();

  function handleNavigation(path) {
    history.push(path);

    if (path === '/') {
      localStorage.clear();
    }
  }

  return (
    <div>
      <Header title="Profile" searchBtnExists />

      <div className={ styles.container_profile }>
        <h1 data-testid="profile-email">{ email }</h1>

        <Button
          className="styles.testButton"
          text="Done Recipes"
          name="done"
          dataTest="profile-done-btn"
          onClick={ () => handleNavigation('/done-recipes') }
        />

        <Button
          className="styles.testButton"
          text="Favorite Recipes"
          name="favorite"
          dataTest="profile-favorite-btn"
          onClick={ () => handleNavigation('/favorite-recipes') }
        />

        <Button
          className="styles.testButton"
          text="Logout"
          name="logout"
          dataTest="profile-logout-btn"
          onClick={ () => handleNavigation('/') }
        />
      </div>
      <FooterMenu />
    </div>
  );
}

export default Profile;
