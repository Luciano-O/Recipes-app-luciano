import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import Button from '../../Components/Button/Button';

function Explore() {
  const history = useHistory();

  function handleClick(type) {
    history.push(`/explore/${type}`);
  }
  return (
    <div>
      <Header title="Explore" searchBtnExists />
      <Button
        dataTest="explore-foods"
        onClick={ () => handleClick('foods') }
        name="explore-foods-btn"
        className="none"
        text="Explore Foods"
        disabled={ false }
      />
      <Button
        dataTest="explore-drinks"
        onClick={ () => handleClick('drinks') }
        name="explore-drinks-btn"
        className="none"
        text="Explore Drinks"
        disabled={ false }
      />
      <FooterMenu />
    </div>
  );
}

export default Explore;
