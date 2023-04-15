import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Welcome from './components/Welcome';
import Budget from './components/Budget';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome/>}></Route>
            <Route path='/budget' element={<Budget/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
