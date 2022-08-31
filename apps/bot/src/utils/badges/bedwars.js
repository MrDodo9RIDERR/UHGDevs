

exports.setup = (uhg, guild) => {
    let info = {
        name: 'BedWars',
        path: 'hypixel/stats/bedwars/',
        stats: ['level', 'overall/finalKills'],
        statsNames: ['Level', 'Finální Zabití'],
        req: [[100, 300, 500], [2000, 5000, 10000]]
    }
    let find = new RegExp(`(${info.name}) (god|expert|trained)`, 'i')

    info.roles = guild.roles.cache.filter(n => n.name.match(find)).map(role => {
        role.pos = role.name.endsWith('God') ? 2 : (role.name.endsWith('Expert') ? 1 : 0 )
        role.req = info.req.map(n => n[role.pos])

        return role
    }).sort((a, b) => a.pos - b.pos)

    info.ids = info.roles.map(n => n.id)

    info.getRole = uhg.getBadgeRoles
    return info
}
