'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint("Adonis/Acl/Role", (faker, index, data) => {
  const defaultValue = {
    slug: "administrator",
    name: "Administrator"
  };

  return Object.assign(defaultValue, data);
});

Factory.blueprint("App/Models/User", async (faker, index, data) => {
  const defaultValues = {
    profile_pic: "default_avatar.png",
    email: faker.email(),
    password: await Hash.make(faker.password())
  };

  return Object.assign(defaultValues, data)
});