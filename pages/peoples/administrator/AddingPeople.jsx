import React, { useState } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'

import styled from 'styled-components'
import { Formik } from 'formik'

import {
	Form,
	Field,
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
	flex: 1;

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

//adding people
const AddingPeople = props => {
	const [whichPeople, setWhichPeople] = useState(null)
	return (
		<>
			<Header />
			<NavBar />
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
						<Formik initialValues={{}} onSubmit={() => {}}>
							{whichPeople === 'student' ? (
								<>
									<Form>
										<Field type="text" placeholder="Jméno" />
										<Field type="text" placeholder="Příjmení" />
										<Field type="email" placeholder="E-mail" />
										<Field type="number" placeholder="Telefon" />
										<Field
											type="number"
											min="1990"
											max="2099"
											placeholder="Zadejte rok nástupu"
											/>
										<Select>
											<option value="denni">Denní</option>
											<option value="stridave">Střídavé</option>
											<option value="dálkové">Dálkové</option>
										</Select>
										<SubmitButton type="submit" value="Add" />
									</Form>
								</>
							) : whichPeople === 'teacher' ? (
								<>
									<Form>
										<Field type="text" placeholder="Jméno" />
										<Field type="text" placeholder="Příjmení" />
										<Field type="email" placeholder="E-mail" />
										<Field type="number" placeholder="Telefon" />
										<SubmitButton type="submit" value="Add" />
									</Form>
								</>
							) : whichPeople === 'worker' ? (
								<>
									<Form>
										<Field type="text" placeholder="Jméno" />
										<Field type="text" placeholder="Příjmení" />
										<Field type="email" placeholder="E-mail" />
										<Field type="number" placeholder="Telefon" />
										<Field type="text" placeholder="pozice" />
										<SubmitButton type="submit" value="Add" />
									</Form>
								</>
							) : whichPeople === 'admin' ? (
								<>
									<Form>
										<Field type="text" placeholder="Jméno" />
										<Field type="text" placeholder="Příjmení" />
										<Field type="email" placeholder="E-mail" />
										<Field type="number" placeholder="Telefon" />
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
