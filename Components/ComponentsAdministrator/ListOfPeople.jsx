import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useFetch } from '../../hooks/useFetch'
import { Context } from '../../pages/_app'
import { Box, SubmitButton } from '../../theme'


const List = styled.li`
	display: grid;
	
	grid-template-columns: 1fr 1fr 1fr 1fr;
	&:last-child {
		border-bottom: none;
	}
	
	`
const Paragraph = styled.p`
	border-bottom: 1px solid #8181814c;
	justify-self: center;
	width: 25vw;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	padding: 0.6rem 0.1rem;
	margin: 0;
	text-align: center;
	color: ${props => props.theme.text};
	@media screen and (max-width: 1070px) and (min-width: 0){
		&:nth-child(3){
			display: none;
		}
	}
`
const UnsortedList = styled.ul`
	height: 18rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-right: 2rem;
	width: 100%;
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
const Input = styled.input`
	padding: 0.5rem 0.8rem;
	font-weight: 100;
	width: 50vw;
	border: 1px solid ${props => props.theme.text};

	margin: 0 0.5rem;
	&::placeholder {
		color: #c5c5c5;
	}
	border-radius: 20px;
	@media screen and (max-width: 445px) and (min-width: 0) {
		margin: 0;
		margin-top: 1rem;
	}
`
const Settings = styled.div`
	display: flex;
	align-items: center;
	height: 6rem;
`
const Container = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-left: 1rem;
`
export default function ListOfPeople(props) {
	const [reference, setReference] = useState()
	
	
	const [names, status] = useFetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole');
	console.log(status);
	console.log(names);

	function handleClickChanging(id) {
        props.setId(id)
    }
	function handleClickDeleting(id) {
		if(confirm('Opravdu si přejete odstranit uživatele?')) {
			props.setId(id)
			alert('Uživatel byl odstraněn');
		}
	}
	function funcNames() {
		let searched = []

		if(!!names && !!reference){
			names.map(name => {
				if (`${name.first.toLowerCase()} ${name.last.toLowerCase()} ${name.email.toLowerCase()}`.includes(reference.trim().toLowerCase()) ) {
					searched.push(name)
				}
			})
			return searched.map((searchedName, id) => (
				<List key={id}>
					<Paragraph>{searchedName.first}</Paragraph>
					<Paragraph>{searchedName.last}</Paragraph>
					<Paragraph>{searchedName.email}</Paragraph>
					{props.changingPeople &&  <SubmitButton type='submit' value='Změnit' onClick={() => handleClickChanging(id)} />}
					{props.deletingPeople &&  <SubmitButton type='submit' value='Odstranit' onClick={() => handleClickDeleting(id)} />}
				</List>
			))
		}
		else{
			return names.map((names, id) => (
				<List key={id}>
					<Paragraph>{names.first}</Paragraph>
					<Paragraph>{names.last}</Paragraph>
					<Paragraph>{names.email}</Paragraph>
					{props.changingPeople &&  <SubmitButton type='submit' value='Změnit' onClick={() => handleClickChanging(id)} />}
					{props.deletingPeople &&  <SubmitButton type='submit' value='Odstranit' onClick={() => handleClickDeleting(id)} />}
				</List>
			))
		}
	}
	return (
		<ThemeProvider theme={useContext(Context)}>
			<Box>
				<Settings>
					<Container>
						<Input onChange={(e) => setReference(e.target.value)} type="text" placeholder="Search..." />
					</Container>
				</Settings>
				<UnsortedList>{funcNames()}</UnsortedList>
			</Box>
			
		</ThemeProvider>
	)
}
