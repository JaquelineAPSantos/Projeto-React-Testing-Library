import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente <Pokedex.js>', () => {
  test('Teste se página contém um heading h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button',
      { name: /Próximo Pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();

    pokemons.forEach((element) => {
      const namePokemon = screen.getByText(element.name);
      const typePokemon = screen.getAllByText(element.type);
      expect(namePokemon).toBeInTheDocument();
      expect(typePokemon[0]).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(btnNextPokemon);
    const pokemonId = screen.getByTestId('pokemon-name');
    expect(pokemonId).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const seven = 7;
    const btnFilterPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilterPokemon).toHaveLength(seven);
    btnFilterPokemon.forEach((elementBtn) => {
      expect(elementBtn).toBeInTheDocument();
    });
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    const typePokemon = pokemons.map((pokemon) => pokemon.type);
    typePokemon.forEach((button) => {
      const typeBtn = screen.getByRole('button', { name: button });
      expect(typeBtn).toBeInTheDocument();
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAllReset = screen.getByRole('button', { name: /all/i });
    expect(btnAllReset).toBeInTheDocument();
    userEvent.click(btnAllReset);
  });
});
