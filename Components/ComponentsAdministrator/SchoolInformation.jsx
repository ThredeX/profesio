import React, { useContext, useState, useEffect } from 'react'

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
    const [schoolInfo, setSchoolInfo] = useState();
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
	useEffect(() => {
		async () => {
			let res = await fetch('../../api/school/info');
			setSchoolInfo(await res.json())
		} 
	}, [])
	useEffect(() => {
		fetch('../../api/school/info', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		})
	})
	function handleSubmitSchoolInfo(e) {
        e.preventDefault()
        console.log(e.target.adress.value + ' ' + e.target.web.value);
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
						<Form onSubmit={handleSubmitSchoolInfo}>
							<Label>Informace o škole: </Label>
							<Margin m="1rem 0 0 0"></Margin>
							<Label htmlFor="adresa">Adresa školy: </Label>
							<Input type="text" name="adress" />
							<Label htmlFor="web">Webové stránky školy: </Label>
							<Input type="url" name="web" />
							<SubmitButton
								type="submit"
								value="Uložit"
								/>
						</Form>
					</Box>
				</ThemeProvider>
			</Div2>
		</Draggable>
	)
}
