import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <App.js>', () => {
  test('O link home foi renderizado', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });
  test('O link about foi renderizado', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });
  test('O link Favorite Pokémons foi renderizado', () => {
    renderWithRouter(<App />);
    const linkFfavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFfavorite).toBeInTheDocument();
  });
});
