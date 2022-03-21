import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './component/menu/menu';

export default function Dashboard(props) {
	console.log('Dashboard')

  	return (
      <div>
          <Menu
				mode="horizontal"
				openAnimation="slide-up"
			/>
          <Outlet />
      </div>
  	);
}
