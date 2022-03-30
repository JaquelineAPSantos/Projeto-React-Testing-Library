import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokemon.js>', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const textPokemon = screen.getByText(/average weight: 6.0 kg/i);
    const imagePokemon = screen.getByAltText(/Pikachu sprite/i);
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toBeInTheDocument();
    expect(textPokemon).toBeInTheDocument();
  });
  test('Teste se o card contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const heading = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(heading).toBeInTheDocument();
    Object.assign(global.location, { host: 'http://localhost:3000', pathname: 'pokemons/25' });
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const linkFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(linkFavorite);
    const linkImage = screen.getByAltText(/is marked as favorite/i);
    expect(linkImage.src).toContain('/star-icon.svg');
  });
});
