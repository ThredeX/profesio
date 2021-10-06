import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main, Paragraph, Box } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'
import { useFetch } from '../../../hooks/useFetch'

const ChangingPeople = props => {
  const [id, setId] = useState(null)

	const [data, status] = useFetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
  console.log(status);
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
							<Paragraph>{data[id]['email']}</Paragraph>
						) : null}
					</Box>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingPeople
