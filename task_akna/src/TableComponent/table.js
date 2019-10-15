import React, { Component, Fragment } from 'react';
// import Comments from './comments/comments';

import Close from './close/close'

import './table.css';

class Table extends Component {
    state = {
        data:[],
        GuID:"",
        status1:"none",
        display:"none",
        display2:"none"
    }

    showComments = (e) =>{
      
      this.setState({display: "block"})
  console.log(454)
     
    }
    showPosts = (e) =>{
      
      this.setState({display2: "block"})
  console.log(454)
     
    }
     callback = () => this.props.callback;
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
            
            <div className="tbl_content" key={i} val={v.GuID}>
              <div className="td_style" > <i className="fa fa-id-card" aria-hidden="true"></i>{v.name}</div>
              <div className="td_style" >{v.email}</div>
              <div className="td_style" >{v.address.city}{","}{v.address.street}</div> 
              <div className="btn_box">
              <div onClick = {this.showPosts} className="post_box" id = {v.GuID}><i className="fa fa-clipboard" aria-hidden="true"></i></div>
              <div onClick = {this.showComments} className="comment_box" id = {v.GuID}><i className="fa fa-comments" aria-hidden="true"></i></div> 
              </div>
              
              
            </div>
        
          )
        }   
          {/* comment popup */}
          <div  className="popup" style = {{display:this.state.display}}>
            <div className="form" >
              <Close callback = {this.close} />
                <p>User's  Comments</p>
            </div>
          </div>

          {/* posts popup */}
          <div  className="popup" style = {{display:this.state.display2}}>
            <div className="form" >
              <Close callback = {this.close} />
                <p>User's  posts</p>
            </div>
          </div>

       </div>

     </Fragment>
        )
    }
}
export default Table;