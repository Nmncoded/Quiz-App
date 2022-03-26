import {Link} from 'react-router-dom';

function ReportCard(props){
    // console.log(props.quesData,props.userSelecOptions);
    return(
        <article className="container flex-center-center" >
            <section className='main-reportcard' >
                <table className='result-table' >
                    <caption>Results:</caption>
                    <thead>
                    <tr>
                        <th>Questions</th>
                        <th>Correct Answers</th>
                        <th>You Selected</th>
                        <th>Right or Wrong</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.quesData.map((ques,index) => {
                            return (
                                <tr key={index} >
                                    <td>{ques.question}</td>
                                    <td>{ques.correct_answer}</td>
                                    <td>{props.userSelecOptions[index]}</td>
                                    <td>{(props.userSelecOptions[index] === ques.correct_answer) ? "✅" : "❌"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td  >Total Correct</td>
                            <td>{props.quesData.reduce((acc,ques,index) => {
                                if(props.userSelecOptions[index] === ques.correct_answer){
                                    acc = acc+1;
                                }
                                return acc;
                            },0)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="btn flex-center-center">
                    <Link  className="color quiz-btn" to='/' >Retake a Quiz</Link>
                    </div>
            </section>
        </article  >
    )
}
export default ReportCard;