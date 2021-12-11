import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import {
	MainHeading,
	Main,
	Box,
	Heading2,
	SubmitButton,
	Form,
	Input,
	Label,
} from '../../../theme'

const List = styled.li`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	&:last-child {
		border-bottom: none;
	}
`
const Div = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.7rem;
	width: 10rem;
`
const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const Paragraph = styled.p`
	justify-self: center;
	max-width: 15vw;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	padding: 0.6rem 0.1rem;
	margin: 0;
	text-align: center;
	color: ${props => props.theme.text};
	@media screen and (max-width: 1070px) and (min-width: 0) {
		&:nth-child(3) {
			display: none;
		}
	}
`
const InputContainer = styled.div`
	display: flex;
	align-items: center;
`
const UnsortedList = styled.ul`
	height: 18rem;
	display: flex;
	flex-direction: column;
	align-items: space-evenly;
	justify-content: center;
	padding-right: 2rem;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 10px;
		border-radius: 20px;
	}
	&::-webkit-scrollbar-thumb {
		height: 50px;
		background-color: ${props => props.theme.color};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
`
//delete people
const SubjectModify = () => {
	const [reload, setReload] = useState(null)
	const [subjects, setSubjects] = useState(null)

	function deleteSubject(id) {
		if (confirm('Opravdu chcete odstranit předmět?')) {
			// fetch(`../../../api/school/subject/${id}`, {
			//     method: 'DELETE',
			//     headers: {
			//         'content-type': 'application/json'
			//     }
			// })
			// .then(res => {
			//     if(!res.ok){
			//         console.log(res.status);
			//     }
			// })
			setReload(id)
		}
	}
    function addSubject(e) {
        	fetch('../../../api/school/subject/', {
			    method: 'POST',
			    headers: {
			        'content-type': 'application/json'
			    },
                body: JSON.stringify(e.target.subject.value)
			})
			.then(res => {
			    if(!res.ok){
			        console.log(res.status);
			    }
			})
    }   

	useEffect(() => {
		setSubjects([
			{ id: 1, name: 'Linearni algebra I', shortName: 'La' },
			{ id: 2, name: 'Matematika I', shortName: 'Mat' },
			{ id: 3, name: 'Linearni algebra II', shortName: 'LaII' },
			{ id: 4, name: 'programovani I', shortName: 'Prg' },
			{ id: 5, name: 'programovani II', shortName: 'PrgII' },
			{ id: 6, name: 'fyzika', shortName: 'Fyz' },
		])
        // fetch('../../../api/school/subject')
        // .then(res => res.json())
        // .then(data => setSubjects(data))
        // .catch(err => {
        //     console.log(err);
        // })
	}, [])

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)} />
				<MainHeading>Předměty</MainHeading>
				<Main>
					<Container>
						<Box>
							<Heading2>Odebrání předmětu</Heading2>
							<UnsortedList>
								{subjects?.map(subject => (
									<List key={subject.id}>
										<Paragraph>{subject.name}</Paragraph>
										<Paragraph>{subject.shortName}</Paragraph>
										<Div>
											<SubmitButton
												value="Odstranit"
												type="submit"
												onClick={() => deleteSubject(subject.id)}
											/>
										</Div>
									</List>
								))}
							</UnsortedList>
						</Box>
						<Box>
							<Heading2>Přidání předmětu</Heading2>
							<Form onSubmit={addSubject}>
								<InputContainer>
									<Label htmlFor='subject'>Přidat:</Label>
									<Input name='subject' id='subject'/>
								</InputContainer>
								<SubmitButton type="submit" value="Přidat" />
							</Form>
						</Box>
					</Container>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default SubjectModify
