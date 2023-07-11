import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const DeleteModel = (props) => {
	const { assignmentid, userid } = props;

	const deleteAssignment = () => {
		try {
			const options = {
				method: "DELETE",
				url: `/api/submissions/${assignmentid}/${userid}/`,
			};

			axios
				.request(options)
				.then(function (response) {
					window.location.reload();
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
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete Assignment
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p className="text-center">
					Are you sure you want to delete this assignment?
				</p>

				<div className="d-flex justify-content-around">
					<Button
						onClick={() => {
							deleteAssignment();
						}}
						className="w-25"
						variant="outline-danger"
					>
						Yes
					</Button>

					<Button
						onClick={() => {
							props.onHide();
						}}
						className="w-25"
						variant="outline-primary"
					>
						No
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DeleteModel;
