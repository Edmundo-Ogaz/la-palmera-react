import { useNavigate } from "react-router-dom";

export default function FiltroComuna() {
  let navigate = useNavigate();
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Filtro Comuna</h2>
      <p>
        <button
          onClick={() => {
            navigate("/comunas/new");
          }}
        >
          Nueva Comuna
        </button>
      </p>
    </main>
  );
}