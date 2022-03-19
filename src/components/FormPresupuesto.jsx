import React, { useState } from 'react'
import Message from './Message'

const FormPresupuesto = ({ presupuesto, setPresupuesto , setIsValidPresupuesto}) => {
    const [ message, setMessage] = useState('')
    
    const handlePresupuesto = (ev) => {
        ev.preventDefault()
        if (!(presupuesto) || (presupuesto) < 0) {
            setMessage('No es un presupuesto válido')
            return
        }
        setMessage('')
        setIsValidPresupuesto(true)

    }
    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>
                    <input
                        type="number"
                        placeholder='Añade tu presupuesto'
                        className='nuevo-presupuesto'
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value='Añadir' onClick={handlePresupuesto} />
                {message && <Message tipo='error'>{message}</Message>}

            </form>
            
        </div>
    )
}

export default FormPresupuesto
