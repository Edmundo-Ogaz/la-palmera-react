import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const columns = [
  { field: 'code', headerName: 'Código', width: 130 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'city', headerName: 'Ciudad', width: 130 },
];

export default function ListComuna(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ selectionModel, setSelectionModel ] = useState([]);

  const rows = state.map((comuna, index) => {
    return { id: index, code: comuna.codigo, name: comuna.nombre, city: comuna.codigociudad }
  });

  const handleSelection = (selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
    } else {
      setSelectionModel(selection);
    }
  }

  return (
      <main style={ { height: 400, width: '100%' } }>
          <h2>List Comuna</h2>
          <div style={ { height: 400, width: '100%' } }>
              <DataGrid
          rows={ rows }
          columns={ columns }
          pageSize={ 5 }
          rowsPerPageOptions={ [ 5 ] }
          checkboxSelection
          hideFooterSelectedRowCount
          onSelectionModelChange={ handleSelection }
          selectionModel={ selectionModel }
        />
          </div>
          <button
          onClick={ () => {
            navigate('/comunas/new');
          } }
        >
              Nueva Comuna
          </button>
          <button
          onClick={ () => {
            navigate('/comunas/modify');
          } }
        >
              Modificar
          </button>
          <button
          onClick={ () => {
            navigate('/comunas/delete');
          } }
        >
              Eliminar
          </button>
          <button
          onClick={ () => {
            navigate('/comunas/filtro');
          } }
        >
              Volver
          </button>
      </main>
  );
}