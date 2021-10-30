import styled, { ThemeProvider } from 'styled-components'
import Header from '../Components/Header'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Form, Input, Pol, SubmitButton, MainHeading} from '../theme'
import Link from 'next/link'
import { Context } from './_app'
import React, {useContext} from 'react'

//login page and header PROFESIO and menu stay for all pages

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 5px;
`
const Div = styled.div`
	margin: 0 auto;
	width: 100vw;
`
const Main = styled.main`
	margin: 0 auto;
	width: 100vw;
	display: flex;
	justify-content: center;
`
const Heading = styled.h1`
	font-size: 4rem;
	text-align: center;
	color: ${props => props.theme.text};
`
const Button = styled.button`
	text-align: center;
	color: ${props => props.theme.color};
	border-radius: 20px;
	border: none;
	background-color: rgba(0,0,0,0);
` 

const Index = () => {
	var router = useRouter()
	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<Div>
					<Heading>Login</Heading>

				</Div>
				<Main>
					<Formik
						initialValues={{
							name: '',
							password: '',
						}}
						onSubmit={() => {
							router.push('peoples/administrator')
						}}>
						<Form>
							<Input
								type="text"
								name="name"
								id="name"
								placeholder="Username"
							/>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
							/>
							<Container>
								<Button>
									Zapomenuté heslo?
								</Button>
								<Link href="/peoples/administrator" passHref>
									<SubmitButton value='Login' type='submit'/>
								</Link>
							</Container>
						</Form>
					</Formik>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default Index
