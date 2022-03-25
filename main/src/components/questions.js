import React from "react";
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quesData : null,
            /* userSelecOptions: [],
            clickedValue : "",
            customIndex : 0,
            errMsg:"", */
        };
        // console.log(this.props.customIndex);
    }
    componentDidMount(){
        const params = queryString.parse(this.props.location.search);
        console.log(params);
        fetch(`https://opentdb.com/api.php?amount=10&category=${params["category"]}&difficulty=${params["difficulty"]}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                quesData: data.results,
            })
        })
    }
    /* handleClick = (value,name) => {
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
    } */
    render(){
        if(!this.state.quesData){
            return <Loader />
        }
        let quesArr = this.state.quesData;
        console.log(quesArr);
        let options = [];  
        options.push(quesArr[this.props.customIndex]["correct_answer"]);
        options = (options.concat(quesArr[this.props.customIndex]["incorrect_answers"])).sort();
        return(
            <article className="container flex-center-center">
                <section className="question-main">
                    <h2>Question {this.props.customIndex + 1}/10</h2>
                    <div className="ques">
                        {quesArr[this.props.customIndex].question}
                    </div>
                    <ul className="options">
                        {
                            options.map((option,index) => {
                                return (
                                    <li key={index} className={option === this.state.clickedValue ? 'clicked' : ""} onClick={() => this.props.handleClick(option,"option")} >{option}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="err-msg">{this.props.errMsg}</div>
                    <div className="btn">
                        {
                            (this.props.customIndex + 1 === 10 ? 
                                <Link  className="next-btn" >Submit</Link> : 
                                <button  onClick={() => this.props.handleClick("","next")} className="next-btn">Next</button>
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