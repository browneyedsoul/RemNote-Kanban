import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

export const KANBAN = "powerup_kanban";

let Kanban: string;

async function onActivate(plugin: ReactRNPlugin) {
  try {
    await fetch("snippet.css")
      .then((response) => response.text())
      .then((text) => {
        Kanban = text;
        console.dir("Kanban imported!");
      })
      .catch((error) => console.error(error));
    await plugin.app.registerCSS("Kanban", Kanban);
  } catch (error) {
    await fetch("https://raw.githubusercontent.com/browneyedsoul/RemNote-Kanban/main/src/snippet.css")
      .then((response) => response.text())
      .then((text) => {
        Kanban = text;
        console.log("Kanban imported from cdn!");
      })
      .catch((error) => console.error(error));
    await plugin.app.registerCSS("Kanban", Kanban);
  }
  await plugin.app.registerPowerup("Kanban", KANBAN, "A Power-up Rem for making css-kanban", { slots: [] });
  await plugin.app.registerCommand({
    id: "kanban",
    name: "Kanban",
    description: "Add a power Kanban tag to the current focused Rem",
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      await focusedRem?.addPowerup(KANBAN);
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
