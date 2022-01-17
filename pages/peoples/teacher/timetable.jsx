import React, { useContext, useEffect, useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import fakulta from '../../../teacherTimetable.json'
import { Box, Table, Th, Td, Tr, Tbody, MainHeading, Main, Thead } from '../../../theme'
import { logged } from '../../../utils/logged'
import { Context } from '../../_app'
const Div = styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
`
const Container = styled.div`
	display: grid;
	height: 120%;
`

const Paragraph = styled.p`
	color: ${props => props.theme.color};
	font-size: 1rem;
	width: 8rem;
	margin: 0 auto;
	padding: 5px;

	@media screen and (max-width: 500px) {
		text-align: center;
		width: 2rem;
		font-size: 0.6rem;
	}
`
const Info = styled.div`
	opacity: 0;
	background-color: #383838;
	height: auto;
	border-radius: 8px;
	z-index: 10;
	width: 15rem;
	font-size: 0.8rem;
	position: absolute;
	transition: opacity 1s;
	transform: translateY(-40%);
	padding: 0.5rem;
	border-left: ${props => props.theme.color} 5px solid;
	@media screen and (max-width: 500px) {
		width: auto;
	}
`
const Div2 = styled.div`
	color: ${props => props.theme.text};
	font-size: 1rem;
	width: 8rem;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		width: 2rem;
		font-size: 0.6rem;
	}
	position: relative;
`
const ChangingTimetable = () => {
	const days = ['Po', 'Út', 'St', 'Čt', 'Pá']
	const [timetableState, setTimetableState] = useState([null])
	const showInfoRefClick = useRef([...new Array(5)].map(() => []))
	const showInfoRefOver = useRef([...new Array(5)].map(() => []))
	const [load, setLoad] = useState(false)
	const context = useContext(Context)


	useEffect(() => {
		setTimetableState({ fakulta })
	}, [])
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])
	useEffect(() => {
		for (let i = 0; i < showInfoRefClick.current.length; i++) {
			for (let j = 0; j < showInfoRefClick.current[i].length; j++) {
				showInfoRefClick.current[i][j].onclick = () => {
					showInfoRefOver.current[i][j].style.opacity = '1'
				}
				showInfoRefOver.current[i][j].onmouseleave = () => {
					showInfoRefOver.current[i][j].style.opacity = '0'
				}
			}
		}
	}, [timetableState])

	useEffect(() => {
		fetch('../../../api/faculty/teacher')
			.then(res => res.json())
			.then(data => console.log(data))
	})

	return (
		load && (
			<>
				<ThemeProvider theme={context}>
					<Header />
					<NavBar route="teacher" />
					<MainHeading>Rozvrh</MainHeading>
					<Main>
						<Box style={{ overflowX: 'scroll' }}>
							<Container>
								<Div>
									<Table
										size={(timetableState.length + 1).toString()}>
										<Thead>
											<Tr>
												<Th></Th>
												{!!timetableState.fakulta &&
													timetableState.fakulta.timetable.time.map(
														(value, i) => (
															<Th key={i}>
																<Paragraph>
																	{value.start}
																	<br />
																	-
																	<br />
																	{value.end}
																</Paragraph>
															</Th>
														),
													)}
											</Tr>
										</Thead>
										<Tbody>
											{days.map((day, i) => {
												return (
													<Tr key={i}>
														<Td>{day}</Td>
														{timetableState.fakulta &&
															timetableState.fakulta.timetable.subject[
																i
															].map((e, key) => {
																return (
																	<Td key={key}>
																		<Div2
																			ref={element =>
																				(showInfoRefClick.current[
																					i
																				][key] =
																					element)
																			}>
																			<p>
																				{
																					e.shortNameSubject
																				}
																			</p>
																			<Info
																				ref={element =>
																					(showInfoRefOver.current[
																						i
																					][
																						key
																					] =
																						element)
																				}>
																				Předmět:{' '}
																				{
																					e.subjectName
																				}{' '}
																				<br />{' '}
																				Fakulta:{' '}
																				{e.name}{' '}
																				(
																				{
																					e.shortNameFaculty
																				}
																				)
																				<br />
																				Třída:{' '}
																				{
																					e.class
																				}
																			</Info>
																		</Div2>
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
	)
}
export default ChangingTimetable
