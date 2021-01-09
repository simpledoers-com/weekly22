import React from 'react';
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

test('renders Users', () => {
    const users =  [
        {id: 3, name: 'Maximiliano', email: 'maximilianou@gmail.com', website: 'https://github.com/maximilianou', 
        address: { street: 'Roca', suite: 'D', city: 'Buenos Aires', geo: { lat: '-33', lng: '44'}}},
        {id: 5, name: 'Joaquin', email: 'jou@gmail.com', website: 'https://github.com/joaquin', 
        address: { street: '', suite: '', city: '', geo: { lat: '3', lng: '4'}}},
        {id: 7, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
        address: { street: '', suite: '', city: '', geo: { lat: '1', lng: '2'}}},
//        {id: '13', name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
//        {id: 15, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
    ]; 
    render(<Users users={users} />);
    const elemMax = screen.getAllByText(/Maximiliano/g);
    expect(elemMax[0]).toBeInTheDocument();
    const elemJoa = screen.getAllByText(/Joaquin/g);
    expect(elemJoa[0]).toBeInTheDocument();
    const elemJul = screen.getAllByText(/Julian/g);
    expect(elemJul[0]).toBeInTheDocument();
});
