import React, { useContext, useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import NavBar from '../../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../../_app'
import { MainHeading } from '../../../../theme'
import TimetableEnd from '../../../../Components/ComponentsAdministrator/TimetableEnd'
import SchoolInformation from '../../../../Components/ComponentsAdministrator/SchoolInformation'
import { logged } from '../../../../utils/logged'
const Main = styled.main`
	height: 80vh;
	padding-top: 2rem;
	width: 100%;
`
const Index = () => {
	const [load, setLoad] = useState(false);
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])
	return load && (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" />
				<MainHeading>Nastavení školy</MainHeading>
				<Main>
                        <TimetableEnd />
                        <SchoolInformation />
				</Main>
			</ThemeProvider>
		</>
	)
}
export default Index
