import React, { Component, Fragment } from 'react';
import Close from './close/close'
import './table.css';
import Icon from './icon/icon';

class Table extends Component {
    state = {
        data:[],
        display:"none",
        display2:"none",
        post:[],
        comment:[],
        title: []
    }
//showComments
    showComments = (e) =>{
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${e.target.id}`,{
        method: 'GET',
        headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
        .then((resp)=>{return resp.json()})
        .then((result)=>{  
          var comment_data=[]  
          var comments = {} 
            result.map((v,i) =>{
              comments.comment = v.body;
              comment_data.push(comments)
              //console.log(comment_data)
                this.setState({
                  comment:comment_data
            })
          })
        })
      
      .then(()=>this.setState({display: "block"}));
    }


 // showPosts   
    showPosts = (e) =>{
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.id}`,{
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
          .then((resp)=>{return resp.json()})
          .then((result)=>{
            var post_data=[]
            var posts = {};
            result.map((v,i)=>{
              posts.title=v.title;
              posts.post=v.body;
              post_data.push(posts);
                this.setState({
                  post:post_data,    
            })
          })    
      })
  
  .then(()=>this.setState({display2: "block"}));
  
    }

  

    close = () => {
        this.setState({display:"none", display2:"none"})
      }

    componentDidMount(){  
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((resp) => {return resp.json()})
          .then((results) => { 
          this.setState({data:results})
        
        })
      }
    render(){
        return(
          <Fragment>
                <div className="table_box">
                    <div className="table_header" >
                        <div className="header_name"><p>Name</p></div>
                        <div className="header_name"><p>Email</p></div>
                        <div className="header_name"><p>Adress</p></div>
                        <div className="header_btn"><p>Posts</p></div>
                        <div className="header_btn"><p>Comments</p></div>
                    </div>
                    {this.state.data.map((v,i) =>
                      <div className="tbl_content" key={i}>
                        <div className="td_style" > <Icon className="fa fa-picture-o" aria-hidden="true"></Icon>{v.name}</div>
                        <div className="td_style" >{v.email}</div>
                        <div className="td_style" >{v.address.city}{","}{v.address.street}</div> 
                        <div className="btn_box">
                        <div onClick = {this.showPosts} className="post_box" ><Icon className="fa fa-clipboard" aria-hidden="true" id={i+1}></Icon></div>
                        <div onClick = {this.showComments} className="comment_box" ><Icon className="fa fa-comments" aria-hidden="true" id={i+1}></Icon></div> 
                        </div>
                      </div>
        
          )
        }   
          {/* comment popup */}
          <div  className="popup" style = {{display:this.state.display}}>
            <div className="popup_content" >
              <Close callback = {this.close} />
                <h3>User's  Comments</h3>
                <div className="content">
                {this.state.comment.map((v,i) =>
                  <div key={i}>
                    <p>{v.comment}</p> 
                  </div>
                )}
                </div>
            </div>
          </div>

          {/* posts popup */}
          <div  className="popup" style = {{display:this.state.display2}}>
            <div className="popup_content" >
              <Close callback = {this.close} />
                <h3>User's  posts</h3> 
               <div className="content">
                {this.state.post.map((v,i) =>
                  <div key={i} >
                    <h3>{v.title}</h3>
                    <p>{v.post}</p> 
                  </div>
                )}
                </div>
            </div>
          </div>
       </div>

     </Fragment>
    )
  }
}
export default Table;