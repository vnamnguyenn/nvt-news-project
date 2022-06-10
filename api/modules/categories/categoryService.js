const CategoryRepository = require(`./categoryRepository`);

class CategoryService {
	async findByID(categoryId) {
		const data = await CategoryRepository.findByID(categoryId);

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

	async create(pk, data) {
		return await CategoryRepository.create(pk, {
			CategoryName: data.CategoryName,
			Thumbnail: data.Thumbnail,
		});
	}

	async update(pk, categoryId, data) {
		return await CategoryRepository.update(pk, categoryId, {
			CategoryName: data.CategoryName,
			Thumbnail: data.Thumbnail,
		});
	}

	async deleteByID(pk, categoryId) {
		return await CategoryRepository.deleteByID(pk, categoryId);
	}
}

module.exports = new CategoryService();
