import { Players, TextChatService } from "@rbxts/services";
import Signal from "@rbxts/signal";

const PREFIX = "/";

export class Command {
	name: string;
	alias: string | void;
	triggered: Signal<(player: Player, args: string[]) => void>;
	constructor(name: string, alias: string | void) {
		this.name = name;
		this.alias = alias;

		const instance = new Instance("TextChatCommand");
		instance.Name = name;
		instance.PrimaryAlias = `${PREFIX}${name}`;
		if (alias !== undefined) {
			instance.SecondaryAlias = `${PREFIX}${alias}`;
		}
		instance.Parent = TextChatService;

		this.triggered = new Signal();
		instance.Triggered.Connect((textSource, unfilteredText) => {
			const player = Players.GetPlayerByUserId(textSource.UserId);
			if (player) {
				const argSplit = unfilteredText.split(" ");
				argSplit.remove(0);

				this.triggered.Fire(player, argSplit);
			}
		});
	}
}

export namespace Permissions {
	export function isServerOwner(player: Player): boolean {
		if (player.GetAttribute("IsServerOwner") === true) {
			return true;
		}
		return false;
	}
}
