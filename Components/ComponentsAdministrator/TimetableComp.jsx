import React, { useContext, useState, useRef, useEffect } from 'react'
import { Box, Table, Th, Td, Tr, Tbody, Option, SubmitButton } from '../../theme'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'

const Div = styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
`
const Div2 = styled.div`
	height: 1rem;
`

const Input = styled.input`
	border-radius: 8px;
	width: 60%;
	border: none;
	text-align: center;
	position: relative;
	color: ${props => props.theme.color};
	background-color: rgba(0, 0, 0, 0);
	&::-webkit-calendar-picker-indicator {
		cursor: pointer;
		width: 80%;
		background: none;
		position: absolute;
		z-index: 0;
		height: 18%;
	}
`
const Select = styled.select`
	width: 90%;
	cursor: pointer;
	border: none;
	height: 1.5rem;
	background-color: ${props => props.theme.box};
	color: ${props => props.theme.text};
	display: flex;
	white-space: nowrap;
	text-overflow: ellipsis;
	border-bottom: 1px solid #555;
	overflow: hidden;
`
const Button = styled.button`
	color: ${props => props.theme.color};
	background-color: rgba(0, 0, 0, 0);
	border: none;
	font-size: 2rem;
	width: 100%;
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	height: 100%;
	cursor: pointer;
`
const Container = styled.div`
	display: grid;
	height: 120%;
`
const Container2 = styled.div`
	margin-block: 0.5rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const WindowTime = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	display: none;
