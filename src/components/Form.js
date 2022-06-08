import { useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import swal from 'sweetalert';


const Form = ({ tipo, nombre, cantidad, setTipo, setNombre, setCantidad, movimientos, setMovimientos, saldoFinal, setSaldoFinal, edit, setEdit }) => {


    const handleTipoChange = ({ target }) => {
        setTipo(target.value);
    };

    const handleNombreChange = ({ target }) => {
        setNombre(target.value);
    };

    const handleCantidadChange = ({ target }) => {
        setCantidad(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateMovimiento(edit.id, tipo, nombre, cantidad, edit.completed);
        } else {
            const tipoSelect = document.getElementById("tipo").value;

            if (tipoSelect === "Gasto" && saldoFinal < parseInt(cantidad)) {
                swal({
                    icon: 'error',
                    title: 'Error.... El valor a gastar es mucho mayor del disponible',
                    button: 'Aceptar'
                });
            } else {
                const newMovimiento = { id: uuid4(), tipo: tipoSelect, nombre: nombre, cantidad: cantidad, completed: false };
                const nuevoSaldoFinal = tipoSelect === "Ingreso" ? parseInt(saldoFinal) + parseInt(cantidad) : parseInt(saldoFinal) - parseInt(cantidad);
                setSaldoFinal(nuevoSaldoFinal);
                setMovimientos([...movimientos, newMovimiento]);
                swal({
                    icon: 'success',
                    title: 'Se agregó correctamente el movimiento ',
                    button: 'Aceptar'
                });
            }
            setTipo("");
            setNombre("");
            setCantidad("");
        }
    };

    const updateMovimiento = (id, tipo, nombre, cantidad, completed) => {
        const tipoSelect = document.getElementById("tipo").value;
        if (tipoSelect === "Gasto" && saldoFinal < parseInt(cantidad)) {
            swal({
                icon: 'error',
                title: 'Error.... El valor a gastar es mucho mayor del disponible',
                button: 'Aceptar'
            });
        } else {
            const oldMovimiento = movimientos.filter((movimiento) => movimiento.id === id);
            const newMovimiento = movimientos.map((movimiento) =>
                movimiento.id === id ? { id, tipo: tipo, nombre: nombre, cantidad: cantidad, completed } : movimiento
            );
            editarSaldoFinal(tipoSelect,parseInt(cantidad),oldMovimiento);
            setMovimientos(newMovimiento);
            swal({
                icon: 'warning',
                title: 'Se actualizó correctamente el movimiento',
                button: 'Aceptar'
            });
        }
        setEdit(null);
    };

    const editarSaldoFinal = (tipo,cantidadNueva,movimientoViejo) =>{
        if(tipo === "Ingreso"){
            const deshacer = parseInt(saldoFinal) - parseInt(movimientoViejo[0].cantidad);
            setSaldoFinal(deshacer + parseInt(cantidadNueva));
        }else{
            const deshacer = parseInt(saldoFinal) + parseInt(movimientoViejo[0].cantidad);
            if (deshacer < cantidadNueva){
                swal({
                    icon: 'error',
                    title: 'Error.... El valor a gastar es mucho mayor del disponible',
                    button: 'Aceptar'
                });
            }else{
                setSaldoFinal(deshacer - parseInt(cantidadNueva));
            }
        }
    }


    const limpiar = () => {
        setTipo("");
        setNombre("");
        setCantidad("");
        setEdit(null);
    }


    useEffect(() => {
        if (edit) {
            setTipo(edit.tipo);
            setNombre(edit.nombre);
            setCantidad(edit.cantidad);
        } else {
            setTipo("");
            setNombre("");
            setCantidad("");
        }
    }, [edit, setTipo, setNombre, setCantidad]);


    return (
        <div className="container">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    {edit ? "Editar Registro" : "Agregar Registro"}
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Tipo Movimiento</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" value={tipo} onChange={handleTipoChange} id="tipo" disabled={edit}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Nombre</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control-plaintext input" value={nombre} onChange={handleNombreChange} name="nombre" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Cantidad</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control-plaintext input" value={cantidad} onChange={handleCantidadChange} name="cantidad" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className='col-md-6'>
                                <button type="button" className="btn btn-light button" onClick={limpiar}>Cancelar</button>
                            </div>
                            <div className='col-md-6'>
                                <button type="submit" className={edit ? "btn btn-warning button" : "btn btn-primary button"} >{edit ? "Editar movimiento" : "Agregar Movimiento"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;