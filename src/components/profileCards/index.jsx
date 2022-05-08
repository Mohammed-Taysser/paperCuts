import React from 'react';
import ProfileCardWrapper from '../ProfileCardWrapper';

const SettingsCol = (props) => {
  const { CARDS_DATA, isLoading, isSaved } = props;

  return (
    <>
      {CARDS_DATA.map((card, index) => {
        return (
          <ProfileCardWrapper
            card={card}
            key={index}
            isLoading={isLoading[card.key]}
            isSaved={isSaved[card.key]}
          />
        );
      })}
    </>
  );
};

export default SettingsCol;
