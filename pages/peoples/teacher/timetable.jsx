import React, { useContext, useEffect, useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
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
	z-index: 30;
	width: 12rem;
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
	width: 100%;
	height: 100%;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		width: 2rem;
		font-size: 0.6rem;
	}
	position: relative;
`
const ChangingTimetable = () => {
	const days = ['Po', 'Út', 'St', 'Čt', 'Pá']
	const showInfoRefClick = useRef([...new Array(5)].map(() => []))
	const showInfoRefOver = useRef([...new Array(5)].map(() => []))
	const [load, setLoad] = useState(false)
	const [lectures, setLectures] = useState(null)
	const theme = useContext(Context)

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
	}, [])

	useEffect(() => {
		fetch('../../../api/faculty/teacher')
			.then(res => res.json())
			.then(data => {
				setLectures(data)
			})
			.catch(err => console.error(err))
	}, [])

	return (
		load && (
			<>
				<ThemeProvider theme={theme}>
					<Header />
					<NavBar route="teacher" />
					<MainHeading>Rozvrh</MainHeading>
					<Main>
						<Box style={{ overflowX: 'scroll' }}>
							<Container>
								<Div>
									<Table
										size={
											lectures && lectures?.subjects[0].length + 1
										}>
										<Thead>
											<Tr>
												<Th></Th>
												{!!lectures &&
													lectures.time.map((value, i) => (
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
														{!!lectures &&
															lectures.subjects[i].map(
																(e, key) => {
																	return e ? (
																		<Td key={key}>
																			<Div2
																				ref={element =>
																					(showInfoRefClick.current[
																						i
																					][
																						key
																					] =
																						element)
																				}>
																				<p>
																					{
																						e
																							.Subject
																							.short
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
																						e
																							.Subject
																							.name
																					}{' '}
																					<br />{' '}
																					Fakulta:{' '}
																					{e?.Faculty
																						? e
																								.Faculty
																								.name
																						: '-'}{' '}
																					(
																					{e.Faculty
																						? e
																								.Faculty
																								.shortcut
																						: '-'}
																					)
																					<br />
																					Třída:{' '}
																					{
																						e
																							.Room
																							.label
																					}
																				</Info>
																			</Div2>
																		</Td>
																	) : (
																		<Td key={key}>
																			<Div2
																				ref={element =>
																					(showInfoRefClick.current[
																						i
																					][
																						key
																					] =
																						element)
																				}>
																				<p>-</p>
																			</Div2>
																			<Info
																				ref={element =>
																					(showInfoRefOver.current[
																						i
																					][
																						key
																					] =
																						element)
																				}>
																				žádne
																				informace
																			</Info>
																		</Td>
																	)
																},
															)}
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
