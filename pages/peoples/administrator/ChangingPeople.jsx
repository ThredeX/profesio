import React, { useContext, useState, useEffect } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import styled, { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main, Paragraph, Box } from '../../../theme'
import ListOfPeople from '../../../Components/ComponentsAdministrator/ListOfPeople'

const ChangingPeople = (props) => {
    const [state, setState] = useState([{email: ''}])
    const [local, setLocal] = useState(null)
    useEffect(() => {
      setLocal(JSON.parse(localStorage.getItem('id_user')))
    })
    useEffect(() => {
		fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
			.then(res => res.json())
			.then(data => {
				setState(data)
                console.log(data);
			})
			.catch(err => console.error(err))
	}, [])
    console.log(local);

    return (
		<>
			<ThemeProvider theme={useContext(Context)}>
				<Header />
				<NavBar route="administrator" theme={useContext(Context)}/>
				<MainHeading>Změna nastavení uživatelů</MainHeading>
				<Main>
                    <ListOfPeople comp={true} />
                     <Box>
                        {(!!local && !!state) ? <Paragraph>{state[local].email}</Paragraph> : null} 
                    </Box>
                </Main>
			</ThemeProvider>
		</>
    )
}
export default ChangingPeople