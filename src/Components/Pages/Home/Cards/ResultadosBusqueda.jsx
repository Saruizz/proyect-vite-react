import React from 'react'

const ResultadosBusqueda = ({data}) => {
  return (
    <div>
      <h2>Resultados de Busqueda</h2>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.nombre}</li> // Ejemplo de renderización de items
          ))}
        </ul>
      )}
    </div>
  )
}

export default ResultadosBusqueda