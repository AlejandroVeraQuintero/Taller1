import React from "react";

const MovimientoItem = ({ saldoInicial, saldoFinal}) => {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Taller</span>
                <div className="d-flex" >
                    <input className="form-control me-2" value={new Intl.NumberFormat('es-MX').format(saldoInicial)} disabled />
                    <input className="form-control me-2" value={new Intl.NumberFormat('es-MX').format(saldoFinal)} disabled />
                </div>
            </div>
        </nav>
    );
};

export default MovimientoItem;