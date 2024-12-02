import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm.js';

test('should show validation errors if required fields are empty', () => {
  const handleSave = jest.fn();
  const handleClose = jest.fn();

  render(<UserForm onSave={handleSave} onClose={handleClose} />);
  fireEvent.click(screen.getByText('Salvar'));

  expect(screen.getByText('O nome é obrigatório')).toBeInTheDocument();
  expect(
    screen.getByText('A data de nascimento é obrigatória'),
  ).toBeInTheDocument();
  expect(screen.getByText('O telefone é obrigatório')).toBeInTheDocument();
  expect(screen.getByText('O e-mail é obrigatório')).toBeInTheDocument();
});

test('should call onSave when form is valid', () => {
  const handleSave = jest.fn();
  const handleClose = jest.fn();

  render(<UserForm onSave={handleSave} onClose={handleClose} />);

  fireEvent.change(screen.getByLabelText('Nome do usuário'), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText('Data de Nascimento'), {
    target: { value: '1990-01-01' },
  });
  fireEvent.change(screen.getByLabelText('Telefone'), {
    target: { value: '(12)34567-8901' },
  });
  fireEvent.change(screen.getByLabelText('E-mail do usuário'), {
    target: { value: 'john.doe@example.com' },
  });

  fireEvent.click(screen.getByText('Salvar'));

  expect(handleSave).toHaveBeenCalled();
});
