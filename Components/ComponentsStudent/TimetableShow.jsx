import React, { useContext } from 'react'
import { Box, Table, Th, Td, Tr } from '../../theme'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'

export default function TimetableAdding({ table }) {
	const time = table.time
	const subjects = table.subjects
    const days = ['Po', 'Út', 'St', 'Čt', 'Pa'];
	return (
		<ThemeProvider theme={useContext(Context)}>
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
                                    <Td>{`${new Date().getDate() - new Date().getDay() + i + 1}. ${days[i]}`}</Td>
									{row.map((subject, i) => (
										<Td title={`${subject.name}, ${subject.teacher}`} key={i}>{subject.shortName}</Td>
									))}
								</Tr>
							)
						})}
					</tbody>
				</Table>
			</Box>
		</ThemeProvider>
	)
}
