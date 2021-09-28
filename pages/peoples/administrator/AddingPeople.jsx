import React, { useState } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'

import styled from 'styled-components'
import { Formik, Field} from 'formik'

import {
	Form,
	Input,
	Radio,
	MainHeading,
	Label,
	Select,
	SubmitButton,
	Main,
} from '../../../theme'

const FormContainer1 = styled.div`
	padding-right: 3rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-radius: 20px;
	box-shadow: inset 0px 0px 0px 4px ${process.env.NEXT_PUBLIC_COLOR_BLACK};
	padding-left: 3rem;
	background-image: linear-gradient(330deg, #f0f0f0ce, #fff);
	margin-left: 1rem;
	justify-content: space-evenly;
	margin-right: 5rem;
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
	margin-top: 0;
	font-weight: 400;
	height: 2rem;
`
const FormDiv = styled.div`
	display: flex;
	align-items: center;
`

//adding people
const AddingPeople = () => {
	const [whichPeople, setWhichPeople] = useState('student')
	const style = {
		'width': '100%',
		'border': `1px ${process.env.NEXT_PUBLIC_COLOR_BLACK} solid`,
		'border-radius': '20px',
		'margin-block': '.3rem',
		'padding': '.3rem .6rem',
	}
	return (
		<>
			<Header />
			<NavBar route='administrator'/>
			<MainHeading>Přidání lidí</MainHeading>
			<Main>
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
								<Label htmlFor="radio3">Pracovník školy: </Label>
								<Radio
									type="radio"
									name="radio"
									id="radio3"
									value="worker"
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
							study: '',
							position: '',
						}}
						onSubmit={values => console.log(values.firstName)}>
						{whichPeople === 'student' ? (
							<>
								<Form style={{ margin: 0 }}>
									<FormDiv>
										<Label htmlFor='firstName'>Jméno: </Label>
										<Input
											type="text"
											placeholder="Jméno"
											id="firstName"
											name="firstName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="lastName">Příjmení: </Label>
										<Input
											type="text"
											placeholder="Příjmení"
											id="lastName"
											name="lastName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="email">E-mail: </Label>
										<Input
											type="email"
											placeholder="E-mail"
											id="email"
											name="email"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="phoneNumber">Telefon: </Label>
										<Input
											type="number"
											placeholder="Telefon"
											id="phoneNumber"
											name="phoneNumber"
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
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="study">Studium: </Label>
										<Field style={style} as='select' id="study" name="study">
											<option value="denni">Denní</option>
											<option value="stridave">Střídavé</option>
											<option value="dálkové">Dálkové</option>
										</Field>
									</FormDiv>
									<SubmitButton type="submit" value="Add" />
								</Form>
							</>
						) : whichPeople === 'teacher' ? (
							<>
								<Form style={{ margin: 0 }}>
									<FormDiv>
										<Label htmlFor='firstName'>Jméno: </Label>
										<Input
											type="text"
											placeholder="Jméno"
											id="firstName"
											name="firstName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="lastName">Příjmení: </Label>
										<Input
											type="text"
											placeholder="Příjmení"
											id="lastName"
											name="lastName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="email">E-mail: </Label>
										<Input
											type="email"
											placeholder="E-mail"
											id="email"
											name="email"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="phoneNumber">Telefon: </Label>
										<Input
											type="number"
											placeholder="Telefon"
											id="phoneNumber"
											name="phoneNumber"
										/>
									</FormDiv>
									<SubmitButton type="submit" value="Add" />
								</Form>
							</>
						) : whichPeople === 'worker' ? (
							<>
								<Form style={{ margin: 0 }}>
									<FormDiv>
										<Label htmlFor='firstName'>Jméno: </Label>
										<Input
											type="text"
											placeholder="Jméno"
											id="firstName"
											name="firstName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="lastName">Příjmení: </Label>
										<Input
											type="text"
											placeholder="Příjmení"
											id="lastName"
											name="lastName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="email">E-mail: </Label>
										<Input
											type="email"
											placeholder="E-mail"
											id="email"
											name="email"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="phoneNumber">Telefon: </Label>
										<Input
											type="number"
											placeholder="Telefon"
											id="phoneNumber"
											name="phoneNumber"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor='position'>Pozice: </Label>
										<Input type="text" placeholder="pozice" name='position' id='position'/>
									</FormDiv>
									<SubmitButton type="submit" value="Add" />
								</Form>
							</>
						) : whichPeople === 'admin' ? (
							<>
								<Form style={{ margin: 0 }}>
									<FormDiv>
										<Label htmlFor='firstName'>Jméno: </Label>
										<Input
											type="text"
											placeholder="Jméno"
											id="firstName"
											name="firstName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="lastName">Příjmení: </Label>
										<Input
											type="text"
											placeholder="Příjmení"
											id="lastName"
											name="lastName"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="email">E-mail: </Label>
										<Input
											type="email"
											placeholder="E-mail"
											id="email"
											name="email"
										/>
									</FormDiv>
									<FormDiv>
										<Label htmlFor="phoneNumber">Telefon: </Label>
										<Input
											type="number"
											placeholder="Telefon"
											id="phoneNumber"
											name="phoneNumber"
										/>
									</FormDiv>
									<SubmitButton type="submit" value="Add" />
								</Form>
							</>
						) : null}
					</Formik>
				</FormContainer1>
				<ListOfPeople />
			</Main>
		</>
	)
}
export default AddingPeople
