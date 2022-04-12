import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import ButtonComponent from '../../Components/Button/Button';
import styles from './styles.module.css';

function Explore() {
  const history = useHistory();

  function handleClick(type) {
    history.push(`/explore/${type}`);
  }

  return (
    <div className={ styles.ExplorePage }>
      <Header title="Explore" searchBtnExists />
      <div className={ styles.ExploreButtons }>
        <ButtonComponent
          dataTest="explore-foods"
          onClick={ () => handleClick('foods') }
          name="explore-foods-btn"
          className="none"
          text="Explore Foods"
          disabled={ false }
        />
        <ButtonComponent
          dataTest="explore-drinks"
          onClick={ () => handleClick('drinks') }
          name="explore-drinks-btn"
          className="none"
          text="Explore Drinks"
          disabled={ false }
        />
      </div>
      <FooterMenu />
    </div>
  );
}

export default Explore;
