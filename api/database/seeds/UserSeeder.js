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
  async run() {
    const moderatorRole = await Factory.model("Adonis/Acl/Role").create({
      slug: "moderator",
      name: "Moderator",
    });
    const moderatorUser = await Factory
      .model('App/Models/User')
      .create({
        email: "user@demo.com",
        password: "demo"
      })
    await moderatorUser.roles().attach([moderatorRole.id])


    const adminRole = await Factory.model('Adonis/Acl/Role').create()
    const adminUser = await Factory
      .model('App/Models/User')
      .create({
        email: "admin@demo.com",
        password: "demo"
      })
    await adminUser.roles().attach([adminRole.id])

    
    
    for (let i = 0; i < 25; i++) {
      const userModerator = await Factory
        .model('App/Models/User')
        .create()
        await userModerator.roles().attach([moderatorRole.id])
      console.log(`${i+1}/25 users have been created`)
    }
  }
}

module.exports = UserSeeder
