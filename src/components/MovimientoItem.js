import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const MovimientoItem = ({ movimiento, deleted, setEdit }) => {
    return (
        <li className="list">
            <div className="list-item">
            <button className="btn btn-light" onClick={() => setEdit(movimiento)}>
                    <MdEdit />
                </button>
                <button className="btn btn-light" onClick={() => deleted(movimiento)}>
                    <FaTrash />
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>{movimiento.nombre}</label>
            </div>
            <div className="list-item-2">
                <label className={movimiento.tipo === "Ingreso"? "alert alert-success" : "alert alert-danger"}>{new Intl.NumberFormat('es-MX').format(movimiento.cantidad)}</label>
            </div>
        </li>
    );
};

export default MovimientoItem;
