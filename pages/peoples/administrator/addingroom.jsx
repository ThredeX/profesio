import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import TimetableComp from '../../../Components/ComponentsAdministrator/TimetableComp'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'

import { MainHeading, Main, Select2, Option, Box, Input, SubmitButton, Form, Label, Radio } from '../../../theme'
import { Context } from '../../_app'
const FormRadio = styled.form`
	width: 20rem;
	margin: 2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`
const H2 = styled.h2`
	color: ${props => props.theme.text};
	font-weight: 100;
	margin-left: 2rem;
`
const H3 = styled.h3`
	color: ${props => props.theme.text};
	font-weight: 100;
	margin-left: -1.5rem;
`
const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin-bottom: 1rem;
`
const Div = styled.div`
	width: auto;
	padding: 20px;
	display: flex;
	align-items: center;
	height: 2rem;
`
const FormDiv = styled.div`
	display: flex;
	align-items: center;
`
const Margin = styled.div`
	margin-block: 1rem;
`
const AddingRoom = props => {
	const [state, setState] = useState(0)
	const [faculties, setFaculties] = useState(null)
	const [faculty, setFaculty] = useState(null)
	const [facultyDelete, setFacultyDelete] = useState(null)

	useEffect(() => {
		async () => {
			let res = await fetch('../../../api/faculty/all')
			setFaculties(await res.json());
		}
	}, [])

	const handleClick = e => {
		e.preventDefault()
		if (confirm('Opravdu si přejete odstranit fakultu?')) {
			fetch(`../../../api/faculty/${facultyDelete}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			})
			alert('Fakulta byla odstraněna')
		}
	}
	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" />
				<MainHeading>Přidání Rozvrhů</MainHeading>
				<Main>
					<Box>
						<H2>Fakulty: </H2>
						<Container>
							<FormRadio onChange={e => setFaculty(e.target.value)}>
								<H3>Vyberte operaci: </H3>
								<div>
									<Div>
										<Label htmlFor="radio1">Přídání: </Label>
										<Radio type="radio" name="radio" id="radio1" value="add" />
									</Div>
									<Div>
										<Label htmlFor="radio2">Odstranění: </Label>
										<Radio type="radio" name="radio" id="radio2" value="delete" />
									</Div>
								</div>
							</FormRadio>
							{faculty === 'add' ? (
								<Form>
									<FormDiv>
										<Input type="text" placeholder="Přidat fakultu" />
									</FormDiv>
									<SubmitButton type="submit" value="Přidat" />
								</Form>
							) : (
								<Form>
									<FormDiv>
										<Select2 name="faculty" onClick={e => setFacultyDelete(e.target.value)}>
											{faculties?.map((faculty) => (
												<Option value={faculty.id} key={faculty.id}>
													{faculty.name}
												</Option>
											))}
										</Select2>
									</FormDiv>
									<SubmitButton onClick={handleClick} type="submit" value="Odstranit" />
								</Form>
							)}
						</Container>
					</Box>
					<Box>
						<Margin></Margin>
						<Select2 name="faculty" onClick={e => setState(e.target.value)}>
							{faculties?.map((faculty) => (
								<Option value={faculty.id} key={faculty.id}>
									{faculty.name}
								</Option>
							))}
						</Select2>
						<Input style={{ maxWidth: '10rem' }} placeholder="Název budovy" title="Budova, do které budete přidávat místnosti/rozvrhy" />
					</Box>
					<TimetableComp changeTT={false} />
				</Main>
			</ThemeProvider>
		</>
	)
}
export default AddingRoom

