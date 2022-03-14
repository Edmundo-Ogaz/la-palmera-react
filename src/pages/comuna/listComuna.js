import { useNavigate, useLocation } from "react-router-dom";

export default function ListComuna(props) {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  console.log(props);
  return (
    <main style={{ padding: "1rem" }}>
      <h2>List Comuna</h2>
      <table>
      {state.map(comuna =>
                  <tr>
                    <td>{comuna.codigo}</td>
                    <td>{comuna.codigo}</td>
                    <td>{comuna.nombre}</td>
                  </tr>
              )}
      </table>
      <p>
        <button
          onClick={() => {
            navigate("/comunas/filtro");
          }}
        >
          Filtro Comuna
        </button>
      </p>
    </main>
  );
}