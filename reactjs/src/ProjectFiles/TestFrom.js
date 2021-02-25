import React, {Component} from "react";
import "./MyStyles.css"
import {GitHubRepos} from "./GitHubRepos"


const myStyle = {
    textInButton: {
        fontWeight: "bold",
    },
    sign: {
        fontWeight: "bolder",
        marginRight: "5px",
    },
    counterText:{
        fontWeight: "500",
        fontSize: "x-large",
        verticalAlign: "middle",
        textAlign: "center"
    },
    mainDiv:{
        border: "2px solid black",
        borderRadius: "15px",
        width: "50%",
        margin: "auto",
        marginTop: "40px",
        padding: "15px"
    },
}

class ButtonCounter extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            repos: [],
            name: "",
            desc: "",
            stars: 0,
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount() {
        GitHubRepos.map((item) => {
            var apiString = "https://api.github.com/repos/" + item;
            fetch(apiString).then(response => response.json()).then(data => {
                this.state.repos.push(data)
            }).catch((error) => console.log(error))
        });
    };
    handleOnClick = value => () => {
        
        if(this.state.counter + value <= 0 && value < 0){
            this.setState({counter : 0});
        }
        else if(this.state.counter + value > this.state.repos.length && value > 0){
            this.setState({counter : this.state.repos.length});
        }
        else{
            this.setState({
                counter : this.state.counter + value
            });
        }
        if(this.state.repos[this.state.counter] != null){
            this.setState({
                
                name: this.state.repos[this.state.counter].full_name,
                desc: this.state.repos[this.state.counter].description,
                stars: this.state.repos[this.state.counter].stargazers_count,
            })
        }
    }

    render(){
        var isLoading = this.state.name == null || this.state.name == "";
        return (
            <div style={myStyle.mainDiv}>
                <div>
                    <button style={{float: "left"}} className="button_normal" onClick={this.handleOnClick(-1)}>
                        <div>
                            <label style={myStyle.sign}>&#8722;</label>
                            <label style={myStyle.textInButton}>Decrement</label>
                        </div>
                    </button>
                    <button style={{float: "right"}} className="button_primary" onClick={this.handleOnClick(+1)}>
                        <div>
                            <label style={myStyle.sign}>&#43;</label>
                            <label style={myStyle.textInButton}>Increment</label>
                        </div>
                    </button>
                </div>
                <br/>
                <h1 style={myStyle.counterText}>Counter: {this.state.counter}</h1>
                <div style={{textAlign: "center"}}>
                    <h1>Repository information</h1>
                    <hr/>
                    {isLoading ? 
                    <h1>Loading....</h1>  :
                    <div>
                        <h3>Name: {this.state.name}</h3>
                        <label style={{fontSize: "20px"}}>Description: {this.state.desc}</label><br/>
                        <br/>
                        <label style={{fontSize: "20px", fontWeight: "bold"}}>Stars: {this.state.stars}</label><br/>
                    </div>
                    }
                    
                </div>
            </div>
        );
    };
  }
  
  export default (ButtonCounter);