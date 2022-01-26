import React from 'react'
import { Input, Box, Label, SubmitButton, Heading2 } from '../theme'
import styled from 'styled-components'

const Div2 = styled.div`
	width: clamp(20rem, 70vw, 30rem);
`
const Form = styled.form`
	width: 100%;
`
function changePassword(e) {
	e.preventDefault()
	if(e.target.password_1.value !== e.target.password_2.value && e.target.password_1.value == null){
		return;
	}
	fetch('../../api/auth/password', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({password: e.target.password_1.value})
	})
	.then(res => console.log(res))
	.catch(err => console.error(err))
}

export default function PasswordChange() {
	return (
		<Div2>
			<Box>
				<Heading2>Změna hesla</Heading2>
				<Form onSubmit={e => changePassword(e)}>
					<Label>Zadejte nové heslo: </Label>
					<Input type='password' name='password_1'/>
					<Label>Zadejte nové heslo: </Label>
					<Input type='password' name='password_2'/>
					<SubmitButton type="submit" value="Změnit" />
				</Form>
			</Box>
		</Div2>
	)
}
