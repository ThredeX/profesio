import { useContext, useState, useEffect} from 'react'
import { Context } from '../../_app'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { logged } from '../../../utils/logged'


const Main = styled.main`
	height: calc(100vh - 5.2rem);
`

const Index = (props) => {
	const [load, setLoad] = useState(false);
	const theme = useContext(Context)
	
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])
    return load && (
        <>
			<ThemeProvider theme={theme}>
				<Header />
				<Main>
					<NavBar route='student' name='Dominik'/>
				</Main>
			</ThemeProvider>
        </>
    )
}
export default Index