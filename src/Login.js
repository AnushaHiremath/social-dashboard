import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            users:[],
            email:'',
            id:'',
            status:false
        }
    }
    handleChange=(e)=>{
        const email= e.target.value
        this.setState({email})
    }
    handleSubmit =(e)=>{
        e.preventDefault()
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            const users= response.data.find(user => user.email ===this.state.email)
            if(users){
                localStorage.setItem("storeId",users.id)
                this.setState({users})
            } else {
                alert("Invalid email")
                this.setState({email:''})
            }
        })
    }
    render(){
        return(
            <div>{
                        
                localStorage.length != 0 ?
                <Redirect to={`/dashboard/${localStorage.getItem("storeId")}`}/>
                :
                <div>
                     <h2>Login</h2>
                <form onSubmit= {this.handleSubmit}>Email
                    <input type="text" 
                    id="email" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}/>
                </form>

                </div>
                }

            </div>
        )
    }
}
export default Login