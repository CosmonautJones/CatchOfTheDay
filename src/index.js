// let's go!
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './css/style.css';

import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={StorePicker} />
          <Route path="/store/:storeId" component={App} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

// const MyContext = React.createContext();
// class MyProvider extends React.Component {
//   state = {
//     URL: '/'
//   }
//   render() {
//     return (
//       <MyContext.Provider value={{
//         state: this.state,
//       }}>
//         {this.props.children}
//       </MyContext.Provider>
//     )
//   }
// }

render(<Root />, document.querySelector('#main'));
