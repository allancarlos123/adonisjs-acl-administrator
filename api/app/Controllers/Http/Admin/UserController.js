'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
const User = use('App/Models/User')
const Role = use('Role')

class UserController {
  async index ({ request, params }) {
    const page = request.input('page')
    const users = await User
    .query()
    .with('roles')
    .paginate(page)

    return users
  }

  async show ({ params }) {
    const id = params.id;
    const user = await User
      .query()
      .with('roles')
      .where('id', id)
      .first()
    return user
  }
  
  async create ({ request }) {
    const user = new User()
    const profilePic = request.file('profile_pic')
    
    user.email = request.input('email')
    user.password = request.input('password')
    
    if (profilePic) {
      user.profile_pic = `${new Date().getTime()}-${profilePic.clientName}`
      
      await profilePic.move(Helpers.publicPath('uploads/avatar'), {
        name: `${user.profile_pic}`
      })
      
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    } else {
      user.profile_pic = "default_avatar.png"
    }
    
    await user.save()
    return user
  }

  async update ({ params, request }) {
    const { roles_id } = request.body
    const profilePic = request.file("profile_pic");
    const user = await User.findOrFail(params.id)
    const data = request.all()
    delete data.avatar
    delete data.roles
    
    if (profilePic) {
      user.profile_pic = `${new Date().getTime()}-${profilePic.clientName}`
      
      await profilePic.move(Helpers.publicPath('uploads/avatar'), {
        name: `${user.profile_pic}`
      })
      
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }

    console.log(request.body)
    
    if (roles_id) {
      await user.roles().detach();
      await user.roles().attach(roles_id);
      delete data.roles_id
    }

    // delete data.roles_id
    console.log(data)

    user.merge(data)
    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = UserController
