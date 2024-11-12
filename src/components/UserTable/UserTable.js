import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function UserTable({ users, onDelete, onEdit }) {
		return (
				<TableContainer component={Paper}>
						<Table>
								<TableHead>
										<TableRow>
												<TableCell>Nome</TableCell>
												<TableCell>Data de Nascimento</TableCell>
												<TableCell>Telefone</TableCell>
												<TableCell>E-mail</TableCell>
												<TableCell>Ações</TableCell>
										</TableRow>
								</TableHead>
								<TableBody>
										{users.map((user, index) => (
												<TableRow key={index}>
														<TableCell>{user.nome}</TableCell>
														<TableCell>{user.dataNasc}</TableCell>
														<TableCell>{user.telefone}</TableCell>
														<TableCell>{user.email}</TableCell>
														<TableCell>
																<Button variant="contained" color="primary" onClick={() => onEdit(index)}>
																		Editar
																</Button>
																<Button variant="contained" color="secondary" onClick={() => onDelete(index)} style={{ marginLeft: '10px' }}>
																		Deletar
																</Button>
														</TableCell>
												</TableRow>
										))}
								</TableBody>
						</Table>
				</TableContainer>
		);
}

export default UserTable;
