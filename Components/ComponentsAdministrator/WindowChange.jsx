import React from 'react';
import { SubmitButton } from '../../theme'


export default function WindowChange({id}) {


    function handleClick() {
        localStorage.setItem('id_user', JSON.stringify(id))
    }

  return (
    <>
        <SubmitButton type='submit' value='Změnit' onClick={handleClick} />
    </>
  );
}
