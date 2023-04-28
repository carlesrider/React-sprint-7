import React, { useState, useEffect } from 'react';

import Checkbox from './Checkbox/Checkbox';
import styled from 'styled-components';
import HelpPopup from './HelpPopup';

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

function Budget() {
  const [web, setWeb] = useState(false);
  const [seo, setSeo] = useState(false);
  const [ads, setAds] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);
  const [preuTotal, setPreuTotal] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [client, setClient] = useState('');
  const [budgetList, setBudgetList] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case 'web':
        setWeb(checked);
        break;
      case 'seo':
        setSeo(checked);
        break;
      case 'ads':
        setAds(checked);
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

  useEffect(() => {
    const storedWeb = localStorage.getItem('web');
    const storedSeo = localStorage.getItem('seo');
    const storedAds = localStorage.getItem('ads');
    const storedNumPages = localStorage.getItem('numPages');
    const storedNumLanguages = localStorage.getItem('numLanguages');

    if (storedWeb) {
      setWeb(storedWeb === 'true');
    }
    if (storedSeo) {
      setSeo(storedSeo === 'true');
    }
    if (storedAds) {
      setAds(storedAds === 'true');
    }
    if (storedNumPages) {
      setNumPages(parseInt(storedNumPages));
    }
    if (storedNumLanguages) {
      setNumLanguages(parseInt(storedNumLanguages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('web', web);
  }, [web]);

  useEffect(() => {
    localStorage.setItem('numPages', numPages);
  }, [numPages]);

  useEffect(() => {
    localStorage.setItem('numLanguages', numLanguages);
  }, [numLanguages]);

  useEffect(() => {
    calculateTotalPrice();
  }, [web, seo, ads, numPages, numLanguages]);

  useEffect(() => {
    const savedBudgetList = JSON.parse(localStorage.getItem('budgetList')) || [];
    setBudgetList(savedBudgetList);
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetList', JSON.stringify(budgetList));
  }, [budgetList]);

  const handleAddBudget = () => {
    const newBudget = {
      name: budgetName,
      client: client,
      web: web,
      seo: seo,
      ads: ads,
      numPages: numPages,
      numLanguages: numLanguages,
      preuTotal: preuTotal,
      date: new Date(),
    };
    setBudgetList([...budgetList, newBudget]);
    setBudgetName('');
    setClient('');
    setNumPages(1);
    setNumLanguages(1);
    setWeb(false);
    setSeo(false);
    setAds(false);
    setPreuTotal(0);
  };

  return (
    <div className="App">
      <div className='left-col'>
      <h3>Crear pressupost</h3>
      <label>
        Nom de pressupost: <input type="text" name="budgetName" value={budgetName} onChange={e => setBudgetName(e.target.value)} />
      </label>
      <label>
        Client: <input type="text" name="client" value={client} onChange={e => setClient(e.target.value)} />
      </label>
        
      <Checkbox name="web" text="Una pàgina web (500€)" checked={web} onChange={handleCheckboxChange}/>
      <Panel visible={web}>
        <QuantityInput>
          <label htmlFor="numPages">Nombre de pàgines:</label>
          <QuantityButton onClick={handleNumPagesIncrement}>+</QuantityButton>
          <QuantityTextbox type="number" id="numPages" name="numPages" value={numPages} onChange={handleNumPagesChange} />
          <QuantityButton onClick={handleNumPagesDecrement}>-</QuantityButton>
          <HelpPopup 
            text="Aquí pots indicar el número de págines totals que tindrà la teva web en cada idioma"
            currentText="Ara mateix has seleccionat"
            element="pàgines"
            items={numPages} 
            onClose={() => setShowHelp(false)} />
        </QuantityInput>
        <QuantityInput>
          <label htmlFor="numLanguages">Nombre d'idiomes:</label>
          <QuantityButton onClick={handleNumLanguagesIncrement}>+</QuantityButton>
          <QuantityTextbox type="number" id="numLanguages" name="numLanguages" value={numLanguages} onChange={handleNumLanguagesChange} />
          <QuantityButton onClick={handleNumLanguagesDecrement}>-</QuantityButton>
          <HelpPopup 
            text="Aquí pots indicar el número d'idiomes que tindrà la teva web"
            currentText="Ara mateix has seleccionat"
            element="idiomes"
            items={numLanguages} 
            onClose={() => setShowHelp(false)} />
        </QuantityInput>
      </Panel>
      <Checkbox name="seo" text="Una consultoria SEO (300€)" checked={seo} onChange={handleCheckboxChange}/>
      <Checkbox name="ads" text="Una campanya de Google Ads (200€)" checked={ads} onChange={handleCheckboxChange}/>
      <p>Preu: {preuTotal}€</p>
      {preuTotal > 0 && budgetName && client && (
        <button onClick={handleAddBudget} >Afegir pressupost</button>
      )}
      </div>
      {budgetList.length > 0 && (
        <div className='right-col'>
          <h3>Pressupostos guardats</h3>
          <ol>
            {budgetList.map((budget) => (
              <li key={budget.date.toString()}>
                <h3>Pressupost: {budget.name} a nom de {budget.client}</h3>
                <p>Data: {budget.date.toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
</p>
                {budget.web && (
                <p><strong>Pàgina Web</strong><br/>
                  Número de págines: {budget.numPages}<br/>
                  Número d'idiomes: {budget.numLanguages}
                </p>
                )}
                {budget.seo && (
                <p><strong>Consultoria SEO</strong></p>
                )}
                {budget.ads && (
                <p><strong>Campanya Gogole Ads</strong></p>
                )}
                <h3>Preu total: {budget.preuTotal}€</h3>
              </li>
            ))}
          </ol>
        </div>
      )}
      

    </div>
  );
}

export default Budget;
