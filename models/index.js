const Skill = require('./Skill');
const User = require('./User');
const Job = require('./Job');
const Employer = require('./Employer');
const Message = require('./Message');
// User-Skill one to many
User.belongsToMany(Skill, {
    through: 'skill_id',
    as: 'skill'
});
    // foreignKey: 'skill_id'
Skill.belongsToMany(User, {
    through: 'skill_id',
    as: 'skill'
});
    // foreignKey: 'skill_id');
// Skill-Job many to many
Skill.belongsToMany(Job, {
    through: 'skill_id',
    as: 'jobskill'
});
Job.belongsToMany(Skill, {
    through: 'skill_id',
    as: 'jobskill'
});
// Employer to job one to many
Employer.hasMany(Job, {
    foreignKey: 'employer_id'
});
Job.belongsTo(Employer, {
    foreignKey: 'employer_id'
});
// message to user/employer both many to one
Message.belongsTo(User, {
    foreignKey: 'user_id'
});
Message.belongsTo(Employer, {
    foreignKey: 'employer_id'
});
User.hasMany(Message, {
    foreignKey: 'user_id'
});
Employer.hasMany(Message, {
    foreignKey: 'employer_id'
});
module.exports = { User, Employer, Skill, Job, Message };









