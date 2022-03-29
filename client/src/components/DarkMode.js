const DarkMode = () => {
	const body = document.body;
	const currentTheme = localStorage.getItem('currentTheme');

	// Check to see if there is a theme preference in local Storage, if so add the ligt theme to the body
	if (currentTheme) {
		body.classList.add('light-theme');
	}

	const switchTheme = (e) => {
		e.preventDefault();
		body.classList.toggle('light-theme');

		// If the body has the class of light theme then add it to local Storage, if not remove it
		if (body.classList.contains('light-theme')) {
			localStorage.setItem('currentTheme', 'themeActive');
		} else {
			localStorage.removeItem('currentTheme');
		}
	};

	return (
		<button className="btn place-items-center" onClick={switchTheme}>
			<i className="ri-sun-line sun-icon"></i>
			<i className="ri-moon-line moon-icon"></i>
		</button>
	);
};

export default DarkMode;
