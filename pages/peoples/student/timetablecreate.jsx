import { useContext, useState, useEffect } from 'react'
import { Context } from '../../_app'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { logged } from '../../../utils/logged'
import { MainHeading, Main } from '../../../theme'
import Lectures from '../../../Components/ComponentsStudent/Lectures'

const TimetableCreate = props => {
	const [load, setLoad] = useState(false)
	const theme = useContext(Context)
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])
	return (
		load && (
			<>
				<ThemeProvider theme={theme}>
					<Header />
					<NavBar route="student" name="Dominik" />
					<MainHeading>Přihlášení na přednášky</MainHeading>
					<Main>
						<Lectures />
					</Main>
				</ThemeProvider>
			</>
		)
	)
}
export default TimetableCreate
