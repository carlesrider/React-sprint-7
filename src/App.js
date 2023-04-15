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
        <div>
          <label htmlFor="numPages">Nombre de pàgines:</label>
          <input type="number" id="numPages" name="numPages" value={numPages} onChange={handleNumPagesChange} min="1"/>
        </div>
        <div>
          <label htmlFor="numLanguages">Nombre d'idiomes:</label>
          <input type="number" id="numLanguages" name="numLanguages" value={numLanguages} onChange={handleNumLanguagesChange} min="1" />
        </div>
      </Panel>
      <Checkbox name="seo" text="Una consultoria SEO (300€)" checked={seo} onChange={handleCheckboxChange}/>
      <Checkbox name="ads" text="Una campanya de Google Ads (200€)" checked={ads} onChange={handleCheckboxChange}/>
      <p>Preu: {preuTotal}€</p>
    </div>
  );
}

export default App;
