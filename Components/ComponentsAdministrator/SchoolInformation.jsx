import React, { useContext, useState } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'
import { Form, Input, SubmitButton, Label, Box } from '../../theme'

const Div2 = styled.div`
	width: clamp(20rem, 80vw, 24rem);
`
const Margin = styled.div`
	margin: ${props => props.m};
`
export default function TimetableEnd() {
    const [adresa, setAdresa] = useState();
    const [web, setWeb] = useState();

	function setSchool(e) {
        e.preventDefault()
        alert(adresa + ' ' + web)
    }
	return (
		<Div2>
			<ThemeProvider theme={useContext(Context)}>
				<Box>
					<Margin m="1rem 0 0 0"></Margin>
					<Form>
						<Label>Informace o škole: </Label>
						<Margin m="1rem 0 0 0"></Margin>
						<Label htmlFor="adresa">Adresa školy: </Label>
						<Input onChange={(e) => setAdresa(e.target.value)} type="text" name="adresa" id="adresa" />
						<Label htmlFor="web">Webové stránky školy: </Label>
						<Input onChange={(e) => setWeb(e.target.value)} type="url" name="web" id="web" />
						<SubmitButton
							type="submit"
							onClick={setSchool}
							value="Uložit"
						/>
					</Form>
				</Box>
			</ThemeProvider>
		</Div2>
	)
}
