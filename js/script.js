// ------------------  [Style] --------------

const inputElements = document.querySelectorAll("input");

inputElements.forEach((inputElement) => {
	inputElement.addEventListener("mousemove", (e) => {
		if (!e.target.matches(":focus")) {
			e.target.style.borderColor = "#0493cc";
		}
	});

	inputElement.addEventListener("focus", (e) => {
		e.target.style.borderColor = "rgb(0, 184, 144)";
	});

	inputElement.addEventListener("mouseleave", (e) => {
		if (!e.target.matches(":focus")) {
			e.target.style.borderColor = "";
		}
	});

	inputElement.addEventListener("blur", (e) => {
		e.target.style.borderColor = "";
	});
});

// ------------------  [localstorage] --------------
// ----- [ sign in ]

async function hashPassword(password) {
	const buffer = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(password)
	);
	return Array.from(new Uint8Array(buffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}



async function Save2localstorage() {
	const name = document.querySelector("#s_name").value;
	const pass1 = document.querySelector("#s_pass1").value;
	const pass2 = document.querySelector("#s_pass2").value;

	const checkState = checkPass(pass1, pass2);

	if (checkState === 1) {
		let users = JSON.parse(localStorage.getItem("users")) || [];
		const userExists =
			users.find((user) => user.name === name) !== undefined;

		if (userExists) {
			alert("User already exists choose a different name");
		} else {
			const hashedPassword = await hashPassword(pass2);
			const newUser = { name: name, password: hashedPassword };
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
			alert("Done");
		}
	} else if (checkState === 0) {
		alert("Passwords do not match => Try again");
	} else {
		alert("Please fill in all fields ");
	}
}

function checkPass(pass1, pass2) {
	if (pass1 === pass2 && pass1 !== "") {
		return 1;
	} else if (pass1 !== pass2 && pass2 !== "") {
		return 0;
	}
}

function checkUsername() {
	const name = document.querySelector("#s_name").value;
	let users = JSON.parse(localStorage.getItem("users")) || [];
	const userExists = users.find((user) => user.name === name) !== undefined;
	const userExistsMessage = document.querySelector("#user_exists");
	const regex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;

	if (name.length < 5 || name.length > 10) {
		userExistsMessage.textContent =
			"Username must be between 5-10 characters";
	} else if (!regex.test(name)) {
		userExistsMessage.textContent =
			"Username must be include at least one number and one special character";
	} else if (userExists) {
		userExistsMessage.textContent =
			"User already exists choose a different name";
	} else {
		userExistsMessage.style.display = "none";
		return;
	}
	userExistsMessage.style.display = "block";
}

document.querySelector("#s_name").addEventListener("input", checkUsername);

document.querySelector("#s_pass2").addEventListener("input", () => {
	const pass1 = document.querySelector("#s_pass1").value;
	const pass2 = document.querySelector("#s_pass2").value;
	const state = checkPass(pass1, pass2);

	const passwordMatch = document.querySelector("#pass_match");

	if (state === 0) {
		passwordMatch.style.display = "block";
	} else {
		passwordMatch.style.display = "none";
	}
});

document.querySelector("#s_pass1").addEventListener("input", () => {
	const pass1 = document.querySelector("#s_pass1").value;
	const pass2 = document.querySelector("#s_pass2").value;
	const state = checkPass(pass1, pass2);

	const passwordMatch = document.querySelector("#pass_match");

	if (state === 0) {
		passwordMatch.style.display = "block";
	} else {
		passwordMatch.style.display = "none";
	}
});

const signInButton = document.getElementById("s_in");
signInButton.addEventListener("click", Save2localstorage);

// ----- [ log in ]

async function checklogin() {

	const name = document.querySelector("#l_name").value;
	const pass = document.querySelector("#l-pass").value;

	let users = JSON.parse(localStorage.getItem("users")) || [];
	const usererror = document.querySelector("#invalidUser");
	const foteerimg = document.querySelector("#footer-img");
	const hashedPassword = await hashPassword(pass);
	const userExists = users.find(
		(user) => user.name === name && user.password === hashedPassword
	);

	if (userExists) {
		alert("Login successful");
	} else {
		usererror.style.display = " block ";
		foteerimg.classList.remove("mb-2");
		foteerimg.classList.add("mb-1");
	}
}

document.getElementById("l_in").addEventListener("click", checklogin);
