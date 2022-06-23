const PostRepository = require(`../posts/postRepository`);

class PostService {
	async findByID(id) {
		const data = await PostRepository.findByID(id);

		if (data) {
			return data.Items[0];
		}

		return data;
	}

	async getAll() {
		const data = await PostRepository.getAll();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async getPostByAuthor(pk) {
		const data = await PostRepository.getPostByAuthor(pk);

		if (data) {
			return data.Items;
		}

		return data;
	}

	async search(title) {
		const data = await PostRepository.search(title);

		if (data) {
			return data.Items;
		}

		return data;
	}

	async create(pk, data) {
		return await PostRepository.create(pk, {
			PostTitle: data.PostTitle,
			Content: data.Content,
			Thumbnail: data.Thumbnail,
			PostImage: data.PostImage,
			Description: data.Description,
			MetaDescription: data.MetaDescription,
			MetaKeyword: data.MetaKeyword,
			ReadingTime: data.ReadingTime,
			Categories: data.Categories,
			Published: data.Published,
			Tags: data.Tags,
			AuthorInfo: data.AuthorInfo,
		});
	}

	async update(pk, postId, data) {
		return await PostRepository.update(pk, postId, {
			PostImage: data.PostImage,
			Thumbnail: data.Thumbnail,
			ReadingTime: data.ReadingTime,
			Published: data.Published,
			PostTitle: data.PostTitle,
			Description: data.Description,
			MetaDescription: data.MetaDescription,
			MetaKeyword: data.MetaKeyword,
			Tags: data.Tags,
			Categories: data.Categories,
			Content: data.Content,
		});
	}

	async deleteByID(pk, postId) {
		return await PostRepository.deleteByID(pk, postId);
	}
}

module.exports = new PostService();
