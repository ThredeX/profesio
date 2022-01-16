import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'

import { MainHeading, Main, Select2, Option, Box, SubmitButton } from '../../../theme'
import { logged } from '../../../utils/logged'
import { Context } from '../../_app'

const Margin = styled.div`
	margin-block: ${props => props.m}rem;
`

const DeletingRoom = () => {
	const [room, setRoom] = useState(null)
	const [delRoom, setDelRoom] = useState(null)
	const [load, setLoad] = useState(false)

	useEffect(() => {
		fetch('../../../api/faculty/room')
			.then(res => res.json())
			.then(data => setRoom(data))
			.catch(err => console.error(err))
	})
	function handleSubmit() {
		try {
			if (confirm(`Opravdu si přejete odstranit místnost?`)) {
				fetch(`../../../api/faculty/room/${delRoom}`, {
					method: 'DELETE',
				})
				alert(`Místnost byla odstraněna`)
			}
		} catch {
			alert('Nebyla vybrána žádná místnost')
		}
	}
	useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	})
	return (
		load && (
			<>
				<ThemeProvider theme={useContext(Context)}>
					<Header />
					<NavBar route="administrator" />
					<MainHeading>Odstanění místností</MainHeading>
					<Main>
						<Box>
							<br />
							<Select2
								name="delrooms"
								onChange={e => setDelRoom(e.target.value)}>
								<Option>-</Option>
								{room?.map(r => (
									<Option value={r.id} key={r.id}>
										{r.label}
									</Option>
								))}
							</Select2>
							<Margin m={1}></Margin>
							<SubmitButton
								value="Odstranit"
								onClick={handleSubmit}
								type="submit"
							/>
						</Box>
					</Main>
				</ThemeProvider>
			</>
		)
	)
}
export default DeletingRoom
