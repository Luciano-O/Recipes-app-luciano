import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import ButtonComponent from '../../Components/Button/Button';
import { getEmail } from '../../Helpers/localStorageSaves';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify('teste@trybe.com'));
    }

    setEmail(getEmail().email);
  });

  function handleNavigation(path) {
    history.push(path);

    if (path === '/') {
      localStorage.clear();
    }
  }

  return (
    <div className={ styles.ProfilePage }>
      <Header title="Profile" searchBtnExists />

      <div className={ styles.ProfileContainer }>
        <h1 data-testid="profile-email">{ email }</h1>

        <div className={ styles.ProfileButtons }>
          <ButtonComponent
            className="styles.testButton"
            text="Done Recipes"
            name="done"
            dataTest="profile-done-btn"
            onClick={ () => handleNavigation('/done-recipes') }
          />

          <ButtonComponent
            className="styles.testButton"
            text="Favorite Recipes"
            name="favorite"
            dataTest="profile-favorite-btn"
            onClick={ () => handleNavigation('/favorite-recipes') }
          />

          <ButtonComponent
            className="styles.testButton"
            text="Logout"
            name="logout"
            dataTest="profile-logout-btn"
            onClick={ () => handleNavigation('/') }
          />
        </div>
      </div>
      <FooterMenu />
    </div>
  );
}

export default Profile;
