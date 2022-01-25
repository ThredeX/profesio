import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const LecturesList = styled.ul`

`
const Lecture = styled.li``
export default function Lectures() {
    const [lectures, setLectures] = useState([])

    useEffect(() => {
        fetch('../../api/school/lecture')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }, [])

    return (
        <LecturesList>
        {
            lectures?.map(lecture => (
                <Lecture>
                    {}
                </Lecture>
            ))
        }
        </LecturesList>
    )
}
