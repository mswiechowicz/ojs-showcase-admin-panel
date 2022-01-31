export function userMapper(users) {
	return users.map((user, index) => {
		const {
			name: { first: name, last: surname },
			registered: { date },
			dob: { age },
			email,
		} = user;
		const mappedDate = date && date.split('T')[0];

		return {
			lp: `${index + 1}.`,
			name,
			surname,
			email,
			age,
			registered: mappedDate,
		};
	});
}
