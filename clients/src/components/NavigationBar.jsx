import React from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
	const navigate = useNavigate();

	return (
		<>
			<Navbar className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="/home">Your Assignments</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Button
							variant="outline-danger"
							onClick={() => {
								localStorage.removeItem("user");
								navigate("/login");
							}}
						>
							Logout
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
