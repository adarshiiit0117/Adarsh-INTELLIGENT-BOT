require('dotenv/config');
const {Client}=require('discord.js');
const {OpenAI}=require('openai');
const client=new Client({
    intents: ['Guilds','GuildMembers','GuildMessages','MessageContent'],
});
client.on('ready',()=>{
    console.log('the bot is online.');
})
const CHANNELS=['your channel id'];
const openai=new OpenAI({
    apiKey:process.env.OPENAI_KEY,
})
client.on('messageCreate',async(message) => {
    if(message.author.bot)return;
    if(!CHANNELS.includes(message.channelId)&&message.mentions.users.has(client.user.id))return;
    const response= await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
            {
                //name:
                role:'system',
                content:'this is intelligent bot created by adarsh dubey.'

        
            },
            {
                //name:
                role:'user',
                content:message.content,
            }
        ]
    })
    .catch((error)=>console.error('OpenAI Error:\n',error));
    message.reply(response.choices[0].message.content);
});

client.login(process.env.Token);    