import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos }) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
    
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => parseInt(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado
        
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed()
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)
    }, [gastos])
    
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        })
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
                    pathColor: '#3B82F6',
                    textColor : '#3B82F6'

                })} />
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
