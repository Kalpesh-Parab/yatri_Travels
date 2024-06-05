const DarkModeReducer = (state,  action) => {
    switch (action.type) {
        case "LIGHT":{
            const newState = {darkMode: false};
            localStorage.setItem('darkMode', JSON.stringify(newState));
            return newState;            
        }
        case "DARK":{
            const newState = {darkMode: true};
            localStorage.setItem('darkMode', JSON.stringify(newState));
            return newState;
        }
        case "TOGGLE":{
            const newState = {darkMode: !state.darkMode};
            localStorage.setItem('darkMode', JSON.stringify(newState));
            return newState;
        }    
        default:
            return state;
    }
};

export default DarkModeReducer;