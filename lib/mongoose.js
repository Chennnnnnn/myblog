var config = require('config-lite'); //读取配置文件
var marked = require('marked');
var Mongoose = require('mongoose'); 
var mongoose = new Mongoose.Mongoose();
mongoose.connect(config.mongodb);

var UserSchema = new mongoose.Schema({
    name :  String ,
    password : String,
    avatar : String,
    gender : String,
    bio: String
},{
  versionKey: false
});

UserSchema.index({name:1},{unique:true});
exports.User = mongoose.model('User',UserSchema);


var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');


//文章模型设计
var PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    content : String,
    pv : Number,
    commentsCount:Number
},{
  versionKey: false
});

// 按创建时间顺序查看用户的文章列表
PostSchema.index({ author: 1, _id: -1 });


exports.Post = mongoose.model('Post',PostSchema);



//留言模型设计
var CommentSchema = new mongoose.Schema({
  author : {type: mongoose.Schema.Types.ObjectId},
  content:{type: 'string'},
  postId:{type: mongoose.Schema.Types.Object}
},{
  versionKey: false
});

// 通过文章id获取该文章下所有留言，按留言创建时间升序
CommentSchema.index({postId:1,_id:1});


// 通过用户id和留言id删除一个留言
CommentSchema.index({author:1,_id:1});


exports.Comment = mongoose.model('Comment',CommentSchema);





