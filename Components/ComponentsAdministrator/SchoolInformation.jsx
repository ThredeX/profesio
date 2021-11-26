import React, { useContext, useState } from 'react'

import Draggable from 'react-draggable'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'
import { Input, SubmitButton, Label, Box } from '../../theme'

const Div2 = styled.div`
	width: clamp(20rem, 80vw, 24rem);
	cursor: move;

`
const Margin = styled.div`
	margin: ${props => props.m};
`
const Form = styled.form`
	width: 100%;
`
export default function TimetableEnd() {
    const [adresa, setAdresa] = useState();
    const [web, setWeb] = useState();
	const [state, setState] = useState({
		activeDrags: 0,
		deltaPosition: {
			x: 0,
			y: 0,
		},
		controlledPosition: {
			x: -400,
			y: 200,
		},
	})

	function setSchool(e) {
        e.preventDefault()
        alert(adresa + ' ' + web)
    }
	const onStart = () => {
		setState({ activeDrags: ++state.activeDrags })
	}

	const onStop = () => {
		setState({ activeDrags: --state.activeDrags })
	}
	return (
		<Draggable onStart={onStart} onStop={onStop}>
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
		</Draggable>
	)
}
