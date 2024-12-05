const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.DATABASE_FILE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
});

db.run("CREATE TABLE IF NOT EXISTS balances(user_id TEXT, channel_id TEXT, balance INTEGER DEFAULT 0, PRIMARY KEY(user_id, channel_id));", (err) => {
  if (err) {
    console.error("failed to create balances table");
    console.error(err.message);
    return;
  }
  console.log('Table created or already exists.');
});

const addNewEntry = (user_id, channel_id) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO balances (user_id, channel_id) VALUES (?, ?);", [user_id, channel_id], (err) => {
      if (err) {
        reject("failed to add new user")
        return;
      }
      resolve();
    });
  });
};

const getUserBalance = (user_id, channel_id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT balance FROM balances WHERE user_id = ? AND channel_id = ?;", [user_id, channel_id], (err, row) => {
      if (err) {
        reject("failed to get user balance");
        return;
      }
      if (!row) {
        resolve(NaN);
        return;
      }
      resolve(row.balance);
    });
  });
};

const setUserBalance = (user_id, channel_id, balance) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE balances SET balance = ? WHERE user_id = ? AND channel_id = ?;", [balance, user_id, channel_id], (err) => {
      if (err) {
        reject("failed to set user balance");
        return;
      }
      resolve();
    });
  });
};

const addAmountToUserBalance = (user_id, channel_id, amount) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE balances SET balance = balance + ? WHERE user_id = ? AND channel_id = ?;", [amount, user_id, channel_id], (err) => {
      if (err) {
        reject("failed to add amount to user balance");
        return;
      }
      resolve();
    });
  });
};

module.exports = {
  addNewEntry,
  getUserBalance,
  addAmountToUserBalance,
  setUserBalance,
};