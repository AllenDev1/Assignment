import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const login = async () => {
		try {
			const options = {
				method: "POST",
				url: "/api/login/",
				headers: { "Content-Type": "application/json" },
				data: { username: username, password: password },
			};

			axios
				.request(options)
				.then(function (response) {
					console.log(response.data);
					// Store the user login information in localStorage
					localStorage.setItem("user", JSON.stringify(response.data));
					// Redirect to the home page
					navigate("/home");
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container fluid>
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<div
					className="border  rounded p-5
                    shadow-lg bg-body rounded
                    "
				>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							console.log(username, password);
							login();
						}}
					>
						<Form.Group className="mb-3" controlId="formLogin">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter your Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Button
							variant="success"
							type="submit"
							className="w-100"
						>
							Login
						</Button>
					</Form>
				</div>
			</div>
		</Container>
	);
};

export default Login;
