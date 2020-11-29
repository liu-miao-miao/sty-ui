import React from 'react';
import Home from './page/Home';
import asyncComponent from './page/asyncComponent';
import { RouteConfig } from 'react-router-config';
import { NavBar } from '@/components/index';
import { useHistory } from 'react-router-dom';

const ButtonDemo = asyncComponent(() => import('./page/Button'));
const IconDemo = asyncComponent(() => import('./page/Icon'));
const NavBarDemo = asyncComponent(() => import('./page/NavBar'));
const RippleDemo = asyncComponent(() => import('./page/Ripple'));
const LoadingDemo = asyncComponent(() => import('./page/Loading'));
const SwitchDemo = asyncComponent(() => import('./page/Switch'));
const TimelineDemo = asyncComponent(() => import('./page/Timeline'));
const CellDemo = asyncComponent(() => import('./page/Cell'));
const CheckboxDemo = asyncComponent(() => import('./page/Checkbox'));
const RadioDemo = asyncComponent(() => import('./page/Radio'));

let routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/button',
    component: ButtonDemo
  },
  {
    path: '/icon',
    component: IconDemo
  },
  {
    path: '/nav-bar',
    component: NavBarDemo
  },
  {
    path: '/ripple',
    component: RippleDemo
  },
  {
    path: '/loading',
    component: LoadingDemo
  },
  {
    path: '/switch',
    component: SwitchDemo
  },
  {
    path: '/timeline',
    component: TimelineDemo
  },
  {
    path: '/cell',
    component: CellDemo
  },
  {
    path: '/checkbox',
    component: CheckboxDemo
  },
  {
    path: '/radio',
    component: RadioDemo
  }
];
// 用div将懒加载的代码包裹起来，防止路由动画不起作用
routes = routes.map(i => ({
  ...i,
  component: props => {
    const history = useHistory();
    return (
      <div className='page-box'>
        {i.path !== '/' && (
          <NavBar
            fixed
            placeholder
            leftArrow
            title={(i.path as string).replace('/', '')}
            onClickLeft={history.goBack}
          />
        )}
        <i.component {...props} />
      </div>
    );
  }
}));
export default routes;
