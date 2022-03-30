const PostRepository = require(`../posts/postRepository`);
const {v4: uuidv4} = require('uuid');

class PostService {
	async findByID(PK) {
		const data = await PostRepository.findByID(PK);

		if (data) {
			return data.Item;
		}

		return data;
	}

	async getAll() {
		const data = await PostRepository.getAll();

		if (data) {
			return data;
		}

		return data;
	}

	async create(data) {
		return await PostRepository.create({
			PostID: uuidv4(),
			PK: 'ACCT_' + '123',
			SK: 'POST_' + uuidv4(),
			UserEmail: 'empty',
			PostTitle: data.PostTitle,
			Content: data.Content,
			Slug: data.Slug,
			Thumbnail: data.Thumbnail,
			PostImage: data.PostImage,
			LikeCount: '0',
			CommentCount: '0',
			SaveCount: '0',
			ViewCount: '0',
			MetaTitle: data.MetaTitle,
			MetaDescription: data.MetaDescription,
			MetaKeyword: data.MetaKeyword,
			Published: data.Published,
			PublishedDate: data.PublishedDate,
			CreatedBy: data.CreatedBy,
			UpdatedBy: data.UpdatedBy,
			CreatedDate: data.CreatedDate,
			UpdatedDate: data.UpdatedDate,
			ReadingTime: data.ReadingTime,
		});
	}

	async update(PK, data) {
		return await PostRepository.update(PK, {
			Role: data.Role,
		});
	}

	async deleteByID(PK) {
		return await PostRepository.deleteByID(PK);
	}
}

module.exports = new PostService();
