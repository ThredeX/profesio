import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main, Paragraph, Box } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'

const ChangingPeople = props => {
	const [state, setState] = useState([])
  const [id, setId] = useState(null)

	useEffect(() => {
		fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
			.then(res => res.json())
			.then(data => {
				setState(data)
				console.log(data)
			})
			.catch(err => console.error(err))
	}, [])

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
					<ListOfPeople comp={true} setId={setId} />
					<Box>
						{!!id ? (
							<Paragraph>{state[id]['email']}</Paragraph>
						) : null}
					</Box>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingPeople
