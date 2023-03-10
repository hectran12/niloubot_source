
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Attachment} = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('getgfn')
    .setDescription('Nhận geforce now premium miễn phí'),
    async execute(interaction, client) {
        
        var user = interaction.user;
        
        const response = await axios.get('<private api contact admin>', {
            params: {
                'discord_user': `${user.id}`
            },
            headers: {
                'authority': 'tronghoa.dev',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'vi,en;q=0.9,en-US;q=0.8',
                'cache-control': 'max-age=0',
                'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36 Edg/110.0.1587.57'
            }
        });
        
        // noti to all

        const embed = new EmbedBuilder().setTitle(`${user.username} đang nhận tài khoản geforce now premium miễn phí!`)
        .setDescription('Tài khoản GFN Premium để làm gì?\n->để chơi game trên geforce now\nTài khoản thuộc khu vực nào?\n->Nhật bản\nCó cần sài VPN không?\n->Có\nCó thực sự là miễn phí không?\n->Yah, sure. Chắc chắn là miễn phí rồi!')
        .setImage("https://th.bing.com/th/id/R.be5394eb6f8644010f157a47a50e9193?rik=SRF1JNC0HmnUMw&pid=ImgRaw&r=0")

        await interaction.reply({
            embeds: [embed]
        })
  

        // private message
        if(response.data != undefined) {
            var data = response.data;
            if (data.Status_Active == false) {
                const newEmbed = new EmbedBuilder().setTitle('Vui lòng vượt link để có thể nhận được tài khoản!')
                .setDescription('Vì sao phải vượt link? vượt link tạo kinh phí để cho chủ web duy trì site!')
                
                await interaction.followUp({embeds:[newEmbed, new EmbedBuilder().setTitle("ẤN VÀO ĐÂY ĐỂ TRUY CẬP ĐẾN CHỖ VƯỢT LINK!").setURL(data.link)], ephemeral: true});
                let timeout = 180;
                await interaction.followUp({
                    embeds: [new EmbedBuilder()
                    .setTitle(`Bạn có 3 phút, vượt xong hãy quay lại đây!`)
                    .setDescription('Xin hãy nhanh lên....')
                    ]
                , ephemeral: true});
                
                var idinter = setInterval(async()=>{
                    if (timeout <= 0) { 
                        await interaction.followUp({
                            embeds: [new EmbedBuilder()
                                .setTitle(`Hết thời gian, bạn có thể dùng lại lệnh nếu đã vượt xong!`)
                                .setDescription('Có thể ghi lại lệnh để nhận tài khoản nếu đã vượt xong. Ngoài ra có thể dùng tài khoản discord để nhận thêm (lưu ý 1 tài khoản discord 1 ngày chỉ nhận được 1 acc!)')
                                ]
                            , ephemeral: true
                        })
                        clearInterval(idinter);
                        return;
                    }
                    const response = await axios.get('<private api contact admin>', {
                        params: {
                            'discord_user': `${user.id}`
                        },
                        headers: {
                            'authority': 'tronghoa.dev',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'vi,en;q=0.9,en-US;q=0.8',
                            'cache-control': 'max-age=0',
                            'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                            'sec-ch-ua-mobile': '?1',
                            'sec-ch-ua-platform': '"Android"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'none',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36 Edg/110.0.1587.57'
                        }
                    });
                    if(response.data.Status_Active) {
                        const embed = new EmbedBuilder().setTitle(`${user.username} đã nhận thành công tài khoản geforce now premium miễn phí!`)
                        .setDescription('Tài khoản GFN Premium để làm gì?\n->để chơi game trên geforce now\nTài khoản thuộc khu vực nào?\n->Nhật bản\nCó cần sài VPN không?\n->Có\nCó thực sự là miễn phí không?\n->Yah, sure. Chắc chắn là miễn phí rồi!')
                        .setImage("https://th.bing.com/th/id/R.be5394eb6f8644010f157a47a50e9193?rik=SRF1JNC0HmnUMw&pid=ImgRaw&r=0")

                        await interaction.followUp({
                            embeds: [embed]
                        })
                        var accgfn = response.data.acc_gfn.split("|");
                        const newem = new EmbedBuilder().setTitle("Tài khoản geforce now của bạn đây!").setDescription("Lưu ý một ngày chỉ nhận được 1 tài khoản, nếu thấy bảng này tức là hôm nay bạn đã nhận và đây là acc bạn đã nhận!")
                        .addFields(
                            {
                                name: 'Email mailforspam.com:',
                                value: accgfn[0]
                            },
                            {
                                name: 'Tài khoản au:',
                                value: accgfn[0]
                            },
                            {
                                name: 'Mật khẩu au:',
                                value: accgfn[3]
                            },
                            {
                                name: 'Ngày tài khoản khởi tạo:',
                                value: accgfn[5]
                            }
                        )
                        await interaction.followUp({
                            embeds: [newem],
                            ephemeral: true
                        })
                        clearInterval(idinter);
                        return;
                    }
                    timeout -= 5;
                    
                },5000);
            } else {
                const embed = new EmbedBuilder().setTitle(`${user.username} vừa xem tài khoản geforce now premium đã nhận!`)
                        .setDescription('Tài khoản GFN Premium để làm gì?\n->để chơi game trên geforce now\nTài khoản thuộc khu vực nào?\n->Nhật bản\nCó cần sài VPN không?\n->Có\nCó thực sự là miễn phí không?\n->Yah, sure. Chắc chắn là miễn phí rồi!')
                        .setImage("https://th.bing.com/th/id/R.be5394eb6f8644010f157a47a50e9193?rik=SRF1JNC0HmnUMw&pid=ImgRaw&r=0")

                        await interaction.followUp({
                            embeds: [embed]
                        })
                var accgfn = response.data.acc_gfn.split("|");
                const newem = new EmbedBuilder().setTitle("Tài khoản geforce now của bạn đây!").setDescription("Lưu ý một ngày chỉ nhận được 1 tài khoản, nếu thấy bảng này tức là hôm nay bạn đã nhận và đây là acc bạn đã nhận!")
                .addFields(
                    {
                        name: 'Email mailforspam.com:',
                        value: accgfn[0]
                    },
                    {
                        name: 'Tài khoản au:',
                        value: accgfn[0]
                    },
                    {
                        name: 'Mật khẩu au:',
                        value: accgfn[3]
                    },
                    {
                        name: 'Ngày tài khoản khởi tạo:',
                        value: accgfn[5]
                    }
                )
                await interaction.followUp({
                    embeds: [newem],
                    ephemeral: true
                })
            }
            
        } else {
            await interaction.followUp({content:'Xảy ra lỗi tại hệ thống!', ephemeral: true});
        }

    }
}
