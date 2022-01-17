import React from 'react'
import { Form2, Input, Box, Label, SubmitButton, Heading2 } from '../theme'
import styled from 'styled-components'

const Div2 = styled.div`
	width: clamp(20rem, 80vw, 40rem);
`

export default function PasswordChange() {
	return (
		<Div2>
			<Box>
				<Heading2>Změna hesla</Heading2>
				<Form2>
					<Label>Zadejte aktualní heslo: </Label>
					<Input type='password' name='password-now'/>
					<Label>Zadejte nové heslo: </Label>
					<Input type='password' name='password-new-1'/>
					<Label>Zadejte nové heslo ještě jednou: </Label>
					<Input type='password' name='password-new-2'/>
					<SubmitButton type="submit" value="Změnit" />
				</Form2>
			</Box>
		</Div2>
	)
}
