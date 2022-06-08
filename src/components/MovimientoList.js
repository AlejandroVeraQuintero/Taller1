import React from "react";
import MovimientoItem from "./MovimientoItem";

const MovimientoList = ({ movimientos, setMovimientos,saldoFinal,setSaldoFinal, setEdit }) => {
    const handleDelete = ({ id }) => {
        const movimiento = movimientos.filter((movimiento) => movimiento.id === id);
            if (movimiento[0].tipo === "Ingreso"){
                setSaldoFinal(parseInt(saldoFinal) - parseInt(movimiento[0].cantidad));
            }else{
                setSaldoFinal(parseInt(saldoFinal) + parseInt(movimiento[0].cantidad));
                console.log(saldoFinal);
            }
        setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    Movimientos <span className="badge text-bg-warning">{movimientos.length}</span>
                </div>
                <div className="card-body">
                    {
                        movimientos.map((movimiento) => (
                            <MovimientoItem
                                key={movimiento.id}
                                movimiento={movimiento}
                                deleted={handleDelete}
                                setEdit={setEdit}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default MovimientoList;