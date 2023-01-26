/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/pages/*.ejs", "./views/partials/*.ejs"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			colors: {
				mainPurple: "#7e49ba",
				accentPurple1: "#d796ff",
				accentPurple2: "#4e2d74",
				backgroundPurple: "#f7dfff",
				textPurple: "#140024",
			},
		},
		fontFamily: {
			dm: ["DM Serif Text", "sans"],
			quick: ["Quicksand", "sans-serif"],
		},
	},
	plugins: [],
};
