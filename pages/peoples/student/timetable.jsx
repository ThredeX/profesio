import { useContext } from 'react'
import { Context } from '../../_app'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'

const Heading = styled.h1`
	color: ${props => props.theme.text};
	font-size: clamp(3rem, 10vw, 10rem);
	text-align: center;
`
const Span = styled.span`
	color: ${props => props.theme.color};
`
const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
	opacity: 0.5;
`
const Main = styled.main`
	height: calc(100vh - 5.2rem);
`

const Timetable = (props) => {

    return (
        <>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<Main>
					<Container>
						<Heading>
							<Span>P</Span>rofesio
						</Heading>
					</Container>
					<NavBar route='student' name='Dominik'/>
				</Main>
			</ThemeProvider>
        </>
    )
}
export default Timetable