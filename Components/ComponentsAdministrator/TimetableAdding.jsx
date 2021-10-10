import React, { useContext, useState, useRef } from 'react'
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
	background-color: rgba(0, 0, 0, 0);
	color: ${props => props.theme.color};

	&::-webkit-calendar-picker-indicator {
		width: 80%;
		opacity: 0;
		position: absolute;
		left: 0;
		height: 18%;
	}
`
const Select = styled.select`
	border-radius: 10px;
	width: 90%;
	border: none;
	height: 1.5rem;
`
const Button = styled.button`
	color: ${props => props.theme.color};
	background-color: rgba(0, 0, 0, 0);
	border: none;
	font-size: 2rem;
	width: 100%;
	height: 100%;
	cursor: pointer;
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
	width: 100%;
	height: 100%;

	flex-direction: column;
	align-items: center;
	justify-content: center;
	display: none;
`
const WindowSubjects = styled.div`
	position: absolute;
	top: 0;
	width: 8rem;
	display: grid;
	place-items: center;
	height: 8rem;
	opacity: 0;
	z-index: -1;
`
const Paragraph = styled.p`
	margin: 0;
	color: ${props => props.theme.color};
`
const Textarea = styled.textarea`
	resize: vertical;
	border-radius: 8px;
	width: 60%;
	min-height: 1.5rem;
	border: none;
	font-size: 1rem;
	padding-inline: 0.5rem;
`
export default function TimetableAdding(props) {
	const days = ['Po', 'Út', 'St', 'Čt', 'Pa']
	const [timetableState, setTimetableState] = useState([null])
	const timeRef = useRef(null)
	const [note, setNote] = useState();

	const subjects = [
		{
			id: 1,
			subjectName:'Matematika I',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 2,
			subjectName:'Matematika II',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 3,
			subjectName:'Programovaní I',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 4,
			subjectName:'Programovaní II',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 5,
			subjectName:'Ekonomika',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 6,
			subjectName:'Anglický jazyk I',
			teacherName:'PhD. Kozajska',
		},
		{
			id: 7,
			subjectName:'Anglický jazyk II',
			teacherName:'PhD. Kozajska',
		},
	]

	function handleClickTime(e) {
		if (timetableState.length < 20) {
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
	function handleSubmit() {
		let subjectData = [[], [], [], [], []]
		let timeData = [];
		let length = document.getElementsByClassName('timetableSubjects').length / 5
		let counter = 0;
		for (let i = 0; i < 5; i++) {
			for(let j = 0; j < length; j++) {
				subjectData[i][j] = subjects[document.querySelectorAll('.timetableSubjects select')[counter].value]
				counter++;
			}
		}
		for(let i = 0;i < length;i+=2) {
			timeData.push({start: document.querySelectorAll('.timetableTime input')[i].value, end: document.querySelectorAll('.timetableTime input')[i + 1].value});
		}
		console.log({fakulta: props.faculty, timetable: {subject: subjectData, time: timeData}, note: note})
		alert('Uloženo')
	}
	return (
		<ThemeProvider theme={useContext(Context)}>
			<Box style={{ overflowX: 'scroll' }}>
				<Container>
					<Div>
						<Table size={timetableState.length + 1}>
							<thead>
								<Tr>
									<Th></Th>
									{timetableState.map((value, i) => (
										<Th key={i}>
											<Button onClick={handleClickTime}>+</Button>
											<WindowTime className='timetableTime' ref={timeRef}>
												<Input type="time" />
												<Paragraph>-</Paragraph>
												<Input type="time" />
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
														<WindowSubjects className="timetableSubjects">
															<Select>
																<Option value={null}>
																	-
																</Option>
																{subjects.map(
																	(subject, j) => (
																		<Option
																			title={
																				subject.subjectName
																			}
																			value={j}
																			key={j}>
																			{subject.subjectName}
																		</Option>
																	),
																)}
															</Select>
														</WindowSubjects>
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
					<Textarea onChange={(e) => setNote(e.target.value)} placeholder="Popisek"></Textarea>
					<SubmitButton
						type="submit"
						onClick={handleSubmit}
						value="Uložit rozvrh"
					/>
				</Container2>
			</Box>
			<Div2></Div2>
		</ThemeProvider>
	)
}
