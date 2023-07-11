import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import AssignmentModel from "./AssignmentModel";
import DeleteModel from "./DeleteModel";

const Home = () => {
	const navigate = useNavigate();

	//redirect to login if user is not logged in
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/login");
		}
	}, [navigate]);

	const [assignments, setAssignments] = useState([]);
	const [assignmentsModel, setAssignmentsModel] = useState(false);
	const [assignmentId, setAssignmentId] = useState(null);
	const [assignmentSubmissions, setAssignmentSubmissions] = useState({});
	const [userid, setUserid] = useState(null);
	const [submissionMade, setSubmissionMade] = useState(false);
	const [deleteModel, setDeleteModel] = useState(false);

	//get user id from localStorage
	const user = JSON.parse(localStorage.getItem("user"));
	const useID = user?.id;

	useEffect(() => {
		try {
			const options = { method: "GET", url: "/api/assignments/" };

			axios
				.request(options)
				.then(function (response) {
					setAssignments(response.data);
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.log(error);
		}
	}, [submissionMade]);

	useEffect(() => {
		assignments?.results?.forEach((assignment) => {
			checkAssignmentSubmission(assignment.id, useID);
		});
	}, [assignments]);

	const dateFormater = (date) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString();
	};

	//check if the user has submitted the assignment
	const checkAssignmentSubmission = (assignment_id, user_id) => {
		try {
			const options = {
				method: "GET",
				url: "/api/assignments/submissions/check/",
				params: { assignment_id: assignment_id, user_id: user_id },
			};

			axios
				.request(options)
				.then(function (response) {
					setAssignmentSubmissions((prevSubmissions) => ({
						...prevSubmissions,
						[assignment_id]: response.data,
					}));
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<NavigationBar />
			<Container className="mt-5">
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>S.N</th>
							<th>Assignment</th>
							<th>Due Date</th>
							<th>Completed</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{assignments?.results?.map((_, idx) => {
							return (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{_.title}</td>
									<td>{dateFormater(_.due_date)}</td>
									<td>
										{assignmentSubmissions[_.id] ? (
											<span className="text-success">
												Submitted
											</span>
										) : (
											<span className="text-danger">
												Not Submitted
											</span>
										)}
									</td>
									<td className="d-flex justify-content-between gap-2">
										{assignmentSubmissions[_.id] ? (
											<Button
												variant="outline-danger"
												className="w-100 "
												onClick={() => {
													setDeleteModel(true);
													setAssignmentId(_.id);
													setUserid(useID);
												}}
											>
												Delete
											</Button>
										) : (
											<Button
												variant="outline-primary"
												className="w-100"
												onClick={() => {
													setAssignmentsModel(true);
													setAssignmentId(_.id);
													setUserid(useID);
													setSubmissionMade(false);
												}}
											>
												Submit
											</Button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>

			<AssignmentModel
				show={assignmentsModel}
				assignmentid={assignmentId}
				userid={userid}
				onSubmit={() => setSubmissionMade(true)}
				onHide={() => setAssignmentsModel(false)}
			/>
			<DeleteModel
				show={deleteModel}
				assignmentid={assignmentId}
				userid={userid}
				onHide={() => setDeleteModel(false)}
			/>
		</>
	);
};

export default Home;
