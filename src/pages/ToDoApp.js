import React, {useState} from 'react';
import TodoHeader from "../components/todo-main/header";


import EnhancedTable from "../components/todo-main/TaskView";
import {useLocation} from "react-router-dom";
function ToDoApp(props) {
    const {state} = useLocation();
    const [auth_token, setAuthToken] = useState(state);

    const handleLogout = () => {setAuthToken("");};
    return (
        <React.Fragment>
            <TodoHeader handleLogout={handleLogout}/>
            <EnhancedTable auth_token={auth_token}/>
        </React.Fragment>

    );
}

export default ToDoApp;