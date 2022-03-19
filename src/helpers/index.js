export const generarId = () => {
    const random = Math.random().toString(36).slice(2)
    const fecha = Date.now().toString(36).slice(2)
    return random + fecha
}
export const formaterFecha = (fecha) => {
    const newDate= new Date(fecha)
    let options = {
        year: 'numeric', month: '2-digit', day: 'numeric' 
    }
    return newDate.toLocaleDateString('es-ES', options);
}