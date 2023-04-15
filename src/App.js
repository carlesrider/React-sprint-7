import React from 'react';
import { useState} from 'react';
import Checkbox from './components/Checkbox/Checkbox';
import styled from 'styled-components';

// Styled-component per al panell d'ajust de pàgines i idiomes
const Panel = styled.div`
  display: ${props => props.visible ? 'inline-block' : 'none'};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
`;

// Styled-component per al component fet a mida amb botons d'incrementar i decrementar
const QuantityInput = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 0px;
  margin: 5px;
  background-color: darkorange;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 2rem;
  line-height: 1;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const QuantityTextbox = styled.input`
  width: 40px;
  height: 2rem;
  border: none;
  text-align: center;
`;

function App() {
  const [web, setWebPage] = useState(false);
  const [seo, setSeo] = useState(false);
  const [ads, setAdvertising] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);
  const [preuTotal, setPreuTotal] = useState(0);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case 'web':
        setWebPage(checked);
        break;
      case 'seo':
        setSeo(checked);
        break;
      case 'ads':
        setAdvertising(checked);
        break;
      default:
        break;
    }
  }

  const handleNumPagesChange = (event) => {
    setNumPages(parseInt(event.target.value));
  }

  const handleNumLanguagesChange = (event) => {
    setNumLanguages(parseInt(event.target.value));
  }

  const handleNumPagesIncrement = () => {
    setNumPages(numPages + 1);
  }

  const handleNumPagesDecrement = () => {
    if (numPages > 1) {
      setNumPages(numPages - 1);
    }
  }

  const handleNumLanguagesIncrement = () => {
    setNumLanguages(numLanguages + 1);
  }

  const handleNumLanguagesDecrement = () => {
    if (numLanguages > 1) {
      setNumLanguages(numLanguages - 1);
    }
  }

  React.useEffect(() => {
    calculateTotalPrice();
  }, [web, seo, ads, numPages, numLanguages]);

  const calculateTotalPrice = () => {
    let total = 0;
    if (web) {
      total += 500;
      total += numPages * numLanguages * 30;
    }
    if (seo) {
      total += 300;
    }
    if (ads) {
      total += 200;
    }
    setPreuTotal(total);
  }

  return (
    <div className="App">
      <p>Què vols fer?</p>
      <Checkbox name="web" text="Una pàgina web (500€)" checked={web} onChange={handleCheckboxChange}/>
      <Panel visible={web}>
        <QuantityInput>
          <label htmlFor="numPages">Nombre de pàgines:</label>
          <QuantityButton onClick={handleNumPagesIncrement}>+</QuantityButton>
          <QuantityTextbox type="number" id="numPages" name="numPages" value={numPages} onChange={handleNumPagesChange} />
          <QuantityButton onClick={handleNumPagesDecrement}>-</QuantityButton>
        </QuantityInput>
        <QuantityInput>
          <label htmlFor="numLanguages">Nombre d'idiomes:</label>
          <QuantityButton onClick={handleNumLanguagesIncrement}>+</QuantityButton>
          <QuantityTextbox type="number" id="numLanguages" name="numLanguages" value={numLanguages} onChange={handleNumLanguagesChange} />
          <QuantityButton onClick={handleNumLanguagesDecrement}>-</QuantityButton>
        </QuantityInput>
      </Panel>
      <Checkbox name="seo" text="Una consultoria SEO (300€)" checked={seo} onChange={handleCheckboxChange}/>
      <Checkbox name="ads" text="Una campanya de Google Ads (200€)" checked={ads} onChange={handleCheckboxChange}/>
      <p>Preu: {preuTotal}€</p>
    </div>
  );
}

export default App;
