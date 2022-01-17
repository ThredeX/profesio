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
const Margin = styled.div`
	margin-block: 1rem;
`
const FormBuild = styled.form`
	display: flex;
	margin-top: 1rem;
	& > select {
		width: 10rem;
	}
	& > select,
	input {
		margin-right: 2rem;
	}
`
const AddingRoom = () => {
	const [state, setState] = useState(0)
	const [faculties, setFaculties] = useState(null)
	const [buildings, setBuildings] = useState(null)
	const [facultySet, setFacultySet] = useState(null)
	const [reload, setReload] = useState(0)
	const [load, setLoad] = useState(false)
	const [build, setBuild] = useState(null)
	const [buildProp, setBuildProp] = useState(null)
	const [delBuild, setDelBuild] = useState(null)
	const [room, setRoom] = useState(null)
	const [delRoom, setDelRoom] = useState(null)
	const [allRoom, setAllRoom] = useState(null)
	const [roomProp, setRoomProp] = useState(null)
	const context = useContext(Context)

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
				console.log(data)
			})
			.catch(err => console.error(err))
	}, [, reload, room])
	useEffect(() => {
		fetch('../../../api/school/building')
			.then(res => res.json())
			.then(data => {
				setBuildings(data)
				console.log(data)
			})
			.catch(err => console.error(err))
	}, [, reload, facultySet])

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
			setReload(e.target.faculty_deleteID.value)
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
		setReload(true)
	}
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	})
	function addBuild() {
		console.log(state, build)
		fetch('../../../api/school/building', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ id: state, address: build }),
		}).catch(err => {
			console.error(err)
		})
		setReload(state)
	}
	function deleteBuild() {
		fetch(`/api/school/building/${delBuild}`, {
			method: 'DELETE',
		})
		setReload(state)
	}
	function addRoom() {
		console.log(state, build)
		fetch('../../../api/faculty/room', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ BuildingId: buildProp, label: room }),
		}).catch(err => {
			console.error(err)
		})
		setReload(buildProp)
	}
	function deleteRoom() {
		fetch(`/api/faculty/room/${delRoom}`, {
			method: 'DELETE',
		})
		setReload(delRoom)
	}
	return (
		load && (
			<>
				<ThemeProvider theme={context}>
					<Header />
					<NavBar route="administrator" />
					<MainHeading>Přidání Rozvrhů</MainHeading>
					<Main>
						<Box>
							<H2>Fakulty: </H2>
							<Container>
								<FormRadio
									onChange={e => setFacultySet(e.target.value)}>
									<H3>Vyberte operaci: </H3>
									<div>
										<Div>
											<Label htmlFor="radio1">Přídání: </Label>
											<Radio
												type="radio"
												name="radio"
												id="radio1"
												value="add"
											/>
										</Div>
										<Div>
											<Label htmlFor="radio2">Odstranění: </Label>
											<Radio
												type="radio"
												name="radio"
												id="radio2"
												value="delete"
											/>
										</Div>
									</div>
								</FormRadio>
								{facultySet === 'add' ? (
									<Form onSubmit={addFaculty}>
										<FormDiv>
											<Input
												type="text"
												name="faculty_name"
												placeholder="Název fakulty"
											/>
										</FormDiv>
										<FormDiv>
											<Input
												type="text"
												name="faculty_shortName"
												placeholder="Zkratka fakulty"
											/>
										</FormDiv>
										<SubmitButton type="submit" value="Přidat" />
									</Form>
								) : (
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
								)}
							</Container>
						</Box>
						<Box>
							<FormBuild>
								<Input
									onChange={e => setRoom(e.target.value)}
									style={{ maxWidth: '10rem' }}
									placeholder="Název místnosti"
								/>
								<SubmitButton
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
									type="button"
									value="Odebrat místnost"
									onClick={deleteRoom}
								/>
							</FormBuild>
							<FormBuild>
								<Input
									onChange={e => setBuild(e.target.value)}
									style={{ maxWidth: '10rem' }}
									placeholder="Název budovy"
									title="Budova, do které budete přidávat místnosti/rozvrhy"
								/>
								<SubmitButton
									type="button"
									value="Přidat budovu"
									onClick={addBuild}
								/>
							</FormBuild>
							<FormBuild>
								<Select2
									name="building"
									onChange={e => setDelBuild(e.target.value)}>
									<Option>-</Option>

									{buildings?.map(building => (
										<Option value={building.id} key={building.id}>
											{building.address}
										</Option>
									))}
								</Select2>
								<SubmitButton
									type="button"
									value="Odebrat budovu"
									onClick={deleteBuild}
								/>
							</FormBuild>
							<FormBuild>
								<Select2
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
									name="setbuilding"
									onChange={e => setBuildProp(e.target.value)}>
									<Option>-</Option>

									{buildings?.map(building => (
										<Option value={building.id} key={building.id}>
											{building.address}
										</Option>
									))}
								</Select2>
								<Select2
									name="room"
									onChange={e => setRoomProp(e.target.value)}>
									<Option>-</Option>

									{allRoom?.map(room => (
										<Option value={room.id} key={room.id}>
											{room.label}
										</Option>
									))}
								</Select2>
							</FormBuild>
						</Box>
						{state && buildProp && roomProp && (
							<TimetableComp faculty={state} room={roomProp} />
						)}
					</Main>
				</ThemeProvider>
			</>
		)
	)
}
export default AddingRoom
