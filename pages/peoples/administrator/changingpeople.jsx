import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import {
	MainHeading,
	Main,
	Paragraph,
	Box,
	Input,
	Label,
	Radio,
	Form,
	SubmitButton,
} from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'
import { userDataReformat } from '../../../utils/userDataReformat'
import { logged } from '../../../utils/logged'

const FormContainer1 = styled.div`
	padding-right: 3rem;
	display: flex;
	box-shadow: 0 0 5px 3px ${props => props.theme.shadow};
	align-items: center;
	flex-wrap: wrap;
	border-radius: 8px;
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
const Div2 = styled.div`
	width: 100%;
	margin-block: 0.3rem;
	margin-left: -0.3rem;
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
	const [load, setLoad] = useState(false);
	const [id, setId] = useState(null)

	const [dataFetch, setDataFetch] = useState([]);
	const [whichPeople, setWhichPeople] = useState('student')
	const [dataID, setDataID] = useState()
	const [reload, setReload] = useState(false)
	function handleSubmit(e) {
		e.preventDefault()
		setReload(true)
		let data = {}
		data.name = e.target.firstName.value
		data.surname = e.target.lastName.value
		data.email = e.target.email.value
		data.telephone_number = e.target.phoneNumber.value
		if (whichPeople === 'student') {
			data.entry_year = parseInt(e.target.yearOfEntry.value)
		}
		if (whichPeople === 'administrator') {
			data.can_edit = e.target.can_edit.checked
		}
		fetch(`../../../api/users/${id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (!res.ok) {
				console.error(res.text)
			}
		})
	}
	useEffect(() => {
		fetch('../../../api/users/info')
			.then(res => res.json())
			.then(data => {
				setDataFetch(userDataReformat(data))
			})
			.catch(err => console.error(err))
	}, [])
	useEffect(() => {
		for (let i = 0; i < dataFetch.length; i++) {
			console.log(i);
			if (dataFetch[i]?.UserId === id) {
				console.log(dataFetch[i])
				setDataID(dataFetch[i])
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	})
	return load && (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
					<ListOfPeople
						changingPeople={true}
						setId={setId}
						reload={reload}
						setReload={setReload}
					/>
					{id && (
						<>
						
							<Margin></Margin>
							<FormContainer1>
								<FormRadio
									onChange={e => setWhichPeople(e.target.value)}>
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
											<Label htmlFor="radio4">
												Administrátor:{' '}
											</Label>
											<Radio
												type="radio"
												name="radio"
												id="radio4"
												value="administrator"
											/>
										</Div>
									</div>
								</FormRadio>
								{whichPeople === 'student' ? (
									<Form onSubmit={handleSubmit} style={{ margin: 0 }}>
										<FormDiv>
											<Label htmlFor="firstName">Jméno: </Label>
											<Input
												type="text"
												placeholder="Jméno"
												id="firstName"
												name="firstName"
												defaultValue={dataID?.User.name}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="lastName">Příjmení: </Label>
											<Input
												type="text"
												placeholder="Příjmení"
												id="lastName"
												name="lastName"
												defaultValue={dataID?.User.surname}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="email">E-mail: </Label>
											<Input
												type="email"
												placeholder="E-mail"
												id="email"
												name="email"
												defaultValue={dataID?.User.email}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="phoneNumber">
												Telefon:{' '}
											</Label>
											<Input
												type="number"
												placeholder="Telefon"
												id="phoneNumber"
												name="phoneNumber"
												defaultValue={dataID?.User.telephone_number}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="yearOfEntry">
												Rok nástupu:
											</Label>
											<Input
												type="number"
												min="1990"
												max={new Date().getFullYear()}
												id="yearOfEntry"
												name="yearOfEntry"
												defaultValue={dataID?.User.entry_year}
											/>
										</FormDiv>

										<ButtonDiv>
											<SubmitButton type="submit" value="Add" />
										</ButtonDiv>
									</Form>
								) : whichPeople === 'teacher' ? (
									<Form style={{ margin: 0 }} onSubmit={handleSubmit}>
										<FormDiv>
											<Label htmlFor="firstName">Jméno: </Label>
											<Input
												type="text"
												placeholder="Jméno"
												id="firstName"
												name="firstName"
												defaultValue={dataID?.User.name}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="lastName">Příjmení: </Label>
											<Input
												type="text"
												placeholder="Příjmení"
												id="lastName"
												name="lastName"
												defaultValue={dataID?.User.surname}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="email">E-mail: </Label>
											<Input
												type="email"
												placeholder="E-mail"
												id="email"
												name="email"
												defaultValue={dataID?.User.email}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="phoneNumber">
												Telefon:
											</Label>
											<Input
												type="number"
												placeholder="Telefon"
												id="phoneNumber"
												name="phoneNumber"
												defaultValue={dataID?.User.telephone_number}
											/>
										</FormDiv>
										<ButtonDiv>
											<SubmitButton type="submit" value="Add" />
										</ButtonDiv>
									</Form>
								) : whichPeople === 'administrator' ? (
									<Form style={{ margin: 0 }} onSubmit={handleSubmit}>
										<FormDiv>
											<Label htmlFor="firstName">Jméno: </Label>
											<Input
												type="text"
												placeholder="Jméno"
												id="firstName"
												name="firstName"
												defaultValue={dataID?.User.name}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="lastName">Příjmení: </Label>
											<Input
												type="text"
												placeholder="Příjmení"
												id="lastName"
												name="lastName"
												defaultValue={dataID?.User.surname}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="email">E-mail: </Label>
											<Input
												type="email"
												placeholder="E-mail"
												id="email"
												name="email"
												defaultValue={dataID?.User.email}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="phoneNumber">
												Telefon:
											</Label>
											<Input
												type="number"
												placeholder="Telefon"
												id="phoneNumber"
												name="phoneNumber"
												defaultValue={dataID?.User.telephone_number}
											/>
										</FormDiv>
										<FormDiv>
											<Label htmlFor="can_edit">Editovaní:</Label>
											<Div2>
												<Radio
													name="can_edit"
													type="checkbox"
													checked={dataID?.User.can_edit}
												/>
											</Div2>
										</FormDiv>
										<ButtonDiv>
											<SubmitButton type="submit" value="Add" />
										</ButtonDiv>
									</Form>
								) : null}
							</FormContainer1>
						</>
					)}
				</Main>
			</ThemeProvider>
		</>
	)
}
export default ChangingPeople
