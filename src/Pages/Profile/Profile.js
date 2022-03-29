import React from 'react';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';

function Profile() {
  return (
    <div>
      <Header title="Profile" searchBtnExists />
      <FooterMenu />
    </div>
  );
}

export default Profile;
