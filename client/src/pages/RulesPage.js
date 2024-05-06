import React from 'react';
import styled from 'styled-components';

const RulesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const RuleItem = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const RuleNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #FFAA00;
  margin-bottom: 10px;
`;

const RuleTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RuleDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;

const ModContainer = styled.div`
  padding-left: 5rem;
  padding-right: 5rem;
  margin: 5rem;
`;

const ModList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  columns: 3;
  column-gap: 2rem;
`;

const ModItem = styled.li`
  margin-bottom: 1rem;
`;

const ModLink = styled.a`
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const SectionHeader = styled.h3`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

function RulesPage() {
  const rules = [
    {
      number: '01',
      title: 'Hacking',
      description: 'This naturally includes X-ray and any other modification that allows actions not accessible to a vanilla player. See client list below for more details.',
    },
    {
      number: '02',
      title: 'Ads/Spam',
      description: "Spam/ads are handled at staff's discretion. Ads for groups within the True community are permitted.",
    },
    {
      number: '03',
      title: 'Hate Speech',
      description: 'We encourage counter culture but there is a line we must draw to fulfill our goal of an inclusive community. This line is drawn by our staff team.',
    },
    {
      number: '04',
      title: 'Alts',
      description: 'We do this for a slew of reasons; keeping resources for active players, encourage teams and keeping it fair for those with 1 account.',
    },
    {
      number: '05',
      title: 'Lag Machines',
      description: 'This includes lag machines of any type, as well as any purposeful actions meant to cause the server harm.',
    },
  ];

  const allowedMods = [
      { name: '3D Skin Layers', link: 'https://modrinth.com/mod/3dskinlayers' },
      { name: 'Add Back Potion Glint', link: 'https://modrinth.com/mod/addbackpotionglint' },
      { name: 'AdvancedChatCore', link: 'https://modrinth.com/mod/advancedchatcore' },
      { name: 'AdvancedChatLog', link: 'https://modrinth.com/mod/advancedchatlog' },
      { name: 'AdvancementInfo', link: 'https://modrinth.com/mod/advancementinfo' },
      { name: 'AmbientSounds', link: 'https://modrinth.com/mod/ambientsounds' },
      { name: 'Amecs', link: 'https://modrinth.com/mod/amecs' },
      { name: 'Animatica', link: 'https://modrinth.com/mod/animatica' },
      { name: 'AntiGhost', link: 'https://modrinth.com/mod/antighost' },
      { name: 'AppleSkin', link: 'https://modrinth.com/mod/appleskin' },
      { name: 'Architectury API', link: 'https://modrinth.com/mod/architectury-api/version/10.0.16+minecraftforge' },
      { name: 'ASH - Another Simple HUD', link: 'https://modrinth.com/mod/ash' },
      { name: 'ASH 2 - Another Sophisticated HUD', link: 'https://modrinth.com/mod/ash-2-another-sophisticated-hud' },
      { name: 'Auth Me', link: 'https://modrinth.com/mod/auth-me' },
      { name: 'AutoRun', link: 'https://modrinth.com/mod/autorun' },
      { name: 'Auto HUD', link: 'https://modrinth.com/mod/autohud' },
      { name: 'BedrockWaters', link: 'https://modrinth.com/mod/bedrockwaters' },
      { name: "BerdinskiyBear's Armor HUD", link: 'https://www.curseforge.com/minecraft/mc-mods/berdinskiybears-armor-hud' },
      { name: 'Better Animations Collection', link: 'https://modrinth.com/mod/better-animations-collection' },
      { name: 'Better Biome Blend', link: 'https://modrinth.com/mod/better-biome-blend' },
      { name: 'Better Clouds', link: 'https://modrinth.com/mod/better-clouds' },
      { name: 'Better Fps - Render Distance[Fabric]', link: 'https://www.curseforge.com/minecraft/mc-mods/better-fps-render-distance-fabric' },
      { name: 'Better Fps - Render Distance[Forge]', link: 'https://www.curseforge.com/minecraft/mc-mods/better-fps-render-distance' },
      { name: 'Better Mount HUD', link: 'https://modrinth.com/mod/better-mount-hud' },
      { name: 'Better Ping Display - Fabric Edition', link: 'https://modrinth.com/mod/better-ping-display-fabric' },
      { name: 'Better Ping Display - Forge Edition', link: 'https://modrinth.com/mod/better-ping-display' },
      { name: 'Better Sodium Video Settings Button', link: 'https://modrinth.com/mod/better-sodium-video-settings-button' },
      { name: 'Better Sprinting', link: 'https://modrinth.com/mod/better-sprinting' },
      { name: 'Better Statistics Screen', link: 'https://modrinth.com/mod/better-stats' },
      { name: 'BetterF3', link: 'https://modrinth.com/mod/betterf3' },
      { name: 'BetterHurtCam', link: 'https://modrinth.com/mod/betterhurtcam' },
      { name: 'Block Meter', link: 'https://modrinth.com/mod/blockmeter' },
      { name: 'Blocky Bubbles', link: 'https://modrinth.com/mod/blocky-bubbles' },
      { name: 'Blur (Fabric)', link: 'https://modrinth.com/mod/blur-fabric' },
      { name: 'Bobby', link: 'https://modrinth.com/mod/bobby' },
      { name: 'Boosted Brightness', link: 'https://modrinth.com/mod/boosted-brightness' },
      { name: 'Borderless Mining', link: 'https://modrinth.com/mod/borderless-mining' },
      { name: 'Borderless Window', link: 'https://www.curseforge.com/minecraft/mc-mods/borderless' },
      { name: 'Canvas Renderer', link: 'https://modrinth.com/mod/canvas' },
      { name: 'Capes', link: 'https://modrinth.com/mod/capes' },
      { name: 'Centered Crosshair', link: 'https://modrinth.com/mod/centered-crosshair' },
      { name: 'Chat Heads', link: 'https://modrinth.com/mod/chat-heads' },
      { name: 'Chat Notify', link: 'https://modrinth.com/mod/chat-notify' },
      { name: 'Chat Sounds', link: 'https://modrinth.com/mod/chatsounds' },
      { name: 'ChatHighlighter', link: 'https://modrinth.com/mod/chathighlighter' },
      { name: 'ChunkBorders', link: 'https://www.curseforge.com/minecraft/mc-mods/chunkborders' },
      { name: 'CIT Resewn', link: 'https://modrinth.com/mod/cit-resewn' },
      { name: 'Clean F3', link: 'https://modrinth.com/mod/clean-f3' },
      { name: 'Clear Hitboxes', link: 'https://modrinth.com/mod/clearhitboxes' },
      { name: 'Clear Skies', link: 'https://modrinth.com/mod/clear-skies' },
      { name: 'Cloaks+', link: 'https://cloaksplus.com/' },
      { name: 'Cloth Config API', link: 'https://modrinth.com/mod/cloth-config' },
      { name: 'Collective', link: 'https://modrinth.com/mod/collective' },
      { name: 'Color Me Outlines', link: 'https://modrinth.com/mod/color-me-outlines' },
      { name: 'CompleteConfig', link: 'https://modrinth.com/mod/completeconfig' },
      { name: 'Continuity', link: 'https://modrinth.com/mod/continuity' },
      { name: 'Controlify', link: 'https://modrinth.com/mod/controlify' },
      { name: 'CoordinateBar', link: 'https://modrinth.com/mod/coordinate-bar' },
      { name: 'Coordinates Display', link: 'https://modrinth.com/mod/coordinates-display' },
      { name: 'Craftify', link: 'https://modrinth.com/mod/craftify' },
      { name: 'CraftPresence', link: 'https://modrinth.com/mod/craftpresence' },
      { name: 'CreativeCore', link: 'https://modrinth.com/mod/creativecore' },
      { name: 'Cull Leaves', link: 'https://modrinth.com/mod/cull-leaves' },
      { name: 'Cull Less Leaves', link: 'https://modrinth.com/mod/cull-less-leaves' },
      { name: 'Cupboard', link: 'https://www.curseforge.com/minecraft/mc-mods/cupboard' },
      { name: 'Custom Splash Screen', link: 'https://modrinth.com/mod/custom-splash-screen' },
      { name: 'CustomHud', link: 'https://modrinth.com/mod/customhud' },
      { name: 'Dark Loading Screen', link: 'https://modrinth.com/mod/dark-loading-screen' },
      { name: 'Debugify', link: 'https://modrinth.com/mod/debugify' },
      { name: 'Distant Horizons', link: 'https://modrinth.com/mod/distanthorizons' },
      { name: "Don't Clear Chat History", link: 'https://modrinth.com/mod/dcch' },
      { name: 'Durability Notifier', link: 'https://modrinth.com/mod/durability-notifier' },
      { name: 'Durability Viewer', link: 'https://modrinth.com/mod/durabilityviewer' },
      { name: 'Durability101', link: 'https://modrinth.com/mod/durability101' },
      { name: 'Dynamic FPS', link: 'https://modrinth.com/mod/dynamic-fps' },
      { name: 'Eating Animation', link: 'https://modrinth.com/mod/eating-animation' },
      { name: 'Effective', link: 'https://modrinth.com/mod/effective' },
      { name: 'Emoji Type', link: 'https://modrinth.com/mod/emoji-type' },
      { name: 'Enchantment Descriptions', link: 'https://modrinth.com/mod/enchantment-descriptions' },
      { name: 'Enhanced Attack Indicator', link: 'https://modrinth.com/mod/enhanced-attack-indicator' },
      { name: 'Enhanced Block Entities', link: 'https://modrinth.com/mod/ebe' },
      { name: 'Entity Culling', link: 'https://modrinth.com/mod/entityculling' },
      { name: 'Equipment Compare', link: 'https://modrinth.com/mod/equipment-compare' },
      { name: 'Essential Mod', link: 'https://essential.gg/download' },
      { name: 'Exordium', link: 'https://modrinth.com/mod/exordium' },
      { name: 'ExtraPlayerRenderer (Paper Doll)', link: 'https://modrinth.com/mod/extraplayerrenderer' },
      { name: 'Fabric API', link: 'https://modrinth.com/mod/fabric-api' },
      { name: 'Fabric Language Kotlin', link: 'https://modrinth.com/mod/fabric-language-kotlin' },
      { name: 'FabricSkyboxes', link: 'https://modrinth.com/mod/fabricskyboxes' },
      { name: 'FabricSkyBoxes Interop', link: 'https://modrinth.com/mod/fabricskyboxes-interop' },
      { name: 'Fabrishot', link: 'https://modrinth.com/mod/fabrishot' },
      { name: 'Fadeless', link: 'https://modrinth.com/mod/fadeless' },
      { name: 'Falling Leaves (Fabric)', link: 'https://modrinth.com/mod/fallingleaves' },
      { name: 'Falling Leaves (Forge)', link: 'https://modrinth.com/mod/fallingleavesforge' },
      { name: 'FancyMenu', link: 'https://modrinth.com/mod/fancymenu' },
      { name: 'Farsight (Fabric)', link: 'https://www.curseforge.com/minecraft/mc-mods/farsight-fabric' },
      { name: 'Farsight (Forge)', link: 'https://www.curseforge.com/minecraft/mc-mods/farsight' },
      { name: 'FastOpenLinksAndFolders', link: 'https://modrinth.com/mod/fastopenlinksandfolders' },
      { name: 'FastQuit', link: 'https://modrinth.com/mod/fastquit' },
      { name: 'FerriteCore', link: 'https://modrinth.com/mod/ferrite-core' },
      { name: 'Fishing Ruler', link: 'https://modrinth.com/mod/fishing-ruler' },
      { name: 'FlightHUD', link: 'https://www.curseforge.com/minecraft/mc-mods/flighthud' },
      { name: 'Forge Config API Port', link: 'https://modrinth.com/mod/forge-config-api-port' },
      { name: 'Forge Config Screens', link: 'https://modrinth.com/mod/forge-config-screens' },
      { name: 'FPS - Display', link: 'https://modrinth.com/mod/fpsdisplay' },
      { name: 'FPS Reducer', link: 'https://modrinth.com/mod/fps-reducer' },
      { name: 'Full Brightness Toggle', link: 'https://modrinth.com/mod/full-brightness-toggle' },
      { name: 'Gamma Utils (Fullbright)', link: 'https://modrinth.com/mod/gamma-utils' },
      { name: 'Grid', link: 'https://modrinth.com/mod/grid' },
      { name: 'GUI Scale[Forge/Fabric]', link: 'https://www.curseforge.com/minecraft/mc-mods/guiscale' },
      { name: 'Held Item Info', link: 'https://modrinth.com/mod/held-item-info' },
      { name: 'Hold That Chunk', link: 'https://modrinth.com/mod/hold-that-chunk' },
      { name: 'Iceberg', link: 'https://modrinth.com/mod/iceberg' },
      { name: 'ImmediatelyFast', link: 'https://modrinth.com/mod/immediatelyfast' },
      { name: 'ImmersiveThunder', link: 'https://modrinth.com/mod/immersivethunder' },
      { name: 'In-Game Account Switcher', link: 'https://modrinth.com/mod/in-game-account-switcher' },
      { name: 'Indium', link: 'https://modrinth.com/mod/indium' },
      { name: 'Ingame Real Time Clock', link: 'https://modrinth.com/mod/ingame-real-time-clock' },
      { name: 'Inspecio', link: 'https://modrinth.com/mod/inspecio' },
      { name: 'Inventory Spam', link: 'https://www.curseforge.com/minecraft/mc-mods/inventory-spam' },
      { name: 'Iris Shaders', link: 'https://modrinth.com/mod/iris' },
      { name: 'Item Model Fix', link: 'https://modrinth.com/mod/item-model-fix' },
      { name: 'ItemPhysic Lite', link: 'https://modrinth.com/mod/itemphysic-lite' },
      { name: 'ItemScroller', link: 'https://github.com/hd926/itemscroller/releases' },
      { name: 'Just Enough Items', link: 'https://modrinth.com/mod/jei' },
      { name: 'kennytvs-epic-force-close-loading-screen-mod-for-fabric', link: 'https://modrinth.com/mod/forcecloseworldloadingscreen' },
      { name: 'Konkrete', link: 'https://modrinth.com/mod/konkrete' },
      { name: 'Kotlin for Forge', link: 'https://modrinth.com/mod/kotlin-for-forge' },
      { name: 'Krypton', link: 'https://modrinth.com/mod/krypton' },
      { name: 'LambdaBetterGrass', link: 'https://modrinth.com/mod/lambdabettergrass' },
      { name: 'LambDynamicLights', link: 'https://modrinth.com/mod/lambdynamiclights' },
      { name: 'Language Reload', link: 'https://modrinth.com/mod/language-reload' },
      { name: 'LazyDFU', link: 'https://modrinth.com/mod/lazydfu' },
      { name: 'Legendary Tooltips', link: 'https://modrinth.com/mod/legendary-tooltips' },
      { name: 'Light Overlay', link: 'https://modrinth.com/mod/light-overlay' },
      { name: 'Litematica (No EasyPlace)', link: 'https://www.curseforge.com/minecraft/mc-mods/litematica' },
      { name: 'Lithium', link: 'https://modrinth.com/mod/lithium' },
      { name: 'Load My Resources', link: 'https://modrinth.com/mod/load-my-resources' },
      { name: 'Logical Zoom', link: 'https://modrinth.com/mod/logical-zoom' },
      { name: 'Low Fire', link: 'https://modrinth.com/mod/low-fire' },
      { name: 'Main Menu Credits', link: 'https://modrinth.com/mod/main-menu-credits' },
      { name: 'MaLiLib', link: 'https://www.curseforge.com/minecraft/mc-mods/malilib' },
      { name: 'Map In Slot', link: 'https://modrinth.com/mod/map-in-slot' },
      { name: 'Map Tooltip', link: 'https://modrinth.com/mod/map-tooltip' },
      { name: 'Memory Leak Fix', link: 'https://modrinth.com/mod/memoryleakfix' },
      { name: 'MidnightLib', link: 'https://modrinth.com/mod/midnightlib' },
      { name: 'Mindful Darkness', link: 'https://modrinth.com/mod/mindful-darkness' },
      { name: 'minecraft-ghost-totem', link: 'https://github.com/JanCantCode/minecraft-ghost-totem' },
      { name: 'minecraft-world-downloader', link: 'https://github.com/mircokroon/minecraft-world-downloader' },
      { name: 'MiniHUD', link: 'https://www.curseforge.com/minecraft/mc-mods/minihud' },
      { name: 'Mixin Conflict Helper', link: 'https://modrinth.com/mod/mixin-conflict-helper' },
      { name: 'MixinTrace', link: 'https://modrinth.com/mod/mixintrace/version/1.1.1+1.17' },
      { name: 'Mod Menu', link: 'https://modrinth.com/mod/modmenu' },
      { name: 'Model Gap Fix', link: 'https://modrinth.com/mod/modelfix' },
      { name: 'More Block Predicates', link: 'https://modrinth.com/mod/mbp' },
      { name: 'More Chat History', link: 'https://modrinth.com/mod/morechathistory' },
      { name: 'More Culling', link: 'https://modrinth.com/mod/moreculling' },
      { name: 'More Culling Extra', link: 'https://modrinth.com/mod/morecullingextra' },
      { name: 'MoreMcmeta', link: 'https://modrinth.com/mod/moremcmeta' },
      { name: 'Motion Blur', link: 'https://modrinth.com/mod/motionblur' },
      { name: 'NarrusYeetus', link: 'https://modrinth.com/mod/narrus-yeetus' },
      { name: 'Nether Coords', link: 'https://modrinth.com/mod/nether-coords' },
      { name: 'No Fade', link: 'https://modrinth.com/mod/no-fade' },
      { name: 'No More Useless Keys', link: 'https://modrinth.com/mod/nmuk' },
      { name: 'No Screen Bobbing', link: 'https://modrinth.com/mod/viewbobbingmod' },
      { name: 'No Telemetry', link: 'https://modrinth.com/mod/no-telemetry' },
      { name: 'Not Enough Animations', link: 'https://modrinth.com/mod/not-enough-animations' },
      { name: 'Not Enough Crashes', link: 'https://modrinth.com/mod/notenoughcrashes' },
      { name: 'NotifMod', link: 'https://modrinth.com/mod/notifmod' },
      { name: 'Noxesium', link: 'https://modrinth.com/mod/noxesium' },
      { name: 'Nvidium', link: 'https://modrinth.com/mod/nvidium' },
      { name: 'Ok Zoomer', link: 'https://modrinth.com/mod/ok-zoomer' },
      { name: 'OptiFabric', link: 'https://www.curseforge.com/minecraft/mc-mods/optifabric' },
      { name: 'OptiFine', link: 'https://optifine.net/downloads' },
      { name: 'OptiGUI', link: 'https://modrinth.com/mod/optigui' },
      { name: 'Particle Rain', link: 'https://modrinth.com/mod/particle-rain' },
      { name: "Phase's Discord Rich Presence", link: 'https://modrinth.com/mod/phases-discord-rich-presence' },
      { name: 'Phosphor', link: 'https://modrinth.com/mod/phosphor' },
      { name: 'Physics Mod', link: 'https://modrinth.com/mod/physicsmod' },
      { name: 'Pick Up Notifier', link: 'https://modrinth.com/mod/pick-up-notifier' },
      { name: 'Placement Preview', link: 'https://modrinth.com/mod/placement-preview' },
      { name: 'Potions Re-Glint', link: 'https://modrinth.com/mod/potions-re-glint' },
      { name: 'Presence Footsteps', link: 'https://modrinth.com/mod/presence-footsteps' },
      { name: 'Prism', link: 'https://modrinth.com/mod/prism-lib' },
      { name: 'Puzzle', link: 'https://modrinth.com/mod/puzzle' },
      { name: 'Puzzles Lib', link: 'https://modrinth.com/mod/puzzles-lib/version/v8.0.15-1.20.1-Fabric' },
      { name: 'Quiet-Fishing', link: 'https://github.com/Craft1x/Quiet-Fishing' },
      { name: 'Quilted Fabric API / Quilt Standard Libraries', link: 'https://modrinth.com/mod/qsl' },
      { name: 'Raised Clouds', link: 'https://www.curseforge.com/minecraft/mc-mods/raised-clouds' },
      { name: 'Rebind Narrator', link: 'https://modrinth.com/mod/rebind-narrator' },
      { name: "Reese's Sodium Options", link: 'https://modrinth.com/mod/reeses-sodium-options' },
      { name: 'Remove Reloading Screen', link: 'https://modrinth.com/mod/rrls' },
      { name: 'Replay Mod', link: 'https://www.replaymod.com/' },
      { name: 'Roughly Enough Items (REI)', link: 'https://modrinth.com/mod/rei/version/13.0.678+fabric' },
      { name: 'Satin API', link: 'https://modrinth.com/mod/satin-api' },
      { name: 'Sciophobia', link: 'https://modrinth.com/mod/sciophobia' },
      { name: 'Screenshot to Clipboard', link: 'https://modrinth.com/mod/screenshot-to-clipboard' },
      { name: 'Screenshot Viewer', link: 'https://modrinth.com/mod/screenshot-viewer' },
      { name: 'Seamless', link: 'https://modrinth.com/mod/seamless' },
      { name: 'Searchables', link: 'https://modrinth.com/mod/searchables' },
      { name: 'Server Pinger Fixer', link: 'https://modrinth.com/mod/serverpingerfixer/version/1.0.2' },
      { name: 'Shulker Box Tooltip', link: 'https://modrinth.com/mod/shulkerboxtooltip' },
      { name: 'Shulker Tooltip', link: 'https://modrinth.com/mod/shulker-tooltip' },
      { name: 'Simple Armor Hud', link: 'https://www.curseforge.com/minecraft/mc-mods/simple-armor-hud' },
      { name: 'Simple Voice Chat', link: 'https://modrinth.com/plugin/simple-voice-chat' },
      { name: 'SimpleAutoClicker (2s cooldown)', link: 'https://github.com/Beatso/SimpleAutoClicker' },
      { name: 'Simple Shulker Preview', link: 'https://modrinth.com/mod/simple-shulker-preview' },
      { name: 'SimplyStatus', link: 'https://modrinth.com/mod/simplystatus' },
      { name: 'Smooth Boot (Fabric)', link: 'https://modrinth.com/mod/smoothboot-fabric' },
      { name: 'Smooth Scroll', link: 'https://modrinth.com/mod/smooth-scroll' },
      { name: 'Smooth Scrolling Refurbished', link: 'https://modrinth.com/mod/smooth-scrolling-refurbished' },
      { name: 'Smooth Swapping', link: 'https://modrinth.com/mod/smooth-swapping' },
      { name: 'SmoothMenu Refabricated', link: 'https://modrinth.com/mod/smoothmenu-refabricated' },
      { name: 'SneakFix', link: 'https://modrinth.com/mod/sneakfix' },
      { name: 'Sodium', link: 'https://modrinth.com/mod/sodium' },
      { name: 'Sodium Extra', link: 'https://modrinth.com/mod/sodium-extra' },
      { name: 'Sodium Shadowy Path Blocks', link: 'https://modrinth.com/mod/sodium-shadowy-path-blocks' },
      { name: 'Sound Physics Remastered', link: 'https://modrinth.com/mod/sound-physics-remastered' },
      { name: 'Spell Checker', link: 'https://modrinth.com/mod/spell-checker' },
      { name: 'Squeedometer', link: 'https://modrinth.com/mod/squeedometer' },
      { name: 'Starlight (Fabric)', link: 'https://modrinth.com/mod/starlight' },
      { name: 'Starlight (Forge)', link: 'https://modrinth.com/mod/starlight-forge' },
      { name: 'Start the Music!', link: 'https://modrinth.com/mod/start-the-music' },
      { name: 'Status Effect Timer', link: 'https://modrinth.com/mod/statuseffecttimer' },
      { name: 'Stendhal', link: 'https://modrinth.com/mod/stendhal' },
      { name: 'TCDCommons API', link: 'https://modrinth.com/mod/tcdcommons' },
      { name: 'Time Changer', link: 'https://modrinth.com/mod/time-changer' },
      { name: 'Too Many Players', link: 'https://modrinth.com/mod/tmp' },
      { name: 'ToolTipFix', link: 'https://modrinth.com/mod/tooltipfix' },
      { name: 'Touch Grass Reminder', link: 'https://modrinth.com/mod/touch-grass-reminder' },
      { name: 'ukulib', link: 'https://modrinth.com/mod/ukulib/version/1.0.0+1.20.2' },
      { name: 'Vertical Hotbar', link: 'https://www.curseforge.com/minecraft/mc-mods/vertical-hotbar' },
      { name: 'Very Many Players (Fabric)', link: 'https://modrinth.com/mod/vmp-fabric' },
      { name: 'Very Many Players (Forge)', link: 'https://modrinth.com/mod/vmp-forge' },
      { name: 'Viewmodel Changer', link: 'https://www.curseforge.com/minecraft/mc-mods/viewmodel-changer' },
      { name: 'Visuality', link: 'https://modrinth.com/mod/visuality' },
      { name: 'VulkanMod', link: 'https://modrinth.com/mod/vulkanmod' },
      { name: 'Wavey Capes', link: 'https://modrinth.com/mod/wavey-capes' },
      { name: 'WhyMap', link: 'https://modrinth.com/mod/whymap' },
      { name: 'WorldTools', link: 'https://modrinth.com/mod/worldtools' },
      { name: "Xaero's Minimap (Fair-play Edition)", link: 'https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap-fair-play-edition' },
      { name: 'YetAnotherConfigLib', link: 'https://modrinth.com/mod/yacl' },
      { name: 'Your Options Shall Be Respected', link: 'https://modrinth.com/mod/yosbr' },
      { name: 'Zoomglass', link: 'https://modrinth.com/mod/zoomglass' },
      { name: 'Zoomify', link: 'https://modrinth.com/mod/zoomify' },
      { name: 'Zume', link: 'https://modrinth.com/mod/zume' },
      ];

  const sortedMods = allowedMods.sort((a, b) => a.name.localeCompare(b.name));

  const sectionHeaders = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ];

  return (
    <div style={{ padding: '5rem' }}>
      <h2>Rules</h2>
      <RulesContainer>
        {rules.map((rule) => (
          <RuleItem key={rule.number} className="border doodle-border-2">
            <RuleNumber>{rule.number}</RuleNumber>
            <RuleTitle>{rule.title}</RuleTitle>
            <RuleDescription>{rule.description}</RuleDescription>
          </RuleItem>
        ))}
      </RulesContainer>

      <h2>Allowed Mods</h2>

        {sectionHeaders.map((header) => {
          const modsInSection = sortedMods.filter(
            (mod) => mod.name.charAt(0).toUpperCase() === header
          );

          if (modsInSection.length === 0) {
            return null;
          }

          return (
          <ModContainer className="border doodle-border-2">
            <div key={header}>
              <SectionHeader>{header}</SectionHeader>
              <ModList>
                {modsInSection.map((mod, index) => (
                  <ModItem key={index}>
                    <ModLink href={mod.link} target="_blank" rel="noopener noreferrer">
                      {mod.name}
                    </ModLink>
                  </ModItem>
                ))}
              </ModList>
            </div>
            </ModContainer>
          );
        })}

    </div>
  );
}

export default RulesPage;