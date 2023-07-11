import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AssignmentModel = (props) => {
	const [answer, setAnswer] = useState("");
	// console.log(props);

	const { assignmentid, userid } = props;

	const submitAssignment = () => {
		try {
			const options = {
				method: "POST",
				url: "/api/assignments/submissions",
				headers: { "Content-Type": "application/json" },
				data: {
					assignment_id: assignmentid,
					user_id: userid,
					file: answer,
				},
			};

			axios
				.request(options)
				.then(function (response) {
					// console.log(response.data);
                    props.onHide();

				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Please complete the assignment
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						submitAssignment();
					}}
				>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Label>Please write your answer here</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							onChange={(e) => setAnswer(e.target.value)}
                            required
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AssignmentModel;
