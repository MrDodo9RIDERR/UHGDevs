const { MessageEmbed } = require("discord.js");

module.exports = async (uhg, interaction) => {
  await interaction.update({ type: 6 })
  try {
    let guild = interaction.guild
    if (guild.id !== '455751845319802880') return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Tato funkce funguje jen na UHG discordu`).setColor("RED")], ephemeral: true })
    let role = guild.roles.cache.get(interaction.customId.split('_')[1])
    if (!role) return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Daná role nebyla nalezena! Kontaktuj prosím developery!`).setColor("RED")], ephemeral: true })
    let member = guild.members.cache.get(interaction.user.id)

    /* -- Remove ROLE -- */
    if (member._roles.includes(role.id)) {
      try {
        await member.roles.remove(role)
        return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Úspěšně sis odebral ${role.name} roli!`).setColor("GREEN")], ephemeral: true })
      } catch (e) {
        return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Nastala chyba při odebírání ${role.name} role!`).setColor("RED")], ephemeral: true })
      }
    }

    /* -- Add ROLE -- */
    try {
      await member.roles.add(role)
      return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Úspěšně sis přidal ${role.name} roli!`).setColor("GREEN")], ephemeral: true })
    } catch (e) {
      return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Nastala chyba při přidávání ${role.name} role!`).setColor("RED")], ephemeral: true })
    }
  } catch(e) {
    console.log(e)
    try {interaction.followUp({ embeds: [new MessageEmbed().setTitle(`Nastala chyba v custom rolích!`).setColor("RED")], ephemeral: true })} catch (e) {}

  }
}