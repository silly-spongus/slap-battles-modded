import { Command, Permissions } from "server/commands/command";
import { Tools } from "server/assets";

const f3x = new Command("f3x", "btools");
f3x.triggered.Connect((player) => {
	if (Permissions.isServerOwner(player)) {
		const backpack = player.FindFirstChildWhichIsA("Backpack");
		if (backpack) {
			if (backpack.FindFirstChild("F3X") === undefined && player.Character?.FindFirstChild("F3X") === undefined) {
				Tools.F3X.Clone().Parent = backpack;
			}
			if (
				backpack.FindFirstChild("Sky Tool") === undefined &&
				player.Character?.FindFirstChild("Sky Tool") === undefined
			) {
				Tools["Sky Tool"].Clone().Parent = backpack;
			}
		}
	}
});
