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
			console.log(data.Count);
			return data.Items;
		}

		return data;
	}

	async featuredArticles() {
		const data = await PostRepository.featuredArticles();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async trendingNews() {
		const data = await PostRepository.trendingNews();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async olderPost() {
		const data = await PostRepository.olderPost();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async quickRead() {
		const data = await PostRepository.quickRead();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async create(pk, data) {
		return await PostRepository.create(pk, {
			PostTitle: data.PostTitle,
			Content: data.Content,
			Slug: data.Slug,
			Thumbnail: data.Thumbnail,
			PostImage: data.PostImage,
			Description: data.Description,
			MetaTitle: data.MetaTitle,
			MetaDescription: data.MetaDescription,
			MetaKeyword: data.MetaKeyword,
			ReadingTime: data.ReadingTime,
			Categories: data.Categories,
			Tags: data.Tags,
			AuthorInfo: data.AuthorInfo,
		});
	}

	async update(pk, postId, data) {
		return await PostRepository.update(pk, postId, {
			PostID: postId,
			Content: data.Content,
			PostImage: data.PostImage,
			Thumbnail: data.Thumbnail,
			ReadingTime: data.ReadingTime,
			Published: data.Published,
			PostTitle: data.PostTitle,
			MetaTitle: data.MetaTitle,
			MetaDescription: data.MetaDescription,
			MetaKeyword: data.MetaKeyword,
		});
	}

	async deleteByID(pk, postId) {
		return await PostRepository.deleteByID(pk, postId);
	}
}

module.exports = new PostService();