`
const WindowSubjects = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	z-index: -3;
`
const Paragraph = styled.p`
	margin: 0;
	color: ${props => props.theme.color};
`
const SelectContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 10px;
`
export default function TimetableAdding(props) {
	const { changeTT } = props
	const days = ['Po', 'Út', 'St', 'Čt', 'Pá']
	const [timetableState, setTimetableState] = useState([null])
	const timeRef = useRef(null)
	const [subjects, setSubjects] = useState([])
	const [teachers, setTeachers] = useState([])
	const [subject, setSubject] = useState(null)
	const [teacher, setTeacher] = useState(null)
	const [lecture, setLecture] = useState(null)

	useEffect(() => {
		fetch('../../api/school/subject')
			.then(res => res.json())
			.then(data => {
				setSubjects(data)
				console.log(data)
			})
		fetch('../../api/users/info')
			.then(res => res.json())
			.then(data => {
				console.log(data.teachers)
				setTeachers(data.teachers)
			})
		fetch(`../../api/faculty/room/${props.room}`)
			.then(res => res.json())
			.then(data => {
				setLecture(data)
				setTimetableState([...data.subjects[0].map(_ => null), null])
				console.log(data)
			})
	}, [])
	//Lecture = beginning, end, days, FacultyId, RoomId, TeacherId, SubjectId
	function handleSubmit() {
		let subjectData = [[], [], [], [], []]
		let timeData = []
		let counter = 0
		let length = document.getElementsByClassName('timetableSubjects').length / 5
		console.log(length)
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < length; j++) {
				subjectData[i][j] = {
					TeacherId: parseInt(
						document.querySelectorAll('.timetableSubjects > div')[counter]
							.children[1].value,
					),
					SubjectId: parseInt(
						document.querySelectorAll('.timetableSubjects > div')[counter]
							.children[0].value,
					),
					RoomId: props.room,
					FacultyId: props.faculty,
				}

				counter++
			}
		}
		for (let i = 0; i < length * 2; i += 2) {
			timeData.push({
				start: document.querySelectorAll('.timetableTime input')[i].value,
				end: document.querySelectorAll('.timetableTime input')[i + 1].value,
			})
			console.log(timeData)
		}
		console.log({ subject: subjectData, time: timeData })
		fetch('../../api/school/lecture', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ subjects: subjectData, time: timeData }),
		}).catch(err => console.error(err))
		alert('Uloženo')
	}
	function handleClickTime(e) {
		if (timetableState.length < 20) {
			console.log(timetableState)
			setTimetableState([null, ...timetableState])
		}
		e.target.style.display = 'none'
		timeRef.current.style.display = 'flex'
	}

	function handleClickSubject(e, x, y) {
		e.target.style.display = 'none'
		document.getElementsByClassName('timetableSubjects')[
			x * timetableState.length + y
		].style.opacity = '1'
		document.getElementsByClassName('timetableSubjects')[
			x * timetableState.length + y
		].style.zIndex = '1'
	}

	return (
		<ThemeProvider theme={useContext(Context)}>
			<Box style={{ overflowX: 'scroll' }}>
				<Container>
					<Div>
						<Table size={timetableState.length}>
							<thead>
								<Tr>
									<Th></Th>
									{timetableState.map((value, i) => (
										<Th key={i}>
											{i + 2 > timetableState.length && (
												<Button onClick={handleClickTime}>
													+
												</Button>
											)}
											<WindowTime
												className="timetableTime"
												ref={timeRef}
												style={
													i < timetableState.length - 1
														? { display: 'flex' }
														: null
												}>
												<>
													<Input
														type="time"
														defaultValue={
															lecture?.time[i]?.start
														}
													/>
													<Paragraph>-</Paragraph>
													<Input
														type="time"
														defaultValue={
															lecture?.time[i]?.end
														}
													/>
												</>
											</WindowTime>
										</Th>
									))}
								</Tr>
							</thead>
							<Tbody>
								{days.map((value, i) => {
									return (
										<Tr key={i}>
											<Td>{`${value}`}</Td>
											{timetableState.map((e, key) => {
												return (
													<Td key={key}>
														<WindowSubjects
															className={
																'timetableSubjects'
															}
															style={
																lecture?.subjects[i][
																	key
																]?.Teacher.User
																	.surname ||
																lecture?.subjects[i][
																	key
																]?.Teacher.User.surname
																	? {
																			display:
																				'flex',
																			opacity:
																				'1',
																			zIndex: '1',
																	  }
																	: null
															}>
															<SelectContainer>
																<Select
																	onChange={e =>
																		setSubject(
																			e.target
																				.value,
																		)
																	}>
																	<Option
																		value={
																			lecture
																				?.subjects[
																				i
																			][key]
																				? lecture
																						?.subjects[
																						i
																				  ][key]
																						.SubjectId
																				: -1
																		}>
																		{
																			lecture
																				?.subjects[
																				i
																			][key]
																				?.Subject
																				.name
																		}
																	</Option>
																	{subjects?.map(
																		subject => (
																			<Option
																				title={
																					subject.name
																				}
																				value={
																					subject.id
																				}
																				key={
																					subject.id
																				}>
																				{
																					subject.name
																				}
																			</Option>
																		),
																	)}
																</Select>
																<Select
																	onChange={e =>
																		setTeacher(
																			e.target
																				.value,
																		)
																	}>
																	<Option
																		value={
																			lecture
																				?.subjects[
																				i
																			][key]
																				? lecture
																						?.subjects[
																						i
																				  ][key]
																						.TeacherId
																				: -1
																		}>
																		{
																			lecture
																				?.subjects[
																				i
																			][key]
																				?.Teacher
																				.User
																				.surname
																		}
																	</Option>
																	{teachers?.map(
																		teacher => (
																			<Option
																				title={
																					teacher
																						.User
																						.surname
																				}
																				value={
																					teacher.id
																				}
																				key={
																					teacher.id
																				}>
																				{
																					teacher
																						.User
																						.surname
																				}
																			</Option>
																		),
																	)}
																</Select>
															</SelectContainer>
														</WindowSubjects>
														{lecture?.subjects[i][key]
															?.Teacher.User.surname ||
														lecture?.subjects[i][key]
															?.Teacher.User
															.surname ? null : (
															<Button
																onClick={e =>
																	handleClickSubject(
																		e,
																		i,
																		key,
																	)
																}>
																+
															</Button>
														)}
													</Td>
												)
											})}
										</Tr>
									)
								})}
							</Tbody>
						</Table>
					</Div>
				</Container>
			</Box>
			<Box>
				<Container2>
					<SubmitButton
						type="submit"
						onClick={handleSubmit}
						value={changeTT ? 'Změnit rozvrh' : 'Uložit rozvrh'}
					/>
				</Container2>
			</Box>
			<Div2></Div2>
		</ThemeProvider>
	)
}
