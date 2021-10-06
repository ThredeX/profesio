import styled, { ThemeProvider } from 'styled-components'
import Header from '../Components/Header'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Form, Input, Pol } from '../theme'
import Link from 'next/link'
import { Context } from './_app'
import React, {useContext} from 'react'

//login page and header PROFESIO and menu stay for all pages
const Heading1 = styled.h1`
	text-align: center;
	font-size: 3.5rem;
`
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 5px;
`
const Paragraph = styled.p`
	border-radius: 20px;
	padding: 0.5rem 1rem;
	height: 2.5rem;
	border: 1px solid ${props => props.theme.color};
	cursor: pointer;
	color: ${0x000};
`

const Index = () => {
	var router = useRouter()
	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header menu="none" />
				<main>
					<Heading1>Login</Heading1>
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
								<Paragraph>Zapomenuté heslo?</Paragraph>
								<Link href="/peoples/administrator">
									<a>dasdas</a>
								</Link>
							</Container>
						</Form>
					</Formik>
					<Pol></Pol>
				</main>
			</ThemeProvider>
		</>
	)
}
export default Index
