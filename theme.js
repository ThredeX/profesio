import styled from 'styled-components'

export const Form = styled.form`
    width: clamp(20rem, 20vw, 80vw);
    margin: 0 auto;
`
export const Field = styled.input`
    width: 100%;
    border: 1px ${process.env.NEXT_PUBLIC_COLOR_BLACK} solid;
    border-radius: 20px;
    margin-block: .3rem;
    padding: .3rem .6rem;
    &::placeholder {
        color: grey;
    }
`
export const SubmitButton = styled.input`
    border-radius: 20px;
    border: none;
    padding: .5rem 3rem;
    height: 2.5rem;
    background-color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
    color: #fff;
    cursor: pointer;
`
export const BackButton = styled.button`

`
export const SaveButton = styled.button`

`