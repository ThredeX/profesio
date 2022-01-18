import styled from 'styled-components'

export const Form = styled.form`
	width: clamp(20rem, 20vw, 80vw);
`

export const Form2 = styled.form`
	width: clamp(15rem, 80%, 80vw);
	margin-left: 1rem;
`
export const Input = styled.input`
	width: 100%;
	border: 1px ${props => props.theme.text} solid;
	border-radius: 4px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	&::placeholder {
		color: #999;
	}
`
export const SubmitButton = styled.input`
	margin-top: .2rem;
	border-radius: 4px;
	border: none;
	padding: 0.5rem 3rem;
	height: 1.95rem;
	background-color: ${props => props.theme.color};
	color: #fff;
	cursor: pointer;
	float: right;
	box-shadow: 0 0px 0 1px ${props => props.theme.color};
	&:hover {
		opacity: .7;
	}
	&:active{
		box-shadow: unset;
	}
`
export const SubmitButton2 = styled.input`
	margin-top: .2rem;
	border-radius: 4px;
	border: none;
	height: 1rem;
	background-color: ${props => props.theme.color};
	color: #fff;
	font-size: .7rem;
	cursor: pointer;
	float: right;
	box-shadow: 0 0px 0 1px ${props => props.theme.color};
	&:hover {
		opacity: .7;
	}
	&:active{
		box-shadow: unset;
	}
`
export const Radio = styled.input`
	cursor: pointer;
	&:after {
		content: '';
		width: 13px;
		height: 13px;
		border-radius: 8px;
		top: -2px;
		left: -1px;
		position: relative;
		background-color: #fff;
		display: inline-block;
		visibility: visible;
		border: 2px solid ${props => props.theme.text};
	}
	&:checked:after {
		background-color: ${props => props.theme.color};
	}
`
export const MainHeading = styled.h1`
	text-align: center;
	font-size: clamp(1.5rem, 3vw, 3rem);
	font-weight: 100;
	color: ${props => props.theme.text};
	margin-top: -1rem;
`
export const Heading2 = styled.h2`
	text-align: center;
	font-size: clamp(1.5rem, 2vw, 2rem);
	font-weight: 100;
	color: ${props => props.theme.text};
`
export const Label = styled.label`
	font-weight: 100;
	width: 10rem;
	padding: 0 0.5rem;
	display: flex;
	align-items: center;
	color: ${props => props.theme.text};
`
export const Select = styled.select`
	width: 100%;
	border-radius: 4px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	font-weight: 100;
	background-color: ${props => props.theme.box};
`
export const Option = styled.option`
	border: none;
	color: #777;
`
export const Select2 = styled.select`
	width: 100%;
	border: 1px ${props => props.theme.text} solid;
	border-radius: 4px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	&::placeholder {
		color: #999999;
	}
`
export const Main = styled.main`
	height: 80vh;
	padding-top: 2rem;
`
export const Paragraph = styled.p`
	color: ${props => props.theme.color};
`
export const Box = styled.div`
	font-weight: 100;
	margin: 1.5rem 0rem 0rem 1rem;
	padding: 10px;
	border-radius: 8px;
	position: relative;
	overflow: hidden;
	box-shadow: 0 0 5px 3px ${props => props.theme.shadow};
	background-color: ${props => props.theme.box};

	&::-webkit-scrollbar {
		height: 10px;
	}
	&::-webkit-scrollbar-thumb {
		box-sizing: border-box;
		width: 10px;
		background-color: ${props => props.theme.color};
		border-radius: 10px;
	}
`
export const Table = styled.table`
	color: ${props => props.theme.text};
	text-align: center;
	border-collapse: collapse;
	border: 2px ${props => props.theme.box} solid;
	width: ${props => props.size * 8 + 'rem'};
	margin: 20px;
	font-size: clamp(1rem, 1.5vw, 1.5rem);
`
export const Th = styled.th`
	font-weight: 100;
	color: ${props => props.theme.text};
	border: 1px solid ${props => props.theme.tableLine};
	position: relative;
	height: 100%;
	&:nth-child(1) {
		border: none;
	}
`
export const Td = styled.td`
	width: 8rem;
	position: relative;
	border: 1px solid ${props => props.theme.tableLine};
	padding: 0.4rem;
	text-align: center;
`
export const Tr = styled.tr`
	height: 5rem;
	width: 5rem;
	@media screen and (max-width: 500px) {
		width: 2rem;
		font-size: 1rem;
		height: 2rem;
	}
`
export const Tbody = styled.tbody`
	width: 100%;
`
export const Thead = styled.thead`
	width: 100%;
`
