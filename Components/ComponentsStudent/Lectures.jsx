import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, SubmitButton } from '../../theme'

const LecturesList = styled.ul``
const Lecture = styled.li`
	display: flex;
	align-items: center;
	margin: 10px;
	form {
		display: flex;
		align-items: center;
		input[type='text'] {
			padding: 0.2rem;
			color: ${props => props.theme.text};
			border: none;
			display: flex;
			align-items: center;
			background-color: #00000000;
		}
	}
`
export default function Lectures() {
	const [lectures, setLectures] = useState([])

	useEffect(() => {
		fetch('../../api/school/lecture')
			.then(res => res.json())
			.then(data => {
				setLectures(data)
			})
			.catch(err => console.error(err))
	}, [])
	function toLecture(e) {
		e.preventDefault()

		if (true) {
			fetch(`../../api/school/lecture/${e.target.id.value}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			}).catch(err => console.error(err))
		} else {
			fetch(`../../api/school/lecture/${e.target.id.value}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
			}).catch(err => console.error(err))
		}
	}
	return (
		<Box>
			<LecturesList>
				{lectures?.map(
					lecture =>
						lecture.Subject?.name &&
						lecture.Teacher?.User?.surname && (
							<Lecture key={lecture.id}>
								<form onSubmit={e => toLecture(e)}>
									<input
										type="hidden"
										name="id"
										value={lecture.id}
										readOnly
									/>
									<input
										readOnly
										type="text"
										value={lecture.Subject?.name}
									/>
									<input
										readOnly
										type="text"
										value={lecture.Teacher?.User?.surname}
									/>
									{lecture.id % 2 == 0 ? (
										<SubmitButton type="submit" value="Přihlásit" />
									) : (
										<SubmitButton type="submit" value="Odhlásit" />
									)}
								</form>
							</Lecture>
						),
				)}
			</LecturesList>
		</Box>
	)
}
