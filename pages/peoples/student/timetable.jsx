import { useContext, useState, useEffect } from 'react'
import { Context } from '../../_app'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { logged } from '../../../utils/logged'
import { Box, Table, Th, Td, Tr } from '../../../theme'

const Main = styled.main`
	height: calc(100vh - 5.2rem);
`

const Timetable = () => {
	const [load, setLoad] = useState(false)
	const days = ['Po', 'Út', 'St', 'Čt', 'Pa']
	const [timetable, setTimetable] = useState(null)
	useEffect(() => {
		fetch('../../../api/faculty/student')
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setTimetable(data)
			})
			.catch(err => console.error(err))
	})
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])

	return (
		load && (
			<>
				<ThemeProvider theme={useContext(Context)}>
					<Header />
					<NavBar route="student" />
					{/* <Main>
						<Box>
							<Table>
								<thead>
									<Tr>
										<Th></Th>
										{time.map((time, i) => (
											<Th key={i}>
												{time.start} - {time.end}
											</Th>
										))}
									</Tr>
								</thead>
								<tbody>
									{subjects.map((row, i) => {
										return (
											<Tr key={i}>
												<Td>{`${
													new Date().getDate() -
													new Date().getDay() +
													i +
													1
												}. ${days[i]}`}</Td>
												{row.map((subject, i) => (
													<Td
														title={`${subject.name}, ${subject.teacher}`}
														key={i}>
														{subject.shortName}
													</Td>
												))}
											</Tr>
										)
									})}
								</tbody>
							</Table>
						</Box>
					</Main> */}
				</ThemeProvider>
			</>
		)
	)
}
export default Timetable
