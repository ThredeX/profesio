import React, { useRef, useState, useContext, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFolderPlus,
	faFolderMinus,
	faFolderOpen,
	faUserPlus,
	faUserMinus,
	faUserGear,
	faGear,
	faGears,
	faUser,
	faTable,
	faFileAlt,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Context } from '../pages/_app'
import { logged } from '../utils/logged'
import logout from '../utils/logout'
const Container = styled.div`
	&::-webkit-scrollbar {
		width: 0px;
	}
	position: fixed;
	overflow-y: scroll;
	padding: 0 15px;
	height: 100%;
	border-radius: 30px;
`
const Paragraph = styled.p`
	color: ${props => props.theme.text};
	text-overflow: ellipsis;
	width: 230px;
	white-space: nowrap;
	overflow: hidden;
	margin: 15px;
`
const Heading1 = styled.h1`
	font-weight: 400;
	display: flex;
	height: 3rem;
	align-items: center;
	margin-top: .7rem;
	margin-right: 2rem;
`
const Line = styled.div`
	margin-block: 2rem;
`
const A = styled.a`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	margin-block: 0.3rem;
`
const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255, 255, 255, 0);
	border-radius: 30px;
	padding: 8px;
	position: relative;
	transition: background 0.3s ease-in-out;
	&:hover {
		background-color: #e4e4e4;
	}
`
const Nav = styled.nav`
	min-height: 100vh;
	position: fixed;
	box-shadow: -2px 0 1px 0 #0f0f0fc1;
	width: 60px;
	top: 0;
	z-index: 20;
	right: 0;
	background-color: ${props => props.theme.nav};
	color: ${props => props.theme.text};
	transition: width 0.5s ease;
`
const Handle = styled.div`
	border-radius: 10px 0 0 10px;
	width: 12px;
	height: 100px;
	padding: 5px;
	position: absolute;
	top: 50%;
	left: -10px;
	opacity: 0;
	transform: translate(-50%, -50%);
	transition: opacity 0.5s ease;
	cursor: pointer;
	background-color: ${props => props.theme.color};
	${Nav}:hover & {
		opacity: 1;
	}
`
const DivHeading = styled.div`
	background-color: #121212;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-content: center;
	border-radius: 20rem;
	justify-content: center;
	align-items: center;
margin-bottom: 2rem;

	margin-top: .4rem;
	margin-right: 1rem;
	height: 3rem;
	opacity: 0;
`
const LogoutButton = styled.button`
	color:${props => props.theme.color};
	border: none;
	height: 3rem;
	cursor: pointer;
	border-radius: 3rem;
	width: 6rem;
	background-color: #ffffff00;
	border: 2px ${props => props.theme.color} solid ;


`
const UserSymbol = styled.button`
	color: ${props => props.theme.text};
	height: 3rem;
	width: 3rem;
	font-size: 1.4rem;
	border-radius: 50%;
	opacity: .9;
	background-color: ${props => props.theme.color};
	border: 2px ${props => props.theme.color} solid ;
`
export default function NavBar({ route }) {
	const faIconSize = { width: '19px', height: '19px' }
	const [state, setState] = useState(false)
	const navRef = useRef(null)
	const [name, setName] = useState('')
	const theme = useContext(Context)
	useEffect(async () => {
		let data = await logged()
		if (data) {
			setName(data.surname)
		}
	}, [])
	function navHandling() {
		let displayMenuOpen = document.getElementsByClassName('noneOpen')
		if (state === false) {
			navRef.current.style.width = 'clamp(100px, 60vw, 300px)'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '1'
			}
			setState(true)
		} else {
			navRef.current.style.width = '60px'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '0'
			}
			setState(false)
		}
	}
	return (
		<ThemeProvider theme={theme}>
			<Nav ref={navRef}>
				<Container>
					<DivHeading className="noneOpen">
					<UserSymbol>{name.slice(0, 1).toUpperCase()}</UserSymbol>
						<Heading1>{(name?.length > 6) ? name.slice(0, 7) + '..' : name}</Heading1>
						<LogoutButton onClick={logout} >Odhlásit se</LogoutButton>
					</DivHeading>
					<>
						{route == 'administrator' ? (
							<div>
								<Link href={`/peoples/${route}/addingroom`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderPlus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přidat místnost
										</Paragraph>
									</A>
								</Link>
								
								<Link href={`/peoples/${route}/deletingroom`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderMinus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Odebrat místnost
										</Paragraph>
									</A>
								</Link>
								<Line></Line>
								<Link href={`/peoples/${route}/addingpeople`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserPlus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přidat uživatele
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/changingpeople`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Změnit uřivatele
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/deletingpeople`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserMinus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Odebrat uživatele
										</Paragraph>
									</A>
								</Link>
								<Line></Line>
								<Link href={`/peoples/${route}/subjectmodify`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFileAlt}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přidat/odebrat předmět
										</Paragraph>
									</A>
								</Link>
								<Line></Line>
								<Link
									href={`/peoples/${route}/schoolsettings`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGears}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení školy
										</Paragraph>
									</A>
								</Link>
								<Link href={`/peoples/${route}/settings`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : route == 'teacher' ? (
							<div>
								<Link href={`/peoples/${route}/timetable`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faTable}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Rozvrh
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/timetable`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderOpen}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Úprava rozvrhu
										</Paragraph>
									</A>
								</Link>

								<Link href={`/peoples/${route}/settings`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : route == 'student' ? (
							<div>
								<Link href={`/peoples/${route}/timetable`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faTable}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Rozvrh
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/timetablecreate`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderPlus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přihlášení na přednášky
										</Paragraph>
									</A>
								</Link>
								<Link href={`/peoples/${route}/settings`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : null}
					</>
				</Container>
				<Handle onClick={navHandling}></Handle>
			</Nav>
		</ThemeProvider>
	)
}
