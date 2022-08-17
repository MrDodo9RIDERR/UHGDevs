module.exports = {
  name: "ArenaBrawl",
  aliases: ["ab", "arena", "arenabrawl"],
  run: async (uhg, pmsg) => {
    try{
      let nickname = pmsg.nickname
      let getmode = pmsg.args
      let args1;
      let args2;
      if (getmode) args1 = getmode.split(" ")[0]
      if (getmode) args2 = getmode.split(" ")[1]
      let mode;
      let all = ["deck", "setup", "skills", "skilly", "basic", "normal", "overall", "základní", "rt", "rating", "pos", "ranked", "position", "pozice"]
      let deck = ["deck", "setup", "skills", "skilly"];
      let basic = ["basic", "normal", "overall", "základní"]
      let ranked = ["rt", "rating", "pos", "ranked", "position", "pozice"]
      for (let i in all) {
        if (args1 == all[i]) {nickname = args2 || pmsg.username; mode = args1}
        else if (args2 == all[i]) {nickname = args1 || pmsg.username; mode = args2}
        if (basic.includes(mode)) mode = "basic"
        else if (deck.includes(mode)) mode = "deck"
        else if (ranked.includes(mode)) mode = "ranked"
      }
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let arena = api.hypixel.stats.arena
      let overall = arena.overall
      let maxed = "";
      let rune = arena.rune;
      if (arena.upgrades.cooldown+arena.upgrades.health+arena.upgrades.energy+arena.upgrades.damage == 36) maxed = "[MAXED]";
      if (arena.rune_levels[rune] == 6 && arena.upgrades.cooldown+arena.upgrades.health+arena.upgrades.energy+arena.upgrades.damage == 36) maxed = "[MAXED+]";

      let offensive = uhg.getArena(arena.offensive);
      let utility = uhg.getArena(arena.utility);
      let support = uhg.getArena(arena.support);
      let ultimate = uhg.getArena(arena.ultimate);
      let fancyrune = uhg.getArena(rune)

      let prefix  = `[${uhg.f(overall.wins)}]`
      let minigame = `**Arena**:`
      let username = `**${api.username}**`
      let shortbuild = (offensive[0]+utility[0]+support[0]+ultimate[0]).toUpperCase()
      let fullbuild = `${offensive}, ${utility}, ${support}, ${ultimate}, ${fancyrune} Rune`
      let rating = `${arena.highestrt} Best Rt`
      let position = `#${arena.highestpos} Best Pos`

      let message = `${minigame} ${prefix} ${username} - ${shortbuild} ${maxed}`
      if (mode === "basic") message = `${minigame} ${prefix} ${username} - ${uhg.f(arena.overall.wins)}Wins ${uhg.f(arena.overall.kills)}Kills ${uhg.f(arena.overall.wlr)}WLR ${maxed}`
      else if (mode === "deck") message  = `${minigame} ${prefix} ${username} - ${fullbuild} ${maxed}`
      else if (mode === "ranked") message = `${minigame} ${prefix} ${username} - ${rating}, ${position}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v ArenaBrawl příkazu!"
    }
  }
}
