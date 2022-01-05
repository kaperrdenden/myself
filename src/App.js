import React, {Component} from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
class App extends Component{
  constructor(props){
    super(props);
    this.max_content_id = 3;
    // 그냥 별 의미이 없는 값이기때문에 그냥 이렇게 썼다
    this.state= {
      mode:"welcome",
      selected_contend_id:1,
      subject:{title:"web", sub:"worldss  d wide "},
      welcome:{title:"Welcome", desc:"hello React!!"},

      contents:[
        {id:1, title:"html" ,desc:"htmlisgreat"},
        {id:2, title:"css" ,desc:"css is for design"},
        {id:3, title:"js" ,desc:"js is for interactive"},
      ]
    };
  }
  getReadContent(){
    var i =0;
    console.log(this.state.contents);
    while( i < this.state.contents.length){
      var data =this.state.contents[i];
      if(data.id===this.state.selected_contend_id){
        return data;
        break;
      }
     i++;
    }
  }
  getContent() {
  var _title, _desc,_article,_content = null;
  
  
  
  if (this.state.mode==="welcome"){
    _title = this.state.welcome.title;
    _desc = this.state.welcome.desc;
    _article = <ReadContent title={_title} desc={_desc}></ReadContent>
  } else if(this.state.mode==="read"){
    
    _content = this.getReadContent()
    // console.log(_content);
    _article =  <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
       
      
    
    }

    else if(this.state.mode==="create"){
       console.log(this.state.mode);
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id++;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        // 이건 원본이 바뀜
        // let result = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        // this.setState({contents: result});
        // 이렇게하면 원본이 바뀌지 않고 원본을 참고해서 변경된 새로운 값이 생김
        let newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({contents:newContents,mode:"read",selected_contend_id: this.max_content_id});
        // this.state.
        console.log(_title,_desc)
        // this.setState(contents.push());
      }.bind(this)}></CreateContent>
  }
  else if(this.state.mode==="update"){
    _content = this.getReadContent()
    _article = <UpdateContent data={_content} onSubmit={function(_id,_title, _desc){
      
      let newContents = Array.from(this.state.contents);
      let i =0;
  
      while(i<newContents.length){
        if(newContents[i].id === _id){
        
          newContents[i] = {id: _id, title:_title, desc:_desc}
          break;
        }
        i++;
      }
      console.log(newContents);
      // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
      this.setState({contents:newContents,mode:"read"});
      // console.log(_title,_desc)
     
    }.bind(this)}></UpdateContent>
 
}else if(this.state.mode==="delete"){
  // 여기에 삭제하는 기능을 넣으면 왜 실행이 안될까...

}
return _article
  // 버튼이 클릭될때마다 welcome이나 read둘중 하나로 state가 바뀌는데 그때 렌더링
  // 재렌더링 발생. 이때 welcome이냐 read이냐에 따라 넘겨줄 props의 값이 바뀌는것
  }
  render(){
    
    return(
      <div className='App'>
        
            <Subject 
            title={this.state.subject.title}
             sub={this.state.subject.sub}
             onChangePage={function(){
               this.setState({mode:"welcome"});
             }.bind(this)}
             ></Subject>

            <TOC data={this.state.contents} onChangePage={
              function(id){this.setState({mode:"read",  selected_contend_id:
              Number(id)});}.bind(this)
            }></TOC>

            <Control
            onChangeMode={function(_mode){

              if(_mode==="delete"){
                if(window.confirm("serious?")){
                  let _content = this.getReadContent();
                  let i=0;
                  console.log(_content);
                  
                  while(i < this.state.contents.length){
                    
                    if (_content.id === this.state.contents[i].id){
                      let newArray = [...this.state.contents];
                      newArray.splice(i,1);
                      this.setState({
                        contents:newArray,
                      })
                      console.log(newArray)
                      break
                    }
                    i++;
                }
              }
            }
              this.setState({
                mode:_mode
              })
                
              // this.setState({mode:_mode});
              // console.log(this.state.mode);
            }.bind(this)}
            ></Control>
            {this.getContent()}

       
      </div>
 
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
