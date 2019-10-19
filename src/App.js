import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';
import Routes from './routes';
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

// export default App;
// import React from 'react';
// import Route from 'react-router-dom/Route';
// import Switch from 'react-router-dom/Switch';
// import Home from './Home';
// import './App.css';
// import Routes from './routes';
// const App = () => (
//   <Switch>
//     {Routes.map((...props) => {
//       return <Route {...props} />;
//     })}
//   </Switch>
// );

export default App;
