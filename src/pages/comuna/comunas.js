import { Outlet } from 'react-router-dom';

export default function Comunas() {
  console.log('Comunas')
  return (
      <div style={ { display: 'flex' } }>
          <Outlet />
      </div>
  );
}