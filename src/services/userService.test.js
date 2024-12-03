import {
  addUser,
  updateUser,
  deleteUser,
  saveUsers,
  getUsers,
} from './userService';

jest.mock('./userService', () => ({
  ...jest.requireActual('./userService'),
  saveUsers: jest.fn(),
  getUsers: jest.fn(),
}));

describe('User  Service', () => {
  let users;

  beforeEach(() => {
    // Lista de usuários inicial
    users = [
      {
        nome: 'User  1',
        dataNasc: '1990-01-01',
        telefone: '1234567890',
        email: 'user1@example.com',
      },
      {
        nome: 'User  2',
        dataNasc: '1992-02-02',
        telefone: '0987654321',
        email: 'user2@example.com',
      },
    ];

    // Mock para localStorage.setItem
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    // Mock para getUsers para retornar a lista de usuários inicial
    getUsers.mockReturnValue(users);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new user', () => {
    const newUser = {
      nome: 'User  3',
      dataNasc: '1993-03-03',
      telefone: '1122334455',
      email: 'user3@example.com',
    };

    addUser(newUser);

    // Verificando se saveUsers foi chamado com a lista de usuários atualizada
    expect(saveUsers).toHaveBeenCalledWith([...users, newUser]);
  });

  test('should update user at specified index', () => {
    const updatedUser = {
      nome: 'Updated User',
      dataNasc: '1991-01-01',
      telefone: '1112223333',
      email: 'updated@example.com',
    };

    updateUser(1, updatedUser);

    // Verificando se saveUsers foi chamado com a lista atualizada
    expect(saveUsers).toHaveBeenCalledWith([
      {
        nome: 'User  1',
        dataNasc: '1990-01-01',
        telefone: '1234567890',
        email: 'user1@example.com',
      },
      updatedUser,
    ]);
  });

  test('should delete user at specified index', () => {
    deleteUser(1); // Deletando o usuário no índice 1 (User  2)

    // Verificando se saveUsers foi chamado com a lista após a exclusão
    expect(saveUsers).toHaveBeenCalledWith([
      {
        nome: 'User  1',
        dataNasc: '1990-01-01',
        telefone: '1234567890',
        email: 'user1@example.com',
      },
    ]);
  });

  test('should save users to localStorage', () => {
    const usersToSave = [
      {
        nome: 'User  1',
        dataNasc: '1990-01-01',
        telefone: '1234567890',
        email: 'user1@example.com',
      },
      {
        nome: 'User  2',
        dataNasc: '1992-02-02',
        telefone: '0987654321',
        email: 'user2@example.com',
      },
    ];

    saveUsers(usersToSave);

    // Verificando se localStorage.setItem foi chamado corretamente
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'db_usur',
      JSON.stringify(usersToSave),
    );
  });
});
