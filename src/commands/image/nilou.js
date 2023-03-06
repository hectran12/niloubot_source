const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('nilou')
    .setDescription('Xem ảnh của nilou'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
        .setCustomId('nilou-image')
        .setLabel('Xem trang tiếp theo')
        .setStyle(ButtonStyle.Primary)
        
        const response = await axios.get('https://www.zerochan.net/Nilou', {
            params: {
                'q': 'nilou'
            },
            headers: {
                'authority': 'www.zerochan.net',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'vi,en;q=0.9,en-US;q=0.8',
                'cache-control': 'max-age=0',
                'referer': 'https://www.zerochan.net/',
                'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
            }
        });
        var fullPageInfo = response.data;
        var countImage = fullPageInfo.split(' images. </p>')[0].split('<p>')[1].replace(',','');
        var countPage = fullPageInfo.split('page 1 of ')[1].split('<')[0];
        await interaction.deferReply({ephemeral: true});  
        if (countImage != undefined || countImage != "") { countImage = Number.parseInt(countImage); countPage = Number.parseInt(countPage)}
        
        else {
            await interaction.followUp({
                content: 'Không truy cập được đến trang lấy ảnh'
            });
            return;
        }
        client.packageNilouImage = {
            countImage,
            countPage,
            currentPageNilouImage: 0
        }
        let counterRemoveImage = 60;
        // embed
        const embed = new EmbedBuilder()
        .setTitle('Thông tin')
        .setDescription(`Hiện tại đang có ${countImage} ảnh về nilou!\nGồm tất cả ${countPage} trang ( mỗi trang 24 ảnh )\nBạn đang ở trang thứ ${client.packageNilouImage.currentPageNilouImage}\n${client.packageNilouImage.currentPageNilouImage == 0 ? "Trang này hiện tại không có ảnh" : "Bạn có thể sang trang tiếp theo để xem"}\nTin nhắn này sẽ bị hủy sau: ${counterRemoveImage} giây nữa!`)
        .setImage(client.user.displayAvatarURL())
        
        await interaction.followUp({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(button)]
        });
        
        var interValId = setInterval(async()=>{
            if (counterRemoveImage <= 0) { 
                const newEmbed = new EmbedBuilder().setTitle('Phiên hình ảnh đã hết hạn, có thể tạo lệnh mới!')
                .setDescription('Xem thế là đủ rùi....');
                
                button.setDisabled(true);
                await interaction.editReply({
                    embeds: [newEmbed],
                    components: [new ActionRowBuilder().addComponents(button)]
                });
                
                clearInterval(interValId); 
                return;
            }
            const embed = new EmbedBuilder()
            .setTitle('Thông tin')
            .setDescription(`Hiện tại đang có ${countImage} ảnh về nilou!\nGồm tất cả ${countPage} trang ( mỗi trang 24 ảnh )\nBạn đang ở trang thứ ${client.packageNilouImage.currentPageNilouImage}\n${client.packageNilouImage.currentPageNilouImage == 0 ? "Trang này hiện tại không có ảnh" : "Bạn có thể sang trang tiếp theo để xem"}\nTin nhắn này sẽ bị hủy sau: ${counterRemoveImage} giây nữa!`)
            .setImage(client.user.displayAvatarURL())
            
            await interaction.editReply({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(button)]
            });
            
            counterRemoveImage -= 2;
        },2000);
       
    }
}
