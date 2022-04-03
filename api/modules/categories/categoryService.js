const CategoryRepository = require(`./categoryRepository`);

class CategoryService {
	async findByID(id) {
		const data = await CategoryRepository.findByID(id);

		if (data) {
			return data.Items[0];
		}

		return data;
	}

	async getAll() {
		const data = await CategoryRepository.getAll();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async create(pk,data) {
		return await CategoryRepository.create(pk,{
			CategoryName: data.CategoryName,
			Slug:data.Slug,
			Thumbnail: data.Thumbnail,
		});
	}

	async update(data) {
		return await CategoryRepository.update({
			Content: data.Content,
			PostImage: data.PostImage,
			Thumbnail: data.Thumbnail,
			ReadingTime: data.ReadingTime,
			// Published: data.Published,
			PostTitle: data.PostTitle,
		});
	}

	async deleteByID(id) {
		return await CategoryRepository.deleteByID(id);
	}
}

module.exports = new CategoryService();
