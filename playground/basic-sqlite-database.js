var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

var User = sequelize.define('user', {
    email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
    //Force create DB
    // force: true
}).then(function () {
    console.log('Everything is synced !');

    // Get all todo belongs to user with id 1
    User.findById(1).then(function (user) {
        user.getTodos({
            where: {
                completed: false
            }
        }).then(function (todos) {
            todos.forEach(function(todo) {
                console.log(todo.toJSON());
            })
        })
    });

    // Create instance for database
    // User.create({
    //     email: 'dqcuong93@yahoo.com.vn'
    // }).then(function () {
    //     return Todo.create({
    //         description: 'Clean yard'
    //     })
    // }).then(function (todo) {
    //     User.findById(1).then(function (user) {
    //         user.addTodo(todo);
    //     });
    // });

    //Fetch data from exist DB
    // Todo.findById(1).then(function (todo) {
    //     if (todo) {
    //         console.log(todo.toJSON());
    //     } else {
    //         console.log('No data found');
    //     }
    // });

    //Create new DB
    //Todo.create({
    //    description: 'CuongDao',
    //}).then(function (todo) {
    //    return Todo.create({
    //       description: 'Clean house'
    //    });
    //}).then(function () {
    //    //return Todo.findById(1);
    //    return Todo.findAll({
    //        where: {
    //            //completed: false,
    //            description: {
    //                $like: '%uong%'
    //            }
    //        }
    //    });
    //}).then(function (todos) {
    //    if (todos) {
    //        todos.forEach(function (todo) {
    //            console.log(todo.toJSON());
    //        });
    //    } else {
    //        console.log('No data found');
    //    }
    //}).catch(function (e) {
    //    console.log(e);
    //});
});