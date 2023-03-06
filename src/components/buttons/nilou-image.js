const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: {
        name: 'nilou-image'
    },
    async execute(interaction, client) {
        client.packageNilouImage.currentPageNilouImage++;
        const response = await axios.get('https://www.zerochan.net/Nilou', {
            params: {
                'q': 'nilou',
                'p': `${client.packageNilouImage.currentPageNilouImage}`
            },
            headers: {
                'authority': 'www.zerochan.net',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'vi,en;q=0.9,en-US;q=0.8',
                'cache-control': 'max-age=0',
                'referer': 'https://www.zerochan.net/Nilou?q=nilou',
                'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1'
            }
        });
        var content = response.data;
        var json = null;
        if (client.packageNilouImage.currentPageNilouImage == 1) json = content.split('<script type="application/ld+json">')[2].split('</script>')[0];
        else json = content.split('<script type="application/ld+json">')[1].split('</script>')[0];
        
        var listImage = null;
        eval(`listImage = ${json}`);
        console.log(listImage)
        const embeds = [];
        embeds.push(new EmbedBuilder().setTitle(`Hình trang trang thứ ${client.packageNilouImage.currentPageNilouImage}:`).setDescription('ảnh được lấy từ zerochan.net, bot xin không chịu trách nhiệm nếu bạn vô tình thấy ảnh nóng của waifu mình!').setURL(`https://www.zerochan.net/Nilou?q=nilou&p=${client.packageNilouImage.currentPageNilouImage}`));
        
        for (let value in listImage.itemListElement) {
            if (value == 8) break;
            embeds.push(new EmbedBuilder().setImage(listImage.itemListElement[value].url));
        }
        embeds.push(new EmbedBuilder().setTitle('Discord giới hạn 10 embeds, nên chỉ có có 9 ảnh. Bạn có thể xem full bằng cách bấm vào tiêu đề ban đầu!'));
        
        await interaction.deferReply({ephemeral: true});  
        await interaction.followUp({embeds: embeds});
       
        return;
  
    }
}