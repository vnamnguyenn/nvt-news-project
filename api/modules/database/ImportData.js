var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
	accessKeyId: 'AKIAV2ETM6QXC3DCEXPC',
	secretAccessKey: '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',
	region: 'ap-southeast-1',
	endpoint: 'dynamodb.ap-southeast-1.amazonaws.com',
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing data into DynamoDB. Please wait.');

var allMovies = JSON.parse(fs.readFileSync(__dirname + '/BlogData.json', 'utf8'));
allMovies.forEach(function (data) {
	let params = {};
	if (data.TagId !== undefined) {
		params = {
			TableName: 'Blog',
			Item: {
				PK: data.PK,
				SK: data.SK,
				TagId: data.TagId,
				TagName: data.TagName,
				Thumbnail: data.Thumbnail,
				CreatedDate: data.CreatedDate,
				UpdatedDate: data.UpdatedDate,
			},
		};
	} else if (data.AccountId !== undefined) {
		params = {
			TableName: 'Blog',
			Item: {
				AccountId: data.AccountId,
				UserEmail: data.UserEmail,
				PK: data.PK,
				SK: data.SK,
				FullName: data.FullName,
				Gender: data.Gender,
				DateOfBirth: data.DateOfBirth,
				isAdmin: data.isAdmin,
				PasswordHash: data.PasswordHash,
				IsActive: data.IsActive,
				Avatar: data.Avatar,
				Description: data.Description,
				CreatedDate: data.CreatedDate,
			},
		};
	} else if (data.CategoryId !== undefined) {
		params = {
			TableName: 'Blog',
			Item: {
				PK: data.PK,
				SK: data.SK,
				CategoryId: data.CategoryId,
				CategoryName: data.CategoryName,
				Thumbnail: data.Thumbnail,
				CreatedDate: data.CreatedDate,
				UpdatedDate: data.UpdatedDate,
			},
		};
	} else if (data.CommentId !== undefined) {
		params = {
			TableName: 'Blog',
			Item: {
				PK: data.PK,
				SK: data.SK,
				CommentId: data.CommentId,
				ParentPostID: data.ParentPostID,
				CommentContent: data.CommentContent,
				ParentCommentId: data.ParentCommentId,
				CreatedDate: data.CreatedDate,
				AccountInfo: data.AccountInfo,
			},
		};
	} else {
		params = {
			TableName: 'Blog',
			Item: {
				PK: data.PK,
				SK: data.SK,
				PostID: data.PostID,
				PostTitle: data.PostTitle,
				Content: data.Content,
				Thumbnail: data.Thumbnail,
				PostImage: data.PostImage,
				Description: data.Description,
				MetaTitle: data.MetaTitle,
				MetaDescription: data.MetaDescription,
				MetaKeyword: data.MetaKeyword,
				Published: data.Published,
				PublishedDate: data.PublishedDate,
				UpdatedDate: data.UpdatedDate,
				ReadingTime: data.ReadingTime,
				Categories: data.Categories,
				Tags: data.Tags,
				AuthorInfo: data.AuthorInfo,
			},
		};
	}
	docClient.put(params, function (err, dt) {
		if (err) {
			console.error('Unable to add movie', '. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			console.log('PutItem succeeded:', data.SK);
		}
	});
});
