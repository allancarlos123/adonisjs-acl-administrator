'use strict'

const Helpers = use('Helpers')
const User = use('App/Models/User')
const Role = use('Role')

class UserController {
  async index () {
    const users = await User
      .query()
      .with('roles')
      .fetch()

    return users
  }

  async show ({ params }) {
    const id = params.id;
    const user = await User
      .query()
      .with('roles')
      .where('id', id)
      .fetch()

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

    user.profile_pic = `${new Date().getTime()}-${profilePic.clientName}`

    await profilePic.move(Helpers.publicPath('uploads/avatar'), {
      name: `${user.profile_pic}`
    })

    if (!profilePic.moved()) {
      return profilePic.error()
    }

    if (roles_id) {
      await user.roles().detach();
      await user.roles().attach(roles_id);
    }
    
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
