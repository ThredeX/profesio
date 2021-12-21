import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../pages/_app'
import { Box, SubmitButton } from '../../theme'
import { userDataReformat } from '../../utils/userDataReformat'
const List = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`
const InList = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-right: 2rem;
	padding-left: 40px;
	width: 100%;
	`
const Span = styled.span`
	color: #ff0000;
	font-weight: 400;
	`
const Paragraph = styled.p`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 9rem;
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
const Paragraph2 = styled.p`
	padding: 0.6rem 0.1rem;
	width: 9rem;
	margin: 0;

	text-align: center;
	color: ${props => props.theme.text};
	&::after{
		content: '';
		height: 1px;
		display: block;
		position: relative;
		transform: translateX(-50%);
		left: 50%;
		width: 85px;
		top: 5px;
		background-color: #464545;
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
	const [names, setNames] = useState(null)
	const theme = useContext(Context)

	useEffect(
		// eslint-disable-next-line react-hooks/exhaustive-deps
		async () => {
			let res = await fetch('../../api/users/info')
			let data = await res.json()
			console.log(userDataReformat(data))
			setNames(userDataReformat(data))
			props.setReload(false)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.reload],
	)

	function handleClickChanging(id) {
		props.setId(id)
	}
	function handleClickDeleting(id) {
		if (confirm('Opravdu si přejete odstranit uživatele?')) {
			fetch(`../../../api/users/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			}).then(res => {
				if (!res.ok) {
					console.error(res.text)
					alert('error - uživatel nebyl odstraněn')
				} else {
					alert('Uživatel byl odstraněn')
					props.setReload(true)
				}
			})
		}
	}
	function funcNames() {
		let searched = []

		if (!!names && !!reference) {
			names?.map(name => {
				if (!!name.User) {
					if (
						`${name.User.name.toLowerCase()} ${name.User.surname.toLowerCase()} ${name.User.email.toLowerCase()}`.includes(
							reference.trim().toLowerCase(),
						)
					) {
						searched.push(name)
					}
				}
			})
			return searched?.map(
				searchedName =>
					searchedName.User && (
						<List key={searchedName.UserId}>
							<Paragraph>{searchedName.User.name}</Paragraph>
							<Paragraph>{searchedName.User.surname}</Paragraph>
							<Paragraph>{searchedName.User.username}</Paragraph>
							<Paragraph>{searchedName.User.email}</Paragraph>
							<Paragraph>{searchedName.User.telephone_number}</Paragraph>
							<Paragraph>{searchedName.User.role}</Paragraph>
							<Paragraph>
								{searchedName.entry_year
									? 'Rok nást. ' + searchedName.entry_year
									: searchedName.can_edit && <Span>Editování</Span>}
							</Paragraph>
							{props.changingPeople && (
								<SubmitButton
									type="submit"
									value="Změnit"
									onClick={() =>
										handleClickChanging(searchedName.UserId)
									}
								/>
							)}
							{props.deletingPeople && (
								<SubmitButton
									type="submit"
									value="Odstranit"
									onClick={() =>
										handleClickDeleting(searchedName.UserId)
									}
								/>
							)}
						</List>
					),
			)
		} else {
			return names?.map(
				name =>
					name.User && (
						<List key={name.UserId}>
							<Paragraph>{name.User.name}</Paragraph>
							<Paragraph>{name.User.surname}</Paragraph>
							<Paragraph>{name.User.username}</Paragraph>
							<Paragraph title={name.User.email}>
								{name.User.email}
							</Paragraph>
							<Paragraph>{name.User.telephone_number}</Paragraph>
							<Paragraph>{name.User.role}</Paragraph>
							<Paragraph>
								{name.entry_year
									? 'Rok nást. ' + name.entry_year
									: name.can_edit && <Span>Editování</Span>}
							</Paragraph>
							{props.changingPeople && (
								<SubmitButton
									type="submit"
									value="Změnit"
									onClick={() => handleClickChanging(name.UserId)}
								/>
							)}
							{props.deletingPeople && (
								<SubmitButton
									type="submit"
									value="Odstranit"
									onClick={() => handleClickDeleting(name.UserId)}
								/>
							)}
						</List>
					),
			)
		}
	}
	return (
		<ThemeProvider theme={theme}>
			<Box>
				<Settings>
					<Container>
						<Input
							onChange={e => setReference(e.target.value)}
							type="text"
							placeholder="Search..."
						/>
					</Container>
				</Settings>
				<InList>
					<Paragraph2>Jméno</Paragraph2>
					<Paragraph2>Příjmení</Paragraph2>
					<Paragraph2>User</Paragraph2>
					<Paragraph2>E-mail</Paragraph2>
					<Paragraph2>Tel. číslo</Paragraph2>
					<Paragraph2>Role</Paragraph2>
					<Paragraph2>Ostatní</Paragraph2>
					{props.changingPeople || props.deletingPeople ? (
						<Paragraph></Paragraph>
					) : null}
				</InList>
				<UnsortedList>{funcNames()}</UnsortedList>
			</Box>
		</ThemeProvider>
	)
}
