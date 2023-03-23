import "./App.css";
import logoFreeCodeCamp from "./imagenes/freecodecamp-logo.png";
import Boton from "./componentes/Boton";
import Pantalla from "./componentes/Pantalla";
import BotonClear from "./componentes/BotonClear";
import { useState } from "react"; //hooks
import { evaluate } from "mathjs";

function App() {
  const [numeroActual, setNumeroActual] = useState("");
  const [numeroAnterior, setNumeroAnterior] = useState("");
  const [operador, setOperador] = useState("");

  const agregarOperador = (valor) => {
    if (operador) {
      const [resulPrev, isNewValue] = validarOperacion(numeroActual);

      setNumeroActual(resulPrev + valor);

      // eslint-disable-next-line no-unused-expressions
      isNewValue ? setNumeroAnterior(resulPrev) : null;
    } else {
      setNumeroAnterior(numeroActual);
      setNumeroActual(numeroActual + valor);
    }

    setOperador(valor);
  };

  const validarOperacion = (value) => {
    const signos = ["+", "-", "*", "/"];
    let resultado = numeroAnterior;

    let isNewValue = false;

    signos.forEach((signo) => {
      if (value.includes(signo)) {
        const index = value.indexOf(signo);

        const isLast = index === value.length - 1;
        console.log(isLast, value.length, value);
        if (!isLast) {
          resultado = evaluate(value);
          console.log(typeof resultado);
          isNewValue = true;
        }
      }
    });

    return [resultado, isNewValue];
  };
  const agregarInput = (valor) => {
    if (valor === "." && numeroActual.includes(".")) return;
    setNumeroActual(numeroActual + valor);
  };

  const calcularResultado = () => {
    if (numeroActual) {
      const resultado = evaluate(numeroActual);
      setNumeroActual(resultado.toString());
      setOperador("");
    } else {
      alert("Ingresar un valor");
    }
  };

  return (
    <div className="App">
      <div className="contenedor-logo-freecodecamp">
        <img
          className="logo-freecodecamp"
          src={logoFreeCodeCamp}
          alt="Logo de freeCodeCamp"
        />
      </div>
      <div className="contenedor-calculadora">
        <Pantalla input={numeroActual} />

        <div className="fila">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarOperador}>+</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarOperador}>-</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarOperador}>*</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarOperador}>/</Boton>
        </div>
        <div className="fila">
          <BotonClear
            manejarClear={() => {
              setNumeroActual("");
              setNumeroAnterior("");
              setOperador("");
            }}
          >
            Clear
          </BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
