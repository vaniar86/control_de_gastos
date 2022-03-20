import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import iconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem("gastos")) : []);
  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    
    const presupuestoLS = localStorage.getItem('presupuesto')
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) handleNuevoGasto();
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setIsOpen(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };
  const guardarGastos = (value) => {
    if (value.id) {
      const gastoActualizado = gastos.map((gastoState) =>
        gastoState.id === value.id ? value : gastoState
      );
      setGastos(gastoActualizado);
      setGastoEditar({})
    } else {
      value.id = crypto.randomUUID();
      // value.id = generarId()
      value.fecha = Date.now();
      setGastos([...gastos, value]);
    }
  };
  const eliminarGasto = (gastoId) => {
    const gastosActualizado = gastos.filter((gasto) => gasto.id !== gastoId);
    setGastos(gastosActualizado);
  };

  return (
    <div className={isOpen ? "fijar" : ""}>
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
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGastos={guardarGastos}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
