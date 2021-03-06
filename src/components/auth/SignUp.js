import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";
import styled from 'styled-components';
import { device } from "../../media queries/deviceName";

const InputArea = styled.div`
    width: 80%;
    height: fit-content;
    margin: auto;
    form {
        margin: 0;
        @media ${device.mobileL} {
            padding: 0;
        }
    }
    .inputField {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        label {
        color: #9e9e9e;
        font-size: 1rem;
        }
        input {
            outline: none;
            border: none;
            border-bottom: 1px solid lightgrey;
            height: 40px;
            font-size: 16px;
        }
        .confirmBtn {
            color: rgb(255, 255, 255);
            width: 100%;
            height: 40px;
            border-radius: 5px;
            background-color: rgb(156, 150, 114);
            margin-top: 40px;
            font-size: 18px;
            letter-spacing: 3px;
            -webkit-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            -moz-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            cursor: pointer;
            :hover {
                background-color: rgb(156, 150, 114, 0.8);
            }
            :active {
                width: 98%;
                height: 38px;
            }
        }
        .errorHint {
            color: red;
        }
    }
`;

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
        console.log(authError)
        return (
            <InputArea>
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="inputField">
                        <label htmlFor="email">電子信箱</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="password">密碼</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="lastName">姓氏</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="firstName">名字</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <button className="confirmBtn">送出</button>
                        <div className="errorHint">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </InputArea>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
