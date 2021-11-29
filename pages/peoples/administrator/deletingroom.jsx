import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'

import { MainHeading, Main, Select2, Option, Box, SubmitButton } from '../../../theme'
import { Context } from '../../_app'


const fakulty = [
    {
        id: 0,
        name: 'Fakulta informačních technologií',
        shortName: 'FIT',
        mistnost: [
            {
                nameMistnost: 'C305',
            },
            {
                nameMistnost: 'A705',
            },
            {
                nameMistnost: 'B102',
            },
        ],
    },
    {
        id: 1,
        name: 'Fakulta Stavební',
        shortName: 'FAST',
        mistnost: [
            {
                nameMistnost: 'C305',
            },
            {
                nameMistnost: 'A705',
            },
            {
                nameMistnost: 'B607',
            },
        ],
    },
    {
        id: 2,
        name: 'Fakulta Podnikatelská',
        shortName: 'FP',
        mistnost: [
            {
                nameMistnost: 'C309',
            },
            {
                nameMistnost: 'A705',
            },
            {
                nameMistnost: 'A707',
            },
        ],
    },
]
const Margin = styled.div`
    margin-block: ${props => props.m}rem;
`
const DeletingRoom = () => {
	const [fakulta, setFakulta] = useState(0)
	const [mistnost, setMistnost] = useState()

    function handleSubmit() {
        try {
            if(confirm(`Opravdu si přejete odstranit místnost ${fakulty[fakulta].mistnost[mistnost].nameMistnost}?`)) {
                alert(`Místnost ${fakulty[fakulta].mistnost[mistnost].nameMistnost} byla odstraněna.`);
            }
        }
        catch {
            alert('Nebyla vybrána žádná místnost')
        }
    }

	return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" />
				<MainHeading>Odstanění rozvrhů</MainHeading>
				<Main>
					<Box>
                        <br />
						<Select2
							name="fakulty"
							onChange={e => setFakulta(e.target.value)}>
                                <Option>
									-
								</Option>
							{fakulty.map((fakulta, i) => (
								<Option value={i} key={i}>
									{fakulta.name}
								</Option>
							))}
						</Select2>
                        <Margin m={1}></Margin>
						<Select2
							name="mistnosti"
							onChange={e => setMistnost(e.target.value)}>
                                 <Option>
									-
								</Option>
							{fakulty[fakulta].mistnost.map((mistnost, i) => (
								<Option value={i} key={i}>
									{mistnost.nameMistnost}
								</Option>
							))}
						</Select2>
                        <Margin m={2}></Margin>
                        <SubmitButton value='Odstranit' onClick={handleSubmit} type='submit'/>
					</Box>
				</Main>
			</ThemeProvider>
		</>
	)
}
export default DeletingRoom
