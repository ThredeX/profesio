import React, { useContext } from 'react'

import Header from '../../../../Components/Header'
import NavBar from '../../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../../_app'
import { MainHeading } from '../../../../theme'
import TimetableEnd from '../../../../Components/ComponentsAdministrator/TimetableEnd'
import SchoolInformation from '../../../../Components/ComponentsAdministrator/SchoolInformation'
const Main = styled.main`
	height: 80vh;
	padding-top: 2rem;
	width: 100%;
`
const Index = () => {
	return (
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
