const TagRepository = require(`./TagRepository`);

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

	async popularTag() {
		const data = await TagRepository.popularTag();

		if (data) {
			return data.Items;
		}

		return data;
	}

	async create(pk,data) {
		return await TagRepository.create(pk,{
			TagName: data.TagName,
			Slug:data.Slug,
			Thumbnail: data.Thumbnail,
		});
	}

	async update(data) {
		return await TagRepository.update({
			Content: data.Content,
			PostImage: data.PostImage,
			Thumbnail: data.Thumbnail,
			ReadingTime: data.ReadingTime,
			Published: data.Published,
			PostTitle: data.PostTitle,
		});
	}

	async deleteByID(id) {
		return await TagRepository.deleteByID(id);
	}
}

module.exports = new TagService();
