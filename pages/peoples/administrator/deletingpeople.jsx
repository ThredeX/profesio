import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'
import { logged } from '../../../utils/logged'
//delete people
const DeletingPeople = () => {
	const [reload, setReload] = useState(false)
	const [load, setLoad] = useState(false)
	const theme = useContext(Context)

	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	})

	return load && (
		<>
			<ThemeProvider theme={theme}>
				<Header />
				<NavBar route="administrator" theme={theme} />
				<MainHeading>Odstranění uživatelů</MainHeading>
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
