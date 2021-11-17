import React, { useContext, useEffect, useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import {
	Box,
	Table,
	Th,
	Td,
	Tr,
	Tbody,
	SubmitButton,
	MainHeading,
	Main,
} from '../../../theme'

import { Context } from '../../_app'
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

const Container = styled.div`
	display: grid;
	height: 120%;
`
const Container2 = styled.div`
	margin-top: 1.5rem;
`
const WindowTime = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const WindowSubjects = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	z-index: -1;
	height: 100%;
	width: 100%;
`
const Paragraph = styled.p`
	color: ${props => props.theme.color};
	font-size: 1rem;

`
const Paragraph2 = styled.p`
	color: ${props => props.theme.text};
	font-size: 1rem;
`

const ChangingTimetable = () => {
	const [state, setState] = useState(0)
	const days = ['Po', 'Út', 'St', 'Čt', 'Pa']
	const [timetableState, setTimetableState] = useState([null])
	const timeRef = useRef(null)
	const [note, setNote] = useState()
	useEffect(() => {
		setTimetableState({
			fakulta: {
				name: 'Fakulta informačních technologií',
				shortName: 'FIT',
				timetable: {
					subject: [
						[
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
						],
						[
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
						],
						[
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
						],
						[
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
							{
								id: 1,
								subjectName: 'Matematika II',
								teacherName: 'PhD. Kozajska',
							},
						],
						[
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
							{
								id: 1,
								subjectName: 'Matematika I',
								teacherName: 'PhD. Kozajska',
							},
							{
								id: 1,
								subjectName: '',
								teacherName: '',
							},
						],
					],
					time: [
						{ start: '09:00', end: '10:30' },
						{ start: '10:30', end: '12:00' },
						{ start: '13:00', end: '14:30' },
					],
					note: '',
				},
			},
		})
	}, [])

	function handleSubmit() {
		let subjectData = [[], [], [], [], []]
		let timeData = []
		let length = document.getElementsByClassName('timetableSubjects').length / 5
		console.log(length)
		let counter = 0,
			k
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < length; j++) {
				for (
					k = 0;
					k < subjects.length &&
					subjects[k].subjectName !=
						document.querySelectorAll('.timetableSubjects select')[counter]
							.value;
					k++
				) {}
				subjectData[i][j] = subjects[k - 1]
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
		console.log({
			fakulta: changeTT ? timetableState.fakulta.shortName : props.faculty,
			timetable: { subject: subjectData, time: timeData, note: note },
		})
		alert('Uloženo')
	}

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="teacher" />
				<MainHeading>Změna rozvrhů</MainHeading>
				<Main>
					<Box style={{ overflowX: 'scroll' }}>
						<Container>
							<Div>
								<Table size={timetableState.length + 1}>
									<thead>
										<Tr>
											<Th></Th>

											{!!timetableState.fakulta &&
												timetableState.fakulta.timetable.time.map(
													(value, i) => (
														<Th key={i}>
															<WindowTime
																className="timetableTime"
																ref={timeRef}>
																<Paragraph>
																	{value.start}
																	<br />
																	-
																	<br />
																	{value.end}
																</Paragraph>
															</WindowTime>
														</Th>
													),
												)}
										</Tr>
									</thead>
									<Tbody>
										{days.map((value, i) => {
											return (
												<Tr key={i}>
													<Td>{`${value}`}</Td>
													{timetableState.fakulta &&
														timetableState.fakulta.timetable.subject[
															i
														].map((e, key) => {
															return (
																<Td key={key}>
																	<WindowSubjects className="timetableSubjects"></WindowSubjects>
																	<Paragraph2>
																		{e.subjectName}
																	</Paragraph2>
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
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingTimetable
