const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { SlashCommandBuilder } = require('@discordjs/builders');

const clientId = '1196713123932024922';
const botToken = 'MTE5NjcxMzEyMzkzMjAyNDkyMg.GK8zKa.y38WY28e5Wnidw_gPHmjDxhpbRhkipQVtV0bpw';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const philipId = '774200068571791390';
const andreasId = '499557599117705227';
const ahmadId = '451707405047169044';
const eliasId = '281836366457995264';
const mattisId = '770558189103480832';
const axelId = '770558189103480832';
const kristofferId = '528266905551896596';

const quotes = [
    "Vet du hva du skal gjøre?",
    "Make it work, make it fast, make it beautiful.",
    "Det som skjer, det som skjer, er det, som skjer, nå!",
    "Går det bra, nei går det virkelig bra?",
    "Vi må ikke pytonifisere JavaScript."
];

const commands = [
    new SlashCommandBuilder()
        .setName('hardquote')
        .setDescription('Get a random quote'),
    new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin (Heads or Tails)'),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping to pong.'),
    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option => option.setName('target').setDescription('The user to be kicked').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for the kick').setRequired(false)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(botToken);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isCommand()) return;

        const { commandName, options } = interaction;

        if (commandName === 'hardquote') {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const reply = quotes[randomIndex];
            await interaction.reply(reply);
        } else if (commandName === 'coinflip') {
            const result = Math.random() < 0.5 ? 'https://i.ibb.co/pZchL16/395-3951330-thecoinspot-com-us-washington-head-quarter-dollar-coin.png' : 'https://i.ibb.co/vZkHWSY/146-1464848-quarter-tail-png-tails-on-a-coin.png';
            await interaction.reply(`${result}`);
        } else if (commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    } catch (error) {
        console.error('Error in interactionCreate event:', error);
        await interaction.reply('An error occurred while processing your command.');
    }
});

client.on('messageCreate', async (message) => {
});