import React from 'react';
import MenuCard from './../MenuCard/MenuCard.component';
import './DayMenuCard.styles.scss';

const DayMenuCard = ({ dayMenu }) => {
  const { price, menus = [], title = 'Day Menu' } = dayMenu;

  return (
    <div className="day-menu-card">
      <div className="menu-container">
        {menus.map((menu) => (
          <MenuCard key={menu._id} menu={menu} />
        ))}
      </div>
      <div className="content">
        <p>{title}</p>
        <p>Price: {price}</p>
      </div>
    </div>
  );
};

export default DayMenuCard;
