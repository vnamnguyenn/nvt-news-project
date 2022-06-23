const ReadingListRepository = require(`./ReadingListRepository`);

class ReadingListService {
	async getAll(pk) {
		const data = await ReadingListRepository.getAll(pk);
		if (data) {
			return data.Items;
		}
		return data;
	}

	async create(pk, data) {
		return await ReadingListRepository.create(pk, data);
	}

	async deleteByID(pk, SaveID) {
		return await ReadingListRepository.deleteByID(pk, SaveID);
	}
}

module.exports = new ReadingListService();
