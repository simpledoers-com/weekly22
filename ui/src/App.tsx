import React from 'react';
import { AppProps } from './types';
import { Users } from './users/Users';


function App({ logo }: AppProps){
//  const urgency = 3;
//  const dr = 'Martin';
//  const spec = 'Therapy';
//  ...
//<section>
//  <AppointmentDraft emergency={urgency} name={dr} specialist={spec}></AppointmentDraft>
//</section>

const users =  [
  {id: 3, name: 'Maximiliano', email: 'maximilianou@gmail.com', website: 'https://github.com/maximilianou', 
  address: { street: 'Roca', suite: 'D', city: 'Buenos Aires', geo: { lat: '-33', lng: '44'}}},
  {id: 5, name: 'Joaquin', email: 'jou@gmail.com', website: 'https://github.com/joaquin', 
  address: { street: '', suite: '', city: '', geo: { lat: '3', lng: '4'}}},
  {id: 7, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
  address: { street: '', suite: '', city: '', geo: { lat: '1', lng: '2'}}},
]; 


  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        Carrot Header
        <img src={logo} alt="logo" />
      </header>
      <section>
        <Users users={users} />
      </section>
      <footer>
        <img src={logo} alt="logo" />
        Carrot Footer
        <img src={logo} alt="logo" />
      </footer>
    </div>
  );
}

export default App;
