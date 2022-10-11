const { Collection } = require("discord.js");

module.exports = {
    name: "database",
    aliases: ['db'],
    permissions: [{ id: '312861502073995265', type: 'USER', permission: true }, { id: '378928808989949964', type: 'USER', permission: true }, { id: '419183469911080960', type: 'USER', permission: true }],
    platform: "dc",
    type: "message",
    run: async (uhg, message, content) => {
        message.delete()
        let keys = await uhg.redis.keys('*')

        console.log(keys)
        // console.timer('a')
        
        // let stat = await Promise.all(keys.map(async (key) => await uhg.redis.json.get(key, { path: '.stats.username'})))


        // console.timeEnd('a')
        //   return 'DONE'

        let stats = await uhg.get('stats', 'stats', { username: 'DavidCzPdy'})
        console.log('stats loaded')

        //stats = stats.filter(n => !keys.includes(n))
        
        for (let stat of stats) {
            await uhg.redis.json.set(stat.uuid, '.', { stats: stat })
        }
        
        console.warn('not done yet!')
    }
}
