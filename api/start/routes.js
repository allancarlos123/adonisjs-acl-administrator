'use strict'

const Database = use("Database");
const User = use('App/Models/User')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('users', 'Admin/UserController')
  .apiOnly()

Route.get('/', async () => {
  return await User
    .query()
    .with('roles')
    .fetch()
  // return await Database.table('users').select('*')
})
// Route.get('/', async () => {
//   return await Database.table('users').select('*')
// }).middleware(['auth:jwt', 'is:(administrator)'])

Route.post('/register', 'Admin/UserController.create')
Route.post('/login', 'Admin/SessionController.create')

Route.get('/roles', async () => {
  return await Database
    .select('*')
    .from('roles')
})