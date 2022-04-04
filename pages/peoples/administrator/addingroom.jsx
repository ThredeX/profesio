import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import TimetableComp from '../../../Components/ComponentsAdministrator/TimetableComp.jsx'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import {
	MainHeading,
	Main,
	Select2,
	Option,
	Box,
	Input,
	SubmitButton,
	Form,
	Label,
	Radio,
	Paragraph,
} from '../../../theme'
import { logged } from '../../../utils/logged'
import { Context } from '../../_app'
const FormRadio = styled.form`
	width: 20rem;
	margin: 2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`
const H2 = styled.h2`
	color: ${props => props.theme.text};
	font-weight: 100;
	margin-left: 2rem;
`
const H3 = styled.h3`
	color: ${props => props.theme.text};
	font-weight: 100;
	margin-left: -1.5rem;
`
const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin-bottom: 1rem;
`
const Div = styled.div`
	width: auto;
	padding: 20px;
	display: flex;
	align-items: center;
	height: 2rem;
`
const FormDiv = styled.div`
	display: flex;
	align-items: center;
`
const FormBuild = styled.form`
	display: flex;
	margin-top: 0.1rem;
	& > select {
		width: 10rem;
	}
	& > select,
	input {
		margin-right: 2rem;
	}
	@media screen and (max-width: 540px) and (min-width: 0) {
		& {
			flex-direction: column;
		}
	}
`
const ChooseContainer = styled.div`
	display: flex;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	& > form {
		flex-wrap: nowrap;
	}
	@media screen and (max-width: 736px) and (min-width: 0) {
		& > form {
			flex-direction: column !important;
		}
		& > form > p {
			margin: 10px;
		}
	}
`
const Paragraph2 = styled.p`
	padding: 0;
	margin: 0;
	color: ${props => props.theme.text};
	display: flex;
	align-items: center;
	margin-top: -4px;
	text-align: center;
`
const ResponsCon = styled.div`
	@media screen and (max-width: 820px) {
		margin-top: 1rem;
	}
