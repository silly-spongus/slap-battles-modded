import { ServerStorage } from "@rbxts/services";

export const Tools = ServerStorage.WaitForChild("Tools") as Folder & {
	F3X: Tool;
	["Sky Tool"]: Tool;
};
