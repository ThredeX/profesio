import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import fakulta from '../../../teacherTimetable.json'
import { Box, Table, Th, Td, Tr, Tbody, MainHeading, Main, Thead, SubmitButton, Input, Radio } from '../../../theme'

import { Context } from '../../_app'
const Div = styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
`
const Div2 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;

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
const Change = styled.div`
	opacity: 0;
	background-color: #383838;
	height: auto;
	border-radius: 10px;
	z-index: 10;
	width: auto;
	position: absolute;
	transform: translateY(-50%);
	transition: opacity 0.4s;
	padding: 10px;
	@media screen and (max-width: 500px) {
		width: auto;
	}
`
const Paragraph2 = styled.p`
	color: ${props => props.theme.text};
	font-size: 1rem;
	width: 8rem;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		width: 2rem;
		font-size: 0.6rem;
	}
	position: relative;
	&:hover ${Change} {
		opacity: 1;
	}
`

const ChangingTimetable = () => {
	const days = ['Po', 'Út', 'St', 'Čt', 'Pá']
	const [timetableState, setTimetableState] = useState([null])
	useEffect(() => {
		setTimetableState({
			fakulta,
		})
	}, [])

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="teacher" />
				<MainHeading>Rozvrh</MainHeading>
				<Main>
					<Box style={{ overflowX: 'scroll' }}>
						<Container>
							<Div>
								<Table size={timetableState.length + 1}>
									<Thead>
										<Tr>
											<Th></Th>
											{!!timetableState.fakulta &&
												timetableState.fakulta.timetable.time.map((value, i) => (
													<Th key={i}>
														<Paragraph>
															{value.start}
															<br />
															-
															<br />
															{value.end}
														</Paragraph>
													</Th>
												))}
										</Tr>
									</Thead>
									<Tbody>
										{days.map((day, i) => {
											return (
												<Tr key={i}>
													<Td>{day}</Td>
													{timetableState.fakulta &&
														timetableState.fakulta.timetable.subject[i].map((e, key) => {
															return (
																<Td key={key}>
																	<Paragraph2>
																		{e.shortNameSubject}
																		<Change>
																			<Div2>
																				<label htmlFor="radio_teacher">Zrušeno: </label> <Radio name="radio_teacher" type="radio" />
																			</Div2>
																			<Input name="duvod" type="text" placeholder="Důvod" maxLength="30" />
																			<SubmitButton type="submit" value="Uložit" />
																		</Change>
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
