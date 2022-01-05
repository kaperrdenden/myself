import React, {Component} from "react";


class UpdateContent extends Component{
    
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc,
    } 
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
            this.setState({[e.target.name]:e.target.value});
            // [e.target.name] 이건 신자바스크립트 문법
            // props를 사용했다면 바꿀 수 없었을 것.
        }
    
    render(){
        console.log(this.props.data)
        return(
            <article>
                <h1>
                  Update
                </h1>
                <form action="/create_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault();

                
                        this.props.onSubmit(
                             this.state.id,
                             this.state.title,
                             this.state.desc);
                       
                    }.bind(this)}
                >

                    <input
                     type="hidden"
                      name="id"
                       value={this.state.id}
                    
                    ></input>
                    <p>
                        <input 
                        type="text" 
                        name="title" 
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.inputFormHandler}
                        >
                          {/* onChange이 함수 적자마자 css를 누르고 update를 누르면
                            value에 css가 적힘
                          */}
                        </input>
                        </p>
                    <p>
                        <textarea name="desc" placeholder="description"
                        value={this.state.desc}
                        onChange={this.inputFormHandler}
                        ></textarea>
                    </p>
                    <p>
                     
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        )
    }
}
// export default Content;
export default UpdateContent;