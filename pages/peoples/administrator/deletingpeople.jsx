import React, { useContext, useState } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'

//delete people
const DeletingPeople = () => {
	const [reload, setReload] = useState(false)


	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
					<ListOfPeople
						reload={reload}
						setReload={setReload}
						deletingPeople={true}
					/>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default DeletingPeople
