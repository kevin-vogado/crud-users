import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable/UserTable';
import UserForm from './components/UserForm/UserForm';
import {Container, Button, Card, Typography, Snackbar, Alert} from '@mui/material';
import { getUsers, saveUsers, deleteUser as deleteUserService, updateUser as updateUserService, addUser as addUserService } from './services/userService';
import './styles/App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const savedUsers = getUsers();
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const handleSaveUser = (user) => {
    try {
      if (currentUser !== null) {
        updateUserService(currentUser, user);
        const updatedUsers = [...users];
        updatedUsers[currentUser] = user;
        setUsers(updatedUsers);
        setSnackbar({ open: true, message: 'Usuário atualizado com sucesso!', severity: 'success' });
      } else {
        addUserService(user);
        setUsers([...users, user]);
        setSnackbar({ open: true, message: 'Usuário cadastrado com sucesso!', severity: 'success' });
      }
      setIsModalOpen(false);
      setCurrentUser(null);
    } catch (error) {
      setSnackbar({ open: true, message: 'Ocorreu um erro ao salvar o usuário.', severity: 'error' });
    }
  };

  const handleDeleteUser = (index) => {
    try {
      deleteUserService(index);
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      setSnackbar({ open: true, message: 'Usuário deletado com sucesso!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Ocorreu um erro ao deletar o usuário.', severity: 'error' });
    }
  };

  const handleEditUser = (index) => {
    setCurrentUser(index);
    setIsModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
      <Container style={{minWidth: '100vw', minHeight: '100vh', display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Card variant="outlined" style={{width: '70vw', minHeight: '60vh', padding: '2rem 7rem'}}>
          <header style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem'}}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Cadastro de Usuário
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)} style={{ margin: '20px 0' }}>
              Cadastrar Usuário
            </Button>
          </header>
          <UserTable users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
        </Card>
        {isModalOpen && (
            <UserForm
                onSave={handleSaveUser}
                onClose={() => { setIsModalOpen(false); setCurrentUser(null); }}
                user={currentUser !== null ? users[currentUser] : null}
            />
        )}
        <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
  );
}

export default App;
