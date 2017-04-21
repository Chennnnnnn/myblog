var marked = require('marked');
var Post = require('../lib/mongoose').Post;

var CommentModel = require('./comments');



module.exports = {
  // 创建一篇文章
  create: function create(post) {
    return Post.create(post);
  }, 

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById(postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' });

  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts(author) {
    var query = {};
    if (author) {
      query.author = author;
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .exec();

  },
  // 通过文章id 给   commentsCount 加一
  inccommentsCount: function  inccommentsCount(postId){
    return  Post
      .update({ _id: postId }, { $inc: { commentsCount: 1 } });
  },


  // 通过文章id给commentsCount减一
  delcommentsCount: function  delcommentsCount(postId){
    return  Post
      .update({ _id: postId }, { $inc: { commentsCount: -1 } });
  },


  // 通过文章 id 给 pv 加 1
  incPv: function incPv(postId) {
    return Post
      .update({ _id: postId }, { $inc: { pv: 1 } });
  },


	// 通过文章 id 获取一篇原生文章（编辑文章）
	getRawPostById: function getRawPostById(postId) {
	  return Post
	    .findOne({ _id: postId })
	    .populate({ path: 'author', model: 'User' });
	},

	// 通过用户 id 和文章 id 更新一篇文章
	updatePostById: function updatePostById(postId, author, data) {
	  return Post.update({ author: author, _id: postId }, { $set: data }).exec();
	},

	// 通过用户 id 和文章 id 删除一篇文章
	delPostById: function delPostById(postId, author) {
	  return Post.remove({ author: author, _id: postId })
	    .exec()
	    .then(function (res) {
	      // 文章删除后，再删除该文章下的所有留言
	      if (res.result.ok && res.result.n > 0) {
	        return CommentModel.delCommentsByPostId(postId);
	      }
	    });
	}



















};