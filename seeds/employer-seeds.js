const { Employer } = require('../models');

const employerData = [
    {
        username: 'Umbrella Corp.',
        email: 'u@umbrella.com',
        url: 'https://residentevil.fandom.com',
        password: '1234'
    },    
    {
        username: 'The Axe Gang',
        email: 'axe@gang.com',
        url: 'https://en.wikipedia.org/wiki/The_Axe_Gang',
        password: '1234'
    },    
    {
        username: 'The Barksdale Organization',
        email: 'barks@org.com',
        url: 'https://en.wikipedia.org/wiki/Barksdale_Organization',
        password: '1234'
    },    
    {
        username: 'The Court of Owls',
        email: 'owls@owls.com',
        url: 'https://en.wikipedia.org/wiki/Court_of_Owls',
        password: '1234'
    },    
    {
        username: 'H.I.V.E',
        email: 'hive@hive.com',
        url: 'https://en.wikipedia.org/wiki/H.I.V.E.',
        password: '1234'
    },    
    {
        username: 'S.W.O.R.D',
        email: 'sword@thesaint.com',
        url: 'https://en.wikipedia.org/wiki/S.W.O.R.D._(The_Saint)',
        password: '1234'
    },    
    {
        username: 'Shadowspire',
        email: 'shadow@spire.com',
        url: 'https://en.wikipedia.org/wiki/Shadowspire',
        password: '1234'
    },    
    {
        username: 'SPECTRE',
        email: 'spec@tre.com',
        url: 'https://en.wikipedia.org/wiki/SPECTRE',
        password: '1234'
    },    
    {
        username: "Thieves Guild",
        email: 'thieves@guild.com',
        url: 'https://en.wikipedia.org/wiki/Thieves%27_guild',
        password: '1234'
    },    
    {
        username: 'The Hand',
        email: 'hand@arm.com',
        url: 'https://en.wikipedia.org/wiki/The_Hand_(comics)',
        password: '1234'
    },
]

const seedEmployers = () => Employer.bulkCreate(employerData, {individualHooks: true});

module.exports = seedEmployers;