import React from "react";
import queryString from 'query-string';
// import {Link} from 'react-router-dom';
import ReportCard from './report-card';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSubmitClicked:false,
            quesData : null,
            userSelecOptions: [],
            clickedValue : "",
            customIndex : 0,
            errMsg:"",
        };
        // console.log(this.props.customIndex);
    }
    componentDidMount(){
        const params = queryString.parse(this.props.location.search);
        // console.log(params);
        fetch(`https://opentdb.com/api.php?amount=10&category=${params["category"]}&difficulty=${params["difficulty"]}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            this.setState({
                quesData: data.results,
            })
        })
    }
    handleClick = (value,name) => {
        if(name === "submit"){
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
                        isSubmitClicked:true,
                };
                })
            }
        }
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
        if(!this.state.quesData){
            return <Loader />
        }
        if(this.state.isSubmitClicked){
            return <ReportCard quesData={this.state.quesData} userSelecOptions={this.state.userSelecOptions} />
        }
        let quesArr = this.state.quesData;
        // console.log(quesArr);
        let options = [];  
        options.push(quesArr[this.state.customIndex]["correct_answer"]);
        options = (options.concat(quesArr[this.state.customIndex]["incorrect_answers"])).sort();
        return(
            <article className="container flex-center-center">
                <section className="question-main"> 
                    <h2>Question {this.state.customIndex + 1}/{this.state.quesData.length}</h2>
                    <div className="ques">
                        {quesArr[this.state.customIndex].question}
                    </div>
                    <ul className="options">
                        {
                            options.map((option,index) => {
                                return (
                                    <li key={index} className={option === this.state.clickedValue ? 'clicked' : ""} onClick={() => this.handleClick(option,"option")} >{option}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="err-msg">{this.state.errMsg}</div>
                    <div className="btn">
                        {
                            (this.state.customIndex + 1 === this.state.quesData.length ? 
                                <button  onClick={() => this.handleClick("","submit")}  className="next-btn" >Submit</button> : 
                                <button  onClick={() => this.handleClick("","next")} className="next-btn">Next</button>
                            )
                        }
                    </div>
                </section>
            </article>
        )
    }
}


function Loader(){
    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default Questions;