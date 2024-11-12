
export const getUsers = () => JSON.parse(localStorage.getItem('db_usur')) ?? [];

export const saveUsers = (users) => {
		localStorage.setItem('db_usur', JSON.stringify(users));
};

export const addUser = (user) => {
		const users = getUsers();
		users.push(user);
		saveUsers(users);
};

export const updateUser = (index, user) => {
		const users = getUsers();
		users[index] = user;
		saveUsers(users);
};

export const deleteUser = (index) => {
		const users = getUsers();
		users.splice(index, 1);
		saveUsers(users);
};
