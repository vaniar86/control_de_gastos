import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {
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

    const handleResetApp = () => {
        const result = confirm("¿Está seguro que desea reiniciar los gastos y presupuesto?")
        if (result) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626':'#3B82F6',
                    textColor : porcentaje > 100 ? '#DC2626':'#3B82F6'

                })} />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
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
