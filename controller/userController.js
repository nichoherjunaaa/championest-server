const userLogin = async (req, res) => {
    res.send('login success');
};

const userRegister = async (req, res) => {
    res.send('register success');
};

const getUser = async (req, res) => {
    res.send('get user success');
};

const getUserById = async (req, res) => {
    res.send('get user by id success');
};



export { userLogin, userRegister, getUser, getUserById };