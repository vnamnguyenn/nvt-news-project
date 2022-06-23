const TagRepository = require(`./tagRepository`);

class TagService {
	async findByID(id) {
		const data = await TagRepository.findByID(id);

		if (data) {
			return data.Items[0];
		}

		return data;
	}

	async getAll() {
		const data = await TagRepository.getAll();
		
		if (data) {
			return data.Items;
		}

		return data;
	}

	async create(pk, data) {
		return await TagRepository.create(pk, {
			TagName: data.TagName,
			Thumbnail: data.Thumbnail,
		});
	}

	async update(pk, tagId, data) {
		return await TagRepository.update(pk, tagId, {
			TagName: data.TagName,
			Thumbnail: data.Thumbnail,
		});
	}

	async deleteByID(pk, tagId) {
		return await TagRepository.deleteByID(pk, tagId);
	}
}

module.exports = new TagService();
