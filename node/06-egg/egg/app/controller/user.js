
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = [{name:'TMAC'}];
    ctx.body = await ctx.service.user.getAll()
  }
}

module.exports = UserController;