import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function UserForm({ onSave, onClose, user }) {
  const [formData, setFormData] = useState({
    nome: '',
    dataNasc: null,
    telefone: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    dataNasc: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        dataNasc: user.dataNasc
          ? dayjs(user.dataNasc, ['YYYY-MM-DD', 'DD/MM/YYYY']).isValid()
            ? dayjs(user.dataNasc, ['YYYY-MM-DD', 'DD/MM/YYYY'])
            : null
          : null,
      });
    }
  }, [user]);

  const validate = (name, value) => {
    switch (name) {
      case 'nome':
        if (!value) {
          return 'O nome é obrigatório';
        } else if (value.length < 2) {
          return 'O nome deve ter pelo menos 2 caracteres';
        } else {
          return '';
        }
      case 'dataNasc':
        if (!value) {
          return 'A data de nascimento é obrigatória';
        } else {
          return '';
        }
      case 'telefone':
        const cleanedPhoneNumber = value.replace(/[\s()-]/g, '');
        if (cleanedPhoneNumber.length < 11) {
          return 'O telefone deve conter 11 dígitos no formato correto';
        } else {
          return '';
        }
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          return 'O e-mail é obrigatório';
        } else if (!emailPattern.test(value)) {
          return 'Insira um e-mail válido';
        } else {
          return '';
        }
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dataNasc: newValue });

    const error = validate('dataNasc', newValue);
    setErrors({ ...errors, dataNasc: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nome: validate('nome', formData.nome),
      dataNasc: validate('dataNasc', formData.dataNasc),
      telefone: validate('telefone', formData.telefone),
      email: validate('email', formData.email),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      onSave({
        ...formData,
        dataNasc: formData.dataNasc
          ? formData.dataNasc.format('DD/MM/YYYY')
          : '',
      });
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Nome do Usuário Input */}
          <TextField
            margin="normal"
            fullWidth
            label="Nome do usuário"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            error={!!errors.nome}
            helperText={errors.nome}
          />

          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DatePicker
              label="Data de Nascimento"
              value={formData.dataNasc}
              onChange={handleDateChange}
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  required
                  error={!!errors.dataNasc}
                  helperText={errors.dataNasc}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '56px',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            error={!!errors.telefone}
            helperText={errors.telefone}
          />

          <TextField
            margin="normal"
            fullWidth
            label="E-mail do usuário"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;
