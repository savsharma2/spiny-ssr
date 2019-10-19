import Home from './Home';

const Routes = [
  {
    path: '/',
    // exact: true,
    component: Home,
    loadData: (...args) => {
    //    console.log(`arguments are ${args[0].q}`);
      return Home.loadData(...args);
    }
  }
];

export default Routes;
