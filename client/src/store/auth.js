import axios from '../axios';
// import axios from 'axios';

const state = {
    email: localStorage.getItem('email') || null,
    patientID: localStorage.getItem('patientID') || null,
    role: localStorage.getItem('role') || null,
    id: localStorage.getItem('id') || null,
    token: localStorage.getItem('token') || null
}

const actions = {
    register({ commit }, data) {
        console.log('register');
        return new Promise((resolve, reject) => {
            axios().post('/auth/register', data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    registerUser({ commit }, data) {
        console.log('registerUser');
        return new Promise((resolve, reject) => {
            axios().post('/auth/registerUser', data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    loginPatient({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios().post('/auth/loginPatient', data)
                .then(response => {
                    localStorage.setItem('patientID', response.data.user.patientID)
                    localStorage.setItem('role', response.data.user.role)
                    localStorage.setItem('id', response.data.user._id)
                    localStorage.setItem('token', response.data.token);
                    resolve(response)
                    commit('authPatient', {
                        patientID: response.data.user.patientID,
                        role: response.data.user.role,
                        id: response.data.user._id,
                        token: response.data.token
                    })
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios().post('/auth/login', data)
                .then(response => {
                    localStorage.setItem('email', response.data.user.email)
                    localStorage.setItem('role', response.data.user.role)
                    localStorage.setItem('id', response.data.user._id)
                    localStorage.setItem('token', response.data.token);
                    resolve(response)
                    commit('authUser', {
                        email: response.data.user.email,
                        role: response.data.user.role,
                        id: response.data.user._id,
                        token: response.data.token
                    })
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token');
            if (localStorage.getItem('token') == null) {
                resolve({ message: 'Success' });
            } else {
                reject({ message: 'Error' })
            }
            commit('logoutUser');
        })
    },
    logoutPatient({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token');
            if (localStorage.getItem('token') == null) {
                resolve({ message: 'Success' });
            } else {
                reject({ message: 'Error' })
            }
            commit('logoutPatient');
        })
    }
}

const mutations = {
    authPatient(state, data) {
        console.log(data)
        state.patientID = data.patientID
        state.id = data.id
        state.role = data.role
        state.token = data.token
    },
    authUser(state, data) {
        console.log(data)
        state.email = data.email
        state.id = data.id
        state.role = data.role
        state.token = data.token
    },
    logoutPatient(state) {
        state.patientID = null;
        state.token = null;
        localStorage.removeItem('token')
        localStorage.removeItem('patientID')
        localStorage.removeItem('role')
    },
    logoutUser(state) {
        state.email = null;
        state.token = null;
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('role')
    }
}

const getters = {
    isAuth() {
        return state.email, state.token;
    },
    role() {
        return state.role
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}