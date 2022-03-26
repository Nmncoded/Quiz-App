
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './stylesheets/main-style.css';
import Header from './components/header';
import Category from './components/category';
import Questions from './components/questions';
// import ReportCard from './components/report-card';




class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <BrowserRouter>
                <Header />
                <Route path="/" exact>
                    <Category />
                </Route>
                <Route path="/quiz" component={Questions} exact />
                {/* <Route path="/reportcard"  exact>
                    <ReportCard />
                </Route> */}
                
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById(`root`));