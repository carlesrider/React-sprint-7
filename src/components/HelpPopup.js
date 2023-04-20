import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-component per al panell d'ajust de pàgines i idiomes
const Popup = styled.div`
    a {
        cursor: pointer;
        color: #555;
        transition: all 0.2s ease-in-out;
        &:hover {
            color: #000;
        }
    }
  .popup-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .popup-content {
        background-color: #fff;
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        right: 2rem;
        border: 2px solid #000;
        border-radius: 10px;
        padding: 2rem;
        z-index: 10;
        button {
            cursor: pointer;
        }
    }
    .popup-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        cursor: pointer;
        z-index: 1;
    }
  }
`;

function HelpPopup({ items, text, element }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popup>
      <a onClick={togglePopup}><i class = "material-icons">info</i></a>
      {isOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <p>{text}</p>
            <p>Ara mateix has seleccionat: {items} {element}</p>
            <button onClick={togglePopup}>Tancar</button>
          </div>
          <div className="popup-bg" onClick={togglePopup}></div>
        </div>
      )}
    </Popup>
  );
}

export default HelpPopup;
