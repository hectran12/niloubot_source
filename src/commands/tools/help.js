const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Tìm sự giúp đỡ tại đây!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });


        // get all commands
        const {commandArray} = client;
        let fields = {};
        commandArray.map((value, index) => {
            if (fields[value.folder_name] == undefined) fields[value.folder_name] = "";
            fields[value.folder_name] += value.name + " --> " + value.description + "\n";
        })

        
        var loadCommandsOutput = [];
        for (var name in fields) {
            loadCommandsOutput.push({
                name: name,
                value: fields[name]
            })
        }
            
       
        const embed = new EmbedBuilder()
        .setTitle('Danh sách các lệnh')
        .setDescription('Đây là danh sách các lệnh có thể sử dụng')
        .setColor(0x8ee4f0)
        .setImage('https://i.ibb.co/Z2GCF8S/Thi-t-k-ch-a-c-t-n-5.png')
        .setTimestamp(Date.now())
        .setAuthor({
            url: 'https://www.facebook.com/profile.php?id=100077557920226',
            iconURL: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/333133356_1137525963603379_5721177220991376414_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0zdKKY6vnsYAX9MQJlh&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfCMCjP9WXh_bCifxlor3YCt6hP1AwqzVy4eZSItfiGsHg&oe=640252CA',
            name: 'Tran Trong Hoa'
        })
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag
        })
        .addFields(loadCommandsOutput)
        await interaction.followUp({
            embeds: [embed]
        })
    }
}
