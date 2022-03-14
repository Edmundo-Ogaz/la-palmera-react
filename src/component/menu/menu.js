import PropTypes from 'prop-types';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import './menu.css';
import { useNavigate } from "react-router-dom";

function App( props ) {
  let navigate = useNavigate();

  function handleClick(info) {
    // console.log(`clicked ${info.key}`);
    // console.log(info);
    // console.log(info.item.props.children)

    if ( info.key === "4-2" ) props.onLogOut();
    navigate("/comunas");


  }
  
  function onOpenChange(value) {
    // console.log('onOpenChange', value);
  }

  return (
    <Menu
          onClick={handleClick}
          triggerSubMenuAction={props.triggerSubMenuAction}
          onOpenChange={onOpenChange}
          mode={props.mode}
          motion={props.openAnimation}
          defaultOpenKeys={props.defaultOpenKeys}
        >
          <SubMenu title={<span className="submenu-title-wrapper">Mantenedores</span>} key="1">
            <MenuItem key="1-1">Comunas</MenuItem>
            <MenuItem key="1-2">Ciudades</MenuItem>
            <MenuItem key="1-3">Regiones</MenuItem>
            <MenuItem key="1-4">Cargos</MenuItem>
            <MenuItem key="1-5">Areas</MenuItem>
            <MenuItem key="1-6">Funcionarios</MenuItem>
            <SubMenu key="1-7"
                title={<span className="submenu-title-wrapper">Submenú Cliente</span>}
            >
                <MenuItem key="1-7-1">Clientes</MenuItem>
                <MenuItem key="1-7-2">Tipo clientes</MenuItem>
            </SubMenu>
            <SubMenu key="1-8"
                title={<span className="submenu-title-wrapper">Submenú Productos</span>}
            >
                <MenuItem key="1-8-1">Familias</MenuItem>
                <MenuItem key="1-8-2">Subfamilias</MenuItem>
                <MenuItem key="1-8-3">Otras caracteristicas</MenuItem>
                <MenuItem key="1-8-4">Productos</MenuItem>
                <MenuItem key="1-8-5">Conceptos técnicos</MenuItem>
                <MenuItem key="1-8-6">Ficha técnica</MenuItem>
                <MenuItem key="1-8-7">Ingredientes</MenuItem>
            </SubMenu>
            <MenuItem key="1-9">Unidad de Medidas</MenuItem>
            <MenuItem key="1-10">Insumos</MenuItem>
            <MenuItem key="1-11">Linea Producción</MenuItem>
            <MenuItem key="1-12">Producto por Linea</MenuItem>
            <MenuItem key="1-13">Bodega</MenuItem>
            <MenuItem key="1-14">Stock</MenuItem>
            <MenuItem key="1-15">Ubicación</MenuItem>
            <SubMenu key="1-16"
                title={<span className="submenu-title-wrapper">Administrador</span>}
            >
                <MenuItem key="1-16-1">Usuarios</MenuItem>
                <MenuItem key="1-16-2">Niveles</MenuItem>
                <MenuItem key="1-16-3">Perfiles</MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu
            title={
                <span className="submenu-title-wrapper">Transacciones</span>
            }
            key="2"
            popupOffset={[10, 15]}
        >
            <SubMenu title={<span className="submenu-title-wrapper">SubMenu Pedidos</span>} key="2-1">
              <MenuItem key="2-1-1">Confirmación Pedidos</MenuItem>
              <MenuItem key="2-1-2">Consulta de Pedidos</MenuItem>
            </SubMenu>
            <MenuItem key="2-2">Programas de Producción</MenuItem>
            <MenuItem key="2-3">Entrega de Insumos</MenuItem>
            <MenuItem key="2-4">Devolución de Insumos</MenuItem>
            <MenuItem key="2-5">Captura de Producción</MenuItem>
            <MenuItem key="2-6">Ingreso de Insumos</MenuItem>
            <MenuItem key="2-7">Solicitud de Productos</MenuItem>
        </SubMenu>
        <SubMenu title={<span className="submenu-title-wrapper">Informes y/o Consultas</span>} key="3">
              <MenuItem key="3-1">Pedidos</MenuItem>
              <MenuItem key="3-2">Ordenes de Fabricación</MenuItem>
              <MenuItem key="3-3">Entrega Insumos por O.F.</MenuItem>
              <MenuItem key="3-4">Devolución Insumos por O.F.</MenuItem>
              <MenuItem key="3-5">Captura Producción por O.F.</MenuItem>
              <MenuItem key="3-6">Determinar Insumos"</MenuItem>
        </SubMenu>
        <SubMenu title={<span className="submenu-title-wrapper">Salir</span>} key="4">
            <MenuItem key="4-1">Cambiar Usuario</MenuItem>
            <MenuItem key="4-2">Salida del Sistema</MenuItem>
        </SubMenu>
    </Menu>
  );
}

App.propTypes = {
  mode: PropTypes.string,
  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  triggerSubMenuAction: PropTypes.string,
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  updateChildrenAndOverflowedIndicator: PropTypes.bool,
};

export default App;
