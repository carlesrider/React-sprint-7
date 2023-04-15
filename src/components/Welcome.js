import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Benvingut/da a la nostra web</h1>
      <p>Aquí podràs calcular facilment el pressupost per al teu nou projecte de transformació digital</p>
      <Link to="/budget">Iniciar pressupost</Link>
    </div>
  );
}

export default Welcome;
