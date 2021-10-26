import React, { useContext, useState } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main, Paragraph, Box } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'
import { useFetch } from '../../../hooks/useFetch'

//delete people
const DeletingPeople = (props) => {
    const [id, setId] = useState(null)

	const [data, status] = useFetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
					<ListOfPeople deletingPeople={true} setId={setId} />
				</Main>
			</ThemeProvider>
		</>
	)
}
export default DeletingPeople