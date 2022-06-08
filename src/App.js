import { useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import MovimientoList from "./components/MovimientoList";
function App() {
  const [tipo, setTipo] = useState("");
  const [saldoInicial] = useState(10000000);
  const [saldoFinal, setSaldoFinal] = useState(saldoInicial);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [movimientos, setMovimientos] = useState([]);
  const [edit, setEdit] = useState(null);

  return (
    <div>
      <Navbar
        saldoInicial={saldoInicial}
        saldoFinal={saldoFinal}
      />
      <br />
      <div className="row">
        <div className="col-md-6">
          <Form
            tipo={tipo}
            nombre={nombre}
            cantidad={cantidad}
            setTipo={setTipo}
            setNombre={setNombre}
            setCantidad={setCantidad}
            movimientos={movimientos}
            setMovimientos={setMovimientos}
            saldoFinal={saldoFinal}
            setSaldoFinal={setSaldoFinal}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
        <div className="col-md-6">
          <MovimientoList movimientos={movimientos} setMovimientos={setMovimientos} saldoFinal={saldoFinal} setSaldoFinal={setSaldoFinal} setEdit={setEdit} />
        </div>
      </div>
    </div>
  );
}

export default App;
