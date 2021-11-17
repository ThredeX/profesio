import { useContext } from 'react'
import { Context } from '../../_app'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'

const Index = (props) => {

    return (
        <>
            <Header/>
            <NavBar route="administrator" theme={useContext(Context)}/>
        </>
    )
}
export default Index

