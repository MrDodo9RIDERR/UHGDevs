
module.exports = async (uhg, interaction) => {
    if (interaction.isChatInputCommand()) require('../interaction/slashcommands') (uhg, interaction)
    if (interaction.customId) require(`../interaction/${interaction.customId.split('_')[0]}`) (uhg, interaction)
}