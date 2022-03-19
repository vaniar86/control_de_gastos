import { useEffect, useState } from 'react'

const ControlPresupuesto = ({ presupuesto, gastos }) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => parseInt(gasto.cantidad) + total, 0)
        const totalDisponible= presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    },[gastos])
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        })
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <p>Grafica Aquí</p>
            </div>
            <div className='contenido-presupuesto'>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible: </span> {formatearCantidad(disponible )}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>


            </div>
            
        </div>
    )
}

export default ControlPresupuesto
