import React, { useContext, useEffect, useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'
import { SubmitButton } from '../../theme'

const List = styled.li`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	border-bottom: 1px solid #8181814c;
	&:last-child {
		border-bottom: none;
	}
`
const Paragraph = styled.p`
	justify-self: center;
	width: 98%;
	padding: 0.6rem 0.1rem;
	margin: 0;
	text-align: center;
	color: ${props => props.theme.text};
`
const UnsortedList = styled.ul`
	height: 18rem;
	padding-right: 2rem;
	overflow-x: hidden;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 10px;
		border-radius: 20px;
	}
	&::-webkit-scrollbar-thumb {
		height: 50px;
		background-color: ${props => props.theme.orange};
		border-radius: 10px;
	}
`
const Div = styled.div`
	font-weight: 100;
	margin: 1.5rem 5rem 0 1rem;
	padding-right: 10px;
	border-radius: 20px;
	box-shadow: 0 0 1px 2px #0f0f0fc1 inset;
	overflow: hidden;
	position: relative;
	background-color: ${props => props.theme.box};
`
const Input = styled.input`
	padding: 0.5rem 0.8rem;
	font-weight: 100;
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
	width: 100%;
	height: 6rem;
`
const Container = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-left: 1rem;
`
export default function ListOfStudents() {
	const [names, setNames] = useState([])
	const [reference, setReference] = useState(null)

	useEffect(() => {
		fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
			.then(res => res.json())
			.then(data => {
				setNames(data)
			})
			.catch(err => console.error(err))
	}, [])

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
				</List>
			))
		}
		else{
			return names.map((names, id) => (
				<List key={id}>
					<Paragraph>{names.first}</Paragraph>
					<Paragraph>{names.last}</Paragraph>
					<Paragraph>{names.email}</Paragraph>
				</List>
			))
		}
	}
	return (
		<ThemeProvider theme={useContext(Context)}>
			<Div>
				<Settings>
					<Container>
						<Input onChange={(e) => setReference(e.target.value)} type="text" placeholder="Search..." />
					</Container>
				</Settings>
				<UnsortedList>{funcNames()}</UnsortedList>
			</Div>
		</ThemeProvider>
	)
}
