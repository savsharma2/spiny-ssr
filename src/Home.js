import React from 'react';
import logo from './react.svg';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const parms = queryString.parse(props.location.search);
    // console.log(parms);
    this.state = {
      searchText: parms.search ? parms.search : '',
      results: []
    };
    if (props.staticContext && props.staticContext.data) {
      console.log(props.staticContext.data);
      this.state.results = props.staticContext.data;
    }
  }

  componentDidMount() {
    if (window.__ROUTE_DATA__) {
      this.setState(
        {
          results: window.__ROUTE_DATA__
        },
        () => {
          delete window.__ROUTE_DATA__;
        }
      );
    }
  }

  setSearchText = async ({ target: { value } }) => {
    this.setState({ searchText: value });
    // if (value.length > 3) {
    //   return fetch(`https://api.jikan.moe/v3/search/anime?q=${value}`).then(
    //     res => {
    //       return res.json().then(o => {
    //         this.setState({
    //           results: o.results
    //         });
    //       });
    //     }
    //   );
    // }
  };

  search = async () => {
    const { searchText } = this.state;
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?search=${searchText}`
    })

    const results = await Home.loadData(searchText);
  
    this.setState({
      results
    });
  };

  render() {
    const { searchText, results } = this.state;

    return (
      <div className='Home'>
        <div className='Home-header'>
          {/* <img src={logo} className='Home-logo' alt='logo' /> */}
          <h2>Welcome to SSR</h2>
        </div>
        <p className='Home-intro'>
          {/* {this.props.staticContext.data} */}
          You are Searching for {searchText}
        </p>
        <div>
          <input
            type='text'
            value={searchText}
            placeholder='Enter Text To Search'
            onChange={this.setSearchText}
          ></input>
          <button onClick={this.search}> Search</button>
        </div>
        {results.map(({ title }) => {
          return <div> {title} </div>;
        })}
      </div>
    );
  }
}

// const exportedComponent = withRouter(Home);
Home.loadData = searchText => {
  // const parms = queryString.parse(search);
  // const
  console.log(`searchText is ${searchText}`);
  if (searchText && searchText.length > 3) {
    return fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`).then(
      res => {
        return res.json().then(o => {
          return o.results;
        });
      }
    );
  } else {
    return new Promise(res => {
      res([]);
    });
  }
};

export default Home;
