const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000'
        this.respotaCustom = {
            code: 200,
            mensagem: 'Operação realizada com sucesso'
        }
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async user => {
            return {
                ...user,
                role: await this.get(`/roles/${user.role}`)
            }
        });
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`)
        return user;
    }

    async adicionaUser(user) {
        const users = await this.get('users');
        user.id = users.length + 1;
        const role = await this.get(`roles?type=${user.role}`)
        await this.post('users', { ...user, role: role[0].id })
        return ({
            ...user,
            role: role[0]
        })
    }

    async atualizaUser(novosDados) {
        const role = await this.get(`roles?type=${novosDados.user.role}`)
        console.log(novosDados)
        await this.put(`users/${novosDados.id}`, {
            ...novosDados.user, role: role[0].id
        })
        return ({
            ...this.respotaCustom,
            user: {
                id: novosDados.id,
                ...novosDados.user,
                role: role[0]
            }
        })
    }

    async deletaUser(id) {
        await this.delete(`users/${id}`)
        return this.respotaCustom
    }
}

module.exports = UserAPI;