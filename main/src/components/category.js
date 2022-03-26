import React from "react";
import {Link} from 'react-router-dom';

class Category extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: 9,
            difficulty: "easy",
            data:null,
        }
        this.arr=["easy","medium","hard"];
    }
    handleChange = ({target},name) =>{
        let {value} = target;
        this.setState((prev) => {
            return{
                [name] : value,
            }
        })
    }
    componentDidMount(){
        fetch("https://opentdb.com/api_category.php")
        .then(res => res.json())
        .then(data => {
            this.setState({
                data: data.trivia_categories.filter(item => (item.id !== 13 && item.id !== 25 && item.id !== 30)),
            })
        })
    }
    componentWillUnmount(){
        // console.log("unmount")
    }
    render(){
        if(!this.state.data){
            return <Loader />
        }
        let allCategory = this.state.data;
        console.log(allCategory);
        return (
            <article className="container">
                <section className="category-main">
                    <label htmlFor="">Select Category:</label>
                    <select value={this.state.category} onChange={ (event) => this.handleChange(event,"category")} >
                        <option value={this.state.data[Math.floor(Math.random()*23)].id} >Any category</option>
                        {
                            allCategory.map((item,index) => {
                                return (
                                    <option key={index} value={item.id}  >{item.name}</option>
                                )
                            })
                        }
                        
                    </select>
                    <label htmlFor="">Select Difficulty:</label>
                    <select value={this.state.difficulty} onChange={ (event) => this.handleChange(event,"difficulty")} >
                        <option value={this.state.difficulty}>Any Difficulty</option>
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                    <div className="btn flex-center-center">
                    <Link  className="quiz-btn" to={`/quiz?amount=10&category=${this.state.category}&difficulty=${this.state.difficulty}`} >Take a Quiz</Link>
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


export default Category;