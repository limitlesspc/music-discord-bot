// eslint-disable-next-line import/no-cycle
import { getPlayer } from '../players';
import woof from '$services/woof';
import { command } from '$services/command';

export default command(
  {
    name: 'play',
    aliases: ['p'],
    desc: 'Plays a song by name or URL',
    args: [
      {
        name: 'query',
        type: 'string[]',
        desc: 'The URLs or YouTube searches to play',
        optional: true
      }
    ] as const
  },
  async (message, [queries]) => {
    const { guildId } = message;
    if (!guildId) return;
    const player = getPlayer(guildId);

    const channel = message.member?.voice.channel;
    if (channel?.type !== 'GUILD_VOICE')
      return message.reply(`${woof()}, you are not in a voice channel`);

    return player.add(message, queries?.join(' '));
  }
);
