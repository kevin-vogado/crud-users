import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('User Registration System', () => {

  test('should create a new user and add it to the table', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Cadastrar Usuário'));

    fireEvent.change(screen.getByPlaceholderText('Nome do usuário'), { target: { value: 'John Doe' } });

    fireEvent.change(screen.getByLabelText('Data de Nascimento', { selector: 'input' }), { target: { value: '1990-01-01' } });

    fireEvent.change(screen.getByPlaceholderText('(xx)xxxxxxxx'), { target: { value: '(12)34567890' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail do usuário'), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByText('Salvar'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('(12)34567890')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

});
