module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'TaskList',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};