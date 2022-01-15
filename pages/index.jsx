import styled, { ThemeProvider } from 'styled-components'
import Header from '../Components/Header'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from '../theme'
import Link from 'next/link'
import { Context } from './_app'
import { useContext } from 'react'

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
	background-color: rgba(0, 0, 0, 0);
`

const Index = () => {

	var router = useRouter()
	async function handleSubmit(e) {
		e.preventDefault()
		fetch('../api/auth/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				username: e.target.name.value,
				password: e.target.password.value,
			}),
		}).then(res => {
			if (res.ok) {
				let postfix = e.target.name.value.slice(-1)
				if (postfix === 'a') {
					router.push('/peoples/administrator')
				}
				if (postfix === 't') {
					router.push('/peoples/teacher')
				}
				if (postfix === 's') {
					router.push('/peoples/student')
				}
			}
		})
	}
	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<Div>
					<Heading>Login</Heading>
				</Div>
				<Main>
					<Form onSubmit={e => handleSubmit(e)}>
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
							<Button>Zapomenuté heslo?</Button>
							<SubmitButton value="Login" type="submit" />
						</Container>
					</Form>
				</Main>
				
			</ThemeProvider>
		</>
	)
}

export default Index
