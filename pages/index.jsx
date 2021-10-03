import styled from 'styled-components'
import Header from '../Components/Header'
import { NextRouter, useRouter } from 'next/router'
import {Formik} from 'formik'
import {Form, Field, Pol} from '../theme'
import Link from 'next/link'

//login page and header PROFESIO and menu stay for all pages 
const Heading1 = styled.h1`
    text-align: center;
    font-size: 3.5rem;
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`
const Paragraph = styled.p`
    border-radius: 20px;
    padding: .5rem 1rem;
    height: 2.5rem;
    border: 1px solid ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
    cursor: pointer;
    color: ${process.env.NEXT_PUBLIC_COLOR_BLACK};
`

const Index = () =>  {
    var router = useRouter()
    return (
        <>
            <Header menu='none'/>
            <main>
                <Heading1>
                    Login
                </Heading1>
                <Formik initialValues={{
                    name: '',
                    password: '',
                }}
                onSubmit={() => {
                    router.push('peoples/administrator')
                }}>
                    <Form>
                        <Field type='text' name='name' id='name' placeholder='Username'/>
                        <Field type='password' name='password' id='password' placeholder='Password'/>
                        <Container>
                            <Paragraph>
                                Zapomenuté heslo?
                            </Paragraph>

                            {/* <SubmitButton type="submit" value="Login" /> */}
                            <Link href='/peoples/administrator'><a>dasdas</a></Link>
                        </Container>
                    </Form>
                </Formik>
                <Pol></Pol>
            </main>
        </>
    )
}
export default Index