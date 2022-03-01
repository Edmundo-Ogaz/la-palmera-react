import { Outlet } from "react-router-dom";
import Menu from "../component/menu/menu";

export default function Dashboard( props ) {
  return (
    <div>
      <h1>La Palmera</h1>
      <Menu
        mode="horizontal"
        // use openTransition for antd
        openAnimation="slide-up"
        onLogOut={props.onLogOut}
      />
      <Outlet />
    </div>
  );
}