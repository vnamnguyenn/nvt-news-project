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

	async create(pk,data) {
		return await PostRepository.create(pk,{
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
			Categories:data.Categories,
			Tags: data.Tags,
			AuthorInfo: data.AuthorInfo
		});
	}

	async update(data) {
		return await PostRepository.update({
			Content: data.Content,
			PostImage: data.PostImage,
			Thumbnail: data.Thumbnail,
			ReadingTime: data.ReadingTime,
			Published: data.Published,
			PostTitle: data.PostTitle,
		});
	}

	async deleteByID(id) {
		return await PostRepository.deleteByID(id);
	}
}

module.exports = new PostService();
