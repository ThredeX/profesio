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
const Room = styled.input`
	width: 60%;
	border: none;
	text-align: center;
	position: relative;
	color: ${props => props.theme.text};
	background-color: rgba(0, 0, 0, 0);
	border-bottom: ${props => props.theme.text} solid 1px;
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
	border-bottom: 1px solid ${props => props.theme.border};
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
export default function TimetableAdding({ changeTT }) {
	const days = ['Po', 'Út', 'St', 'Čt', 'Pá']
	const [timetableState, setTimetableState] = useState([null])
	const timeRef = useRef(null)
	const [room, setRoom] = useState(null)
	const [subjects, setSubjects] = useState([])
	const [teachers, setTeachers] = useState([])

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
	}, [])
	//Lecture = beginning, end, days, FacultyId, RoomId, TeacherId, SubjectId

	function addLecture() {
		fetch('../../api/school/lecture', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({}),
		})
	}
	function handleClickTime(e) {
		if (timetableState.length < 20) {
			setTimetableState([null, ...timetableState])
		}
		e.target.style.display = 'none'
		timeRef.current.style.display = 'flex'
	}

	function handleClickSubject(e, x, y) {
		e.target.style.display = 'none'
		document.getElementsByClassName('timetableSubjects')[x * timetableState.length + y].style.opacity = '1'
		document.getElementsByClassName('timetableSubjects')[x * timetableState.length + y].style.zIndex = '1'
	}
	
	return (
		<ThemeProvider theme={useContext(Context)}>
			<Box style={{ overflowX: 'scroll' }}>
				<Container>
					<Div>
						<Table size={changeTT ? (!!timetableState.fakulta ? timetableState.fakulta.timetable.subject[0].length + 1 : null) : timetableState.length + 1}>
							<thead>
								<Tr>
									<Th>
										<Room title="místnost rozvrhu" onChange={e => setRoom(e.target.value)} type="text" placeholder="room" name="room" />
									</Th>
									{(!!timetableState.fakulta ? timetableState.fakulta.timetable.time : timetableState).map((value, i) => (
										<Th key={i}>
											{!changeTT && <Button onClick={handleClickTime}>+</Button>}
											<WindowTime className="timetableTime" ref={timeRef} style={changeTT ? { display: 'flex' } : null}>
												{changeTT ? (
													<>
														<Input type="time" defaultValue={timetableState.fakulta ? value.start : ''} />
														<Paragraph>-</Paragraph>
														<Input type="time" defaultValue={timetableState.fakulta ? value.end : ''} />
													</>
												) : (
													<>
														<Input type="time" />
														<Paragraph>-</Paragraph>
														<Input type="time" />
													</>
												)}
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
											{(timetableState.fakulta ? timetableState.fakulta.timetable.subject[i] : timetableState).map((e, key) => {
												return (
													<Td key={key}>
														<WindowSubjects
															className="timetableSubjects"
															style={
																changeTT
																	? {
																			opacity: '1',
																			zIndex: '1',
																	  }
																	: null
															}>
															<SelectContainer>
																<Select>
																	<Option value={changeTT ? timetableState.fakulta && e.subjectName : null}>{changeTT ? timetableState.fakulta && e.subjectName : '-'}</Option>
																	{subjects?.map((subject, j) => (
																		<Option title={subject.name} value={j} key={j}>
																			{subject.name}
																		</Option>
																	))}
																</Select>
																<Select>
																	<Option value={changeTT ? timetableState.fakulta && e.subjectName : null}>{changeTT ? timetableState.fakulta && e.subjectName : '-'}</Option>
																	{teachers?.map((teacher, j) => (
																		<Option title={teacher.User.surname} value={j} key={j}>
																			{teacher.User.surname}
																		</Option>
																	))}
																</Select>
															</SelectContainer>
														</WindowSubjects>
														{!changeTT && <Button onClick={e => handleClickSubject(e, i, key)}>+</Button>}
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
					<SubmitButton type="submit" onClick={handleSubmit} value={changeTT ? 'Změnit rozvrh' : 'Uložit rozvrh'} />
				</Container2>
			</Box>
			<Div2></Div2>
		</ThemeProvider>
	)
}
