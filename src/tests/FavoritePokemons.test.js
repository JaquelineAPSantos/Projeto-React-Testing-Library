import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testando o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const error = screen.getByText(/No favorite pokemon found/i);
    expect(error).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
  });
});
