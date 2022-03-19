import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers"
import iconoNuevoGasto from "./img/nuevo-gasto.svg";


function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [ gastos, setGastos]= useState([])
  
  useEffect(() => {
    const getOfGastos = () => {
      const data = JSON.parse(localStorage.getItem('gastos')) ?? []

      setGastos(data)
    }
    getOfGastos()
  },[])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  },[gastos])

  const handleNuevoGasto = () => {
    setIsOpen(true)

    setTimeout(() => {
      setAnimarModal(true)
    },500)
  }  
  const guardarGastos = (value) => {
    value.id= crypto.randomUUID()
    // value.id = generarId()
    value.fecha= Date.now()

    setGastos([...gastos, value])
  }
  return (
    <div className={isOpen? 'fijar': ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
        <main>
          <ListadoGastos gastos={gastos} />
        </main>
        <div className="nuevo-gasto">
          <img src={iconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
        </div>
        </>
      )}
      {isOpen &&
        <Modal
        setIsOpen={setIsOpen}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGastos={guardarGastos}
        />
      }
    </div>
  );
}

export default App;
