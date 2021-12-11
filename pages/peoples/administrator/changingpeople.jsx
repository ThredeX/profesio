import React, { useContext, useState, useEffect} from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main, Paragraph, Box, Input, Label, Radio, Form, SubmitButton} from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'
import { useFetch } from '../../../hooks/useFetch'
import { Formik } from 'formik'

const FormContainer1 = styled.div`
	padding-right: 3rem;
	display: flex;
	box-shadow: 0 0 1px 2px #0f0f0fc1 inset;
	align-items: center;
	flex-wrap: wrap;
	border-radius: 20px;
	padding-left: 3rem;
	margin-left: 1rem;
	justify-content: space-evenly;
	background-color: ${props => props.theme.box};
	min-height: 20rem;
`
const FormRadio = styled.form`
	width: 20rem;
	margin: 2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`
const Div = styled.div`
	width: auto;
	padding: 20px;
	display: flex;
	align-items: center;
	height: 2rem;
`
const H2 = styled.h2`
	margin-right: 1rem;
	color: ${props => props.theme.text};
	margin-top: 0;
	font-weight: 400;
	height: 2rem;
`
const FormDiv = styled.div`
	display: flex;
	align-items: center;
`
const ButtonDiv = styled.div`
	margin-top: 1rem;
`
const Margin = styled.div`
	margin-block: 1rem;
`
const ChangingPeople = props => {
	const [id, setId] = useState(null)

	const [data, status] = useFetch('../../../api/users/info')
	const [whichPeople, setWhichPeople] = useState('student')
	const [dataID, setDataID] = useState({})

	
	useEffect(() => {
		setDataID(data[id - 1])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
					<ListOfPeople changingPeople={true} setId={setId} />
					<>
					
						<Margin></Margin>
						<FormContainer1>
						<FormRadio onChange={e => setWhichPeople(e.target.value)}>
							<H2>Vyberte stav:</H2>
							<div>
								<Div>
									<Label htmlFor="radio1">Student: </Label>
									<Radio
										type="radio"
										name="radio"
										id="radio1"
										value="student"
									/>
								</Div>
								<Div>
									<Label htmlFor="radio2">Vyučující: </Label>
									<Radio
										type="radio"
										name="radio"
										id="radio2"
										value="teacher"
									/>
								</Div>
								
								<Div>
									<Label htmlFor="radio4">Administrátor: </Label>
									<Radio
										type="radio"
										name="radio"
										id="radio4"
										value="admin"
									/>
								</Div>
							</div>
						</FormRadio>
						<Formik
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
								phoneNumber: '',
								yearOfEntry: '',
							}}
							onSubmit={async (values, {setSubmiting, resetForm}) => {
								setSubmiting(true)

								let dataChange = {}
								dataChange.name = values.firstName
								dataChange.surname = values.lastName
								dataChange.email = values.email
								dataChange.telephone_number = values.phoneNumber
								if(whichPeople === 'student') {
									dataChange.entry_year = values.yearOfEntry
								}
								fetch(`../../../api/users/${id}`, {
									method: 'POST',
									headers: {
										'content-type': 'application/json'
									},
									body: JSON.stringify(dataChange)
								})
								.then(res => {
									if(!res.ok) {
										console.error(res.status);
									}
								})
							}}>
							{() => {
								switch (whichPeople) {
									case 'student': {
										return (
											<Form  style={{ margin: 0 }}>
												<FormDiv>
													<Label htmlFor="firstName">
														Jméno:{' '}
													</Label>
													<Input
														defaultValue={dataID?.name}
														type="text"
														placeholder="Jméno"
														id="firstName"
														name="firstName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="lastName">
														Příjmení:{' '}
													</Label>
													<Input
													defaultValue={dataID?.surname}
														type="text"
														placeholder="Příjmení"
														id="lastName"
														name="lastName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="email">
														E-mail:{' '}
													</Label>
													<Input
														defaultValue={dataID?.email}
														type="email"
														placeholder="E-mail"
														id="email"
														name="email"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="phoneNumber">
														Telefon:{' '}
													</Label>
													<Input
														defaultValue={dataID?.telephone_number}
														type="text"
														placeholder="Telefon"
														id="phoneNumber"
														name="phoneNumber"
													/>
												</FormDiv>
												<FormDiv>
													{/* TODO: show entry year */}
													<Label htmlFor="yearOfEntry">
														Rok nástupu:
													</Label>
													<Input
														defaultValue={dataID?.entry_year}
														type="number"
														min="1990"
														max={new Date().getFullYear()}
														id="yearOfEntry"
														name="yearOfEntry"
													/>
												</FormDiv>
											
												<ButtonDiv>
													<SubmitButton
														type="submit"
														value="Change"
													/>
												</ButtonDiv>
											</Form>
										)
									}
									case 'teacher': {
										return (
											<Form style={{ margin: 0 }}>
												<FormDiv>
													<Label htmlFor="firstName">
														Jméno:{' '}
													</Label>
													<Input
														defaultValue={dataID?.name}
														type="text"
														placeholder="Jméno"
														id="firstName"
														name="firstName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="lastName">
														Příjmení:{' '}
													</Label>
													<Input
														defaultValue={dataID?.surname}
														type="text"
														placeholder="Příjmení"
														id="lastName"
														name="lastName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="email">
														E-mail:{' '}
													</Label>
													<Input
														defaultValue={dataID?.email}
														type="email"
														placeholder="E-mail"
														id="email"
														name="email"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="phoneNumber">
														Telefon:
													</Label>
													<Input
														defaultValue={dataID?.telephone_number}
														type="text"
														placeholder="Telefon"
														id="phoneNumber"
														name="phoneNumber"
													/>
												</FormDiv>
												<ButtonDiv>
													<SubmitButton
														type="submit"
														value="Change"
													/>
												</ButtonDiv>
											</Form>
										)
									}
									
									case 'admin': {
										return (
											<Form style={{ margin: 0 }}>
												<FormDiv>
													<Label htmlFor="firstName">
														Jméno:{' '}
													</Label>
													<Input
														defaultValue={dataID?.name}
														type="text"
														placeholder="Jméno"
														id="firstName"
														name="firstName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="lastName">
														Příjmení:{' '}
													</Label>
													<Input
														defaultValue={dataID?.surname}
														type="text"
														placeholder="Příjmení"
														id="lastName"
														name="lastName"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="email">
														E-mail:{' '}
													</Label>
													<Input
														defaultValue={dataID?.email}
														type="email"
														placeholder="E-mail"
														id="email"
														name="email"
													/>
												</FormDiv>
												<FormDiv>
													<Label htmlFor="phoneNumber">
														Telefon:
													</Label>
													<Input
														defaultValue={dataID?.telephone_number}
														type="text"
														placeholder="Telefon"
														id="phoneNumber"
														name="phoneNumber"
													/>
												</FormDiv>
												<ButtonDiv>
													<SubmitButton
														type="submit"
														value="Change"
													/>
												</ButtonDiv>
											</Form>
										)
									}
								}
							}}
						</Formik>
					</FormContainer1>
					</>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingPeople
