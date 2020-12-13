
const INITIAL_STATE = {
    username: "Ishani",
    email: "",
    firstname: "",
    lastname: "",
    location: "",
    phone: "",
    isLogin: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
};