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
    const [dateSince, setDateSince] = useState();
    const [dateTo, setDateTo] = useState();

	function setDate(e) {
        e.preventDefault()
        function alertDate(date) {
           return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getUTCFullYear()}`
        }
        if(dateSince <= dateTo) {
            alert(`Rozvrhy budou zpřístupněny od ${alertDate(new Date(dateSince))} do ${alertDate(new Date(dateTo))}`);
        }
    }
	return (
		<Div2>
			<ThemeProvider theme={useContext(Context)}>
				<Box>
					<Margin m="1rem 0 0 0"></Margin>
					<Form>
						<Label>Zpřístupnění rozvrhů: </Label>
						<Margin m="1rem 0 0 0"></Margin>
						<Label htmlFor="datum_od">Od: </Label>
						<Input onChange={(e) => setDateSince(e.target.value)} type="date" name="datum_od" id="datum_od" />
						<Label htmlFor="datum_do">Do: </Label>
						<Input onChange={(e) => setDateTo(e.target.value)} type="date" name="datum_do" id="datum_do" />
						<SubmitButton
							type="submit"
							onClick={setDate}
							value="Nastavit"
						/>
					</Form>
				</Box>
			</ThemeProvider>
		</Div2>
	)
}
