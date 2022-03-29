import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js>', () => {
  test('Teste se página contém um heading h2', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
