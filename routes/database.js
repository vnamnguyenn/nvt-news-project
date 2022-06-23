const DBController = require("../modules/database/dbController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

module.exports = async (app) => {
  app.post("/api/database/create", DBController.createTable);
  app.delete("/api/database/delete", DBController.deleteTable);
  app.get("/api/backup", DBController.getBackup);
  app.get("/api/backup/import_data", DBController.importData);
  app.post(
    "/api/backup/add_backup_from_file",
    verifyTokenAndAdmin,
    DBController.addBackupFromFile
  );
  app.get(
    "/api/backup/restore/:path",
    verifyTokenAndAdmin,
    DBController.restoreBackup
  );
  app.post(
    "/api/backup/create",
    verifyTokenAndAdmin,
    DBController.createBackup
  );
  app.delete(
    "/api/backup/delete/:backupId",
    verifyTokenAndAdmin,
    DBController.deleteBackup
  );
};
