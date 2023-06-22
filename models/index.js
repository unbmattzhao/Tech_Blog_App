const Post = require("./post");
const User = require("./user");
const Comment = require("./comment");

// User.hasMany(Comment,{
//     foreignKey: 'commenterUsername',
//     onDelete: 'CASCADE'
//   });

//   User.hasMany(Post,{
//     foreignKey: 'creatorUsername',
//     onDelete: 'CASCADE'
//   });

//   Comment.belongsTo(Post,{
//     foreignKey: 'commentpost',
//     onDelete: 'CASCADE'
//   });

//   Post.hasMany(Comment,{
//     foreignKey: 'commentpost',
//     onDelete: 'CASCADE'
//   });

// Post.hasMany(Comment, {
//   foreignKey: 'commentpost',
//   onDelete: 'CASCADE',
// });
// Comment.belongsTo(Post, {
//   foreignKey: 'commentpost',
// });
// User.hasMany(Post, {
//   foreignKey: 'creatorUsername',
//   onDelete: 'CASCADE',
// });
// Post.belongsTo(User, {
//   foreignKey: 'creatorUsername',
// });
// User.hasMany(Comment, {
//   foreignKey: 'commenterUsername',
//   onDelete: 'CASCADE',
// });
// Comment.belongsTo(User, {
//   foreignKey: 'commenterUsername',
// });

Post.hasMany(Comment, {
  foreignKey: "commentpost",
});

Comment.belongsTo(Post, {
  foreignKey: "commentpost",
});

User.hasMany(Post, {
  foreignKey: "creatorUsername",
});

Post.belongsTo(User, {
  foreignKey: "creatorUsername",
});

User.hasMany(Comment, {
  foreignKey: "commenterUsername",
});

Comment.belongsTo(User, {
  foreignKey: "commenterUsername",
});

module.exports = { User, Comment, Post };
