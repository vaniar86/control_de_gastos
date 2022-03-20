import { useState, useEffect } from "react";
import iconoCerrar from "../img/cerrar.svg";
import { options } from "../constanst";
import { initialValue } from "../constanst";
import Message from "./Message";

const Modal = ({
  setIsOpen,
  animarModal,
  setAnimarModal,
  guardarGastos,
    gastoEditar,
    setGastoEditar
}) => {
  const [formData, setFormData] = useState(initialValue);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (Object.keys(gastoEditar).length > 0) {
          setFormData(gastoEditar)
    }
  }, []);

  const handleClose = () => {
    setAnimarModal(false);
      setFormData(initialValue);
    setTimeout(() => {
        setIsOpen(false);
        setGastoEditar({})
    }, 1000);

  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (Object.values(formData).includes("")) {
      setError("Todos los campos son obligatorios");

      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
      }
        
    guardarGastos(formData);
    handleClose();
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={iconoCerrar} alt="icono cerrar modal" onClick={handleClose} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
              <legend>{Object.keys(gastoEditar).length > 0 ? 'Editar Gasto' : ' Nuevo Gasto'}</legend>
        {error && <Message tipo="error">{error}</Message>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>

          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Añade el nombre del gasto"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={formData.cantidad}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={formData.categoria}
            onChange={handleChange}
            name="categoria"
          >
            <option value="">-- Seleccione --</option>
            {options &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}-
                </option>
              ))}
          </select>
        </div>
              <input type="submit" value={Object.keys(gastoEditar).length > 0 ? 'Editar Gasto' : 'Cargar Gasto'} />
      </form>
    </div>
  );
};

export default Modal;
