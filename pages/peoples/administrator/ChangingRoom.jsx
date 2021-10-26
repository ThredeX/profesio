import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import TimetableComp from '../../../Components/ComponentsAdministrator/TimetableComp'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'

import {
	MainHeading,
	Main,
	Select2,
	Option,
	Box,
} from '../../../theme'
import { Context } from '../../_app'

const ChangingRoom = () => {
	const [state, setState] = useState(0)

	

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" />
				<MainHeading>Změna rozvrhů</MainHeading>
				<Main>
					<Box>
						<Select2 name="fakulty" onClick={e => setState(e.target.value)}>
							{fakulty.map((fakulta, i) => (
								<Option value={i} key={i}>
									{fakulta.name}
								</Option>
							))}
						</Select2>
					</Box>
					<TimetableComp
						faculty={fakulty[state]}
						changeTT={true}
					/>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingRoom

const table = {
	time: [
		{
			start: '8:00',
			end: '9:30',
		},
		{
			start: '10:00',
			end: '10:30',
		},
		{
			start: '10:00',
			end: '10:30',
		},
		{
			start: '11:00',
			end: '12:30',
		},
		{
			start: '13:00',
			end: '14:30',
		},
		{
			start: '15:00',
			end: '16:30',
		},
	],
	subjects: [
		[
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
		],
		[
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
		],
		[
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
		],
		[
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
		],
		[
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
			{ name: 'Linearni algebra', shortName: 'La', teacher: 'PhD. Kozajska' },
		],
	],
}

const fakulty = [
	{
		name: 'Fakulta informačních technologií',
		shortName: 'FIT',
		timetable: table,
	},
	{
		name: 'Fakulta Stavební',
		shortName: 'FAST',
		timetable: table,
	},
	{
		name: 'Fakulta Podnikatelská',
		shortName: 'FP',
		timetable: table,
	},
]