`
const AddingRoom = () => {
	const [state, setState] = useState(0)
	const [faculties, setFaculties] = useState(null)
	const [reload, setReload] = useState(0)
	const [load, setLoad] = useState(false)
	const [capacity, setCapacity] = useState(null)
	const [room, setRoom] = useState(null)
	const [delRoom, setDelRoom] = useState(null)
	const [allRoom, setAllRoom] = useState(null)
	const [roomProp, setRoomProp] = useState(null)
	const theme = useContext(Context)

	const style = {
		marginInline: 15,
	}
	useEffect(() => {
		fetch('../../../api/faculty')
			.then(res => res.json())
			.then(data => {
				setFaculties(data)
			})
			.catch(err => console.error(err))
	}, [, reload])
	useEffect(() => {
		fetch('../../../api/faculty/room')
			.then(res => res.json())
			.then(data => {
				setAllRoom(data)
			})
			.catch(err => console.error(err))
	}, [, reload, room])
	useEffect(() => {
		addBuild();
	}, [])

	function deleteFaculty(e) {
		e.preventDefault()
		if (confirm('Opravdu si přejete odstranit fakultu?')) {
			fetch(`../../../api/faculty/${e.target.faculty_deleteID.value}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			})
			alert('Fakulta byla odstraněna')
			if (reload) {
				setReload(false)
			} else setReload(true)
		}
	}
	function addFaculty(e) {
		e.preventDefault()
		fetch('../../../api/faculty', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				name: e.target.faculty_name.value,
				shortcut: e.target.faculty_shortName.value,
			}),
		})
		if (reload) {
			setReload(false)
		} else setReload(true)
	}
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	})
	function addBuild() {
		fetch('../../../api/school/building', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ id: 1, address: '' }),
		}).catch(err => {
			console.error(err)
		})
		if (reload) {
			setReload(false)
		} else setReload(true)
	}
	// function deleteBuild() {
	// 	fetch(`/api/school/building/${delBuild}`, {
	// 		method: 'DELETE',
	// 	})
	// 	if (reload) {
	// 		setReload(false)
	// 	} else setReload(true)
	// }
	function addRoom() {
		fetch('../../../api/faculty/room', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ BuildingId: 1, label: room, capacity: capacity }),
		}).catch(err => {
			console.error(err)
		})
		if (reload) {
			setReload(false)
		} else setReload(true)
	}
	function deleteRoom() {
		fetch(`/api/faculty/room/${delRoom}`, {
			method: 'DELETE',
		})
		if (reload) {
			setReload(false)
		} else setReload(true)
	}
	return (
		load && (
			<>
				<ThemeProvider theme={theme}>
					<Header />
					<NavBar route="administrator" />
					<MainHeading>Přidání Rozvrhů</MainHeading>
					<Main>
						<Box>
							<H2>Fakulty a místnosti: </H2>
							<Container>
								<div >
									<Form
										onSubmit={addFaculty}
										style={{ marginBottom: '1rem' }}>
										<FormDiv>
											<Input
												type="text"
												name="faculty_name"
												placeholder="Název fakulty"
											/>
										</FormDiv>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}>
											<FormDiv>
												<Input
													style={{ width: '10rem' }}
													type="text"
													name="faculty_shortName"
													placeholder="Zkratka fakulty"
												/>
											</FormDiv>
											<SubmitButton
												type="submit"
												value="Přidat"
											/>
										</div>
									</Form>
									<Form onSubmit={deleteFaculty}>
										<FormDiv>
											<Select2 name="faculty_deleteID">
												{faculties?.map(faculty => (
													<Option
														value={faculty.id}
														key={faculty.id}>
														{faculty.name} (
														{faculty.shortcut})
													</Option>
												))}
											</Select2>
										</FormDiv>
										<SubmitButton type="submit" value="Odstranit" />
									</Form>
								</div>
								<ResponsCon>
									<FormBuild>
										<Input
											onChange={e => setRoom(e.target.value)}
											style={{ maxWidth: '10rem' }}
											placeholder="Název místnosti"
										/>
										<SubmitButton
											style={{ width: '10rem', padding: '0' }}
											type="button"
											value="Přidat místnost"
											onClick={addRoom}
										/>
									</FormBuild>
									<FormBuild>
										<Select2
											name="room"
											onChange={e => setDelRoom(e.target.value)}>
											<Option>-</Option>

											{allRoom?.map(room => (
												<Option value={room.id} key={room.id}>
													{room.label}
												</Option>
											))}
										</Select2>
										<SubmitButton
											style={{ width: '10rem', padding: '0' }}
											type="button"
											value="Odebrat místnost"
											onClick={deleteRoom}
										/>
									</FormBuild>
								</ResponsCon>
							</Container>
						</Box>
						<Box>
							<Container>
								<div>
									{/* <FormBuild>
										<Input
											onChange={e => setBuild(e.target.value)}
											style={{ maxWidth: '10rem' }}
											placeholder="Název budovy"
											title="Budova, do které budete přidávat místnosti/rozvrhy"
										/>
										<SubmitButton
											style={{width: '10rem', padding: '0'}}
											type="button"
											value="Přidat budovu"
											onClick={addBuild}
										/>
									</FormBuild> */}
									{/* <FormBuild>
										<Select2
											name="building"
											onChange={e => setDelBuild(e.target.value)}>
											<Option>-</Option>

											{buildings?.map(building => (
												<Option
													value={building.id}
													key={building.id}>
													{building.address}
												</Option>
											))}
										</Select2>
										<SubmitButton
											style={{width: '10rem', padding: '0'}}
											type="button"
											value="Odebrat budovu"
											onClick={deleteBuild}
										/>
									</FormBuild> */}
								</div>
							</Container>
							<ChooseContainer>
								<FormBuild>
									<Paragraph2>Zadejte parametry: </Paragraph2>
									<Select2
										style={style}
										name="faculty"
										onChange={e => setState(e.target.value)}>
										<Option>-</Option>
										{faculties?.map(faculty => (
											<Option value={faculty.id} key={faculty.id}>
												{faculty.name}
											</Option>
										))}
									</Select2>
									<Select2
										style={style}
										name="room"
										onChange={e => setRoomProp(e.target.value)}>
										<Option>-</Option>

										{allRoom?.map(room => (
											<Option value={room.id} key={room.id}>
												{room.label}
											</Option>
										))}
									</Select2>
									<Input
										style={{ ...style, width: '10rem' }}
										name="setbuilding"
										onChange={e => setCapacity(e.target.value)}
										placeholder="počet míst"
									/>
								</FormBuild>
							</ChooseContainer>
						</Box>
						{state && capacity && roomProp && (
							<TimetableComp faculty={state} room={roomProp} />
						)}
					</Main>
				</ThemeProvider>
			</>
		)
	)
}
export default AddingRoom
