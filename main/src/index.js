
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './stylesheets/main-style.css';
import Header from './components/header';
import Category from './components/category';
import Questions from './components/questions';
import ReportCard from './components/report-card';




class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userSelecOptions: [],
            clickedValue : "",
            customIndex : 0,
            errMsg:"",
        };
    }
    handleClick = (value,name) => {
        if(name === "option"){
            this.setState({
                clickedValue:value,
                errMsg:"",
        })
        }
        if(name === "next"){
            if(!this.state.clickedValue){
                this.setState({errMsg: "Select any option !!!"})
            }
            if(this.state.clickedValue){
                this.setState((prev) => {
                    return {
                        userSelecOptions: this.state.userSelecOptions.concat(this.state.clickedValue),
                        customIndex:this.state.customIndex + 1,
                        errMsg:"",
                        clickedValue:"",
                };
                })
            }
        }
    }
    render(){
        return(
            <BrowserRouter>
                <Header />
                <Route path="/" exact>
                    <Category />
                </Route>
                <Route path="/quiz" component={ (props) => <Questions {...props} handleClick={(value,name) => this.handleClick(value,name)} clickedValue={this.state.clickedValue} customIndex={this.state.customIndex} userSelecOptions={this.state.userSelecOptions} errMsg={this.state.errMsg}  /> } />
                <Route path="/reportcard" exact>
                    <ReportCard />
                </Route>
                
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById(`root`));