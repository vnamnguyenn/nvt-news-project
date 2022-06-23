const DBRepository = require("./dbRepository");

class DBController {
  async createTable(req, res) {
    try {
      const data = await DBRepository.createTable();
      res
        .status(200)
        .json(
          `Table ${data.TableDescription.TableName} is ${data.TableDescription.TableStatus}`
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deleteTable(req, res) {
    try {
      const data = await DBRepository.deleteTable();
      res
        .status(200)
        .json(
          `Table ${data.TableDescription.TableName} is ${data.TableDescription.TableStatus}`
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async importData(req, res) {
    try {
      await DBRepository.importData();
      res.status(200).json("Import Data in successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async getBackup(req, res) {
    try {
      const data = await DBRepository.getBackup();
      res.status(200).json(data.Items);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createBackup(req, res) {
    try {
      const data = await DBRepository.createBackup(req.user.pk);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async addBackupFromFile(req, res) {
    try {
      const data = await DBRepository.addBackupFromFile(
        req.user.pk,
        req.body.Content
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async restoreBackup(req, res) {
    try {
      await DBRepository.restoreBackup(req.params.path);
      res.status(200).json("Restore Data in successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async deleteBackup(req, res) {
    try {
      await DBRepository.deleteBackup(req.user.pk, req.params.backupId);
      res.status(200).json("Delete in successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new DBController();
