import React, { useEffect, useState } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { options } from "../constanst";
import { formaterFecha } from "../helpers";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoGastosVarios from "../img/icono_gastos.svg";
import IconoRecreación from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const diccionarioOpciones = {
  Ahorro: IconoAhorro,
  Comida: IconoComida,
  Casa: IconoCasa,
  "Gastos Varios": IconoGastosVarios,
  Recreación: IconoRecreación,
  Salud: IconoSalud,
  Suscripciones: IconoSuscripciones,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const [option, setOption] = useState("");
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  useEffect(() => {
    let option;
    option = options.find(
      (option) => Number(option.value) === Number(categoria)
    );
    setOption(option.label);
  }, []);

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => eliminarGasto(gasto.id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioOpciones[option]} alt={`icono ${option}`} />
            <div className="descripcion-gasto">
              <p className="categoria">{option}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formaterFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <o className="cantidad-gasto">${cantidad}</o>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
