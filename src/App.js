import React from 'react';
import { useState} from 'react';
import Checkbox from './components/Checkbox/Checkbox';

function App() {
  const [web, setWebPage] = useState(false);
  const [seo, setSeo] = useState(false);
  const [ads, setAdvertising] = useState(false);
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

  React.useEffect(() => {
    calculateTotalPrice();
  }, [web, seo, ads]);

  const calculateTotalPrice = () => {
    let total = 0;
    if (web) {
      total += 500;
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
      <Checkbox name="seo" text="Una consultoria SEO (300€)" checked={seo} onChange={handleCheckboxChange}/>
      <Checkbox name="ads" text="Una campanya de Google Ads (200€)" checked={ads} onChange={handleCheckboxChange}/>
      <p>Preu: {preuTotal}€</p>
    </div>
  );
}

export default App;
