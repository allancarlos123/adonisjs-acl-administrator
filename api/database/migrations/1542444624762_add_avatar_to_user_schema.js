'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAvatarToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('profile_pic')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn("profile_pic");
    })
  }
}

module.exports = AddAvatarToUserSchema
