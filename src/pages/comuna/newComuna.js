import { useNavigate } from "react-router-dom";

export default function NewComuna() {
  let navigate = useNavigate();
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Nueva Comuna</h2>
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