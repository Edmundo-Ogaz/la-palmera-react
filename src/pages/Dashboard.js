import { Outlet } from 'react-router-dom';
import Menu from '../components/menu/menu';
import PropTypes from 'prop-types';

export default function Dashboard( props ) {
	console.log('Dashboard')
  	return (
    <div>
      <h1>La Palmera</h1>
      <Menu
			mode="horizontal"
			openAnimation="slide-up"
			onLogOut={ props.onLogOut }
			/>
      <Outlet />
    </div>
  	);
}

Dashboard.propTypes = {
  onLogOut: PropTypes.func
}