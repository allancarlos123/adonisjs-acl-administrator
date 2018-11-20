'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const role = await Factory.model("Adonis/Acl/Role").create({
      slug: "moderator",
      name: "Moderator",
    });

    const user = await Factory
      .model('App/Models/User')
      .create({
        email: "user@demo.com",
        password: "demo"
      })

    const usersArray = await Factory
      .model('App/Models/User')
      .createMany(50)
    
    await user.roles().attach([role.id])
    // await usersArray.roles().attach([role.id])
  }
}

module.exports = UserSeeder
