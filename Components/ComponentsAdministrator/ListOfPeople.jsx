import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SubmitButton } from '../../theme'

const List = styled.li`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	border-bottom: 1px solid;
    &:nth-child(0) {
        border:none;
    }
`
const Paragraph = styled.p`
	padding: 0.4rem 0.1rem;
	margin: 0;
	text-align: center;
`
const UnsortedList = styled.ul`
	height: 18rem;
	padding-right: 2rem;
	overflow-x: hidden;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 20px;
		border-block: 3px solid ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
		border-radius: 20px;
	}
	&::-webkit-scrollbar-thumb {
		height: 50px;
		background-color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
		border-radius: 10px;
	}
`
const Div = styled.div`
	font-weight: 100;
	margin-top: 3rem;
	margin-left: 1rem;
	margin-right: 5rem;
	padding-right: 10px;
	border-radius: 20px;
	box-shadow: inset 0px 0px 0px 4px ${process.env.NEXT_PUBLIC_COLOR_BLACK};
	overflow: hidden;
	position: relative;
`
const Input = styled.input`
	border: none;
	box-shadow: 0px 0px 0px 4px ${process.env.NEXT_PUBLIC_COLOR_BLACK};
	padding: 0.5rem 0.8rem;
	font-weight: 100;
	margin: 0 0.5rem;
	margin-top: -1px;
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
	const [names, setNames] = useState()
	useEffect(() => {
		fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
			.then(res => res.json())
			.then(data => setNames(data))
			.catch(err => console.error(err))
	}, [])
	return (
		<Div>
			<Settings>
				<Container>
					<Input type="text" placeholder="Search..." />
					<SubmitButton type="submit" value="Vyhledat" />
				</Container>
			</Settings>
			<UnsortedList>
				{names &&
					names.map((name, id) => (
						<List key={id}>
							<Paragraph>{name.first}</Paragraph>
							<Paragraph>{name.last}</Paragraph>
							<Paragraph>{name.email}</Paragraph>
							<Paragraph>{name.adress}</Paragraph>
						</List>
					))}
			</UnsortedList>
		</Div>
	)
}
