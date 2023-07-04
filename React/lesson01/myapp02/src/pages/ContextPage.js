import React, { Component } from "react";
import { ThemeProvider, UserProvider } from "../Context";
// import ContextTypePage from "./ContextTypePage";
// import {ThemeContext, UserContext} from "../Context";
import UseContextPage from "./UseContextPage";
import ConsumerPage from "./ConsumerPage";
import Test from './test';
import Test2 from './test2';
import MyRCFieldForm from './MyRCFieldForm';


export default class ContextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: {
                themeColor: "red"
            },
            user: {
                name: "xiaoming"
            },
            test: 'hello world'
        };
    }
    changeColor = () => {
        const {
            themeColor
        } = this.state.theme;
        this.setState({
            theme: {
                themeColor: themeColor === "red" ? "green" : "red"
            }
        });
    }
    stop = () => { }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                test: 'houston'
            })
        }, 3000)
    }
    render() {
        const { theme, user, test } = this.state;
        // console.log('this', this)
        return (
            <div>
                <h3>{test}</h3>
                <Test />
                <Test2 />
                <ThemeProvider value={theme}>
                    <UserProvider value={user}>
                        <ConsumerPage />
                        <UseContextPage />
                    </UserProvider>
                </ThemeProvider>
                {/* <AntdFormPage/> */}
                <MyRCFieldForm />
            </div>
        )
    }
}