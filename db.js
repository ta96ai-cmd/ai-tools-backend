const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'data');
const USERS_FILE   = path.join(DB_PATH, 'users.json');
const TOOLS_FILE   = path.join(DB_PATH, 'tools.json');
const FAVS_FILE    = path.join(DB_PATH, 'favourites.json');
const SUBMIT_FILE  = path.join(DB_PATH, 'submissions.json');

function ensureDir() {
  if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH, { recursive: true });
}
function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return []; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1;
}

// ── ALL 753 TOOLS SEED ──
const SEED_TOOLS = [
  {
    "id": 1,
    "name": "ChatGPT",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://chat.openai.com",
    "free": true,
    "description": "ChatGPT — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 2,
    "name": "Claude",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://claude.ai",
    "free": true,
    "description": "Claude — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 3,
    "name": "DeepSeek",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://chat.deepseek.com",
    "free": true,
    "description": "DeepSeek — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 4,
    "name": "Gemini",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://gemini.google.com",
    "free": true,
    "description": "Gemini — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 5,
    "name": "Grok",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://grok.x.ai",
    "free": true,
    "description": "Grok — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 6,
    "name": "Meta AI",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://meta.ai",
    "free": true,
    "description": "Meta AI — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 7,
    "name": "MS Copilot",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://copilot.microsoft.com",
    "free": true,
    "description": "MS Copilot — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 8,
    "name": "Perplexity",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://perplexity.ai",
    "free": true,
    "description": "Perplexity — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 9,
    "name": "Le Chat (Mistral)",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://chat.mistral.ai",
    "free": true,
    "description": "Le Chat (Mistral) — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 10,
    "name": "Qwen",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://qwenlm.github.io",
    "free": true,
    "description": "Qwen — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 11,
    "name": "HuggingChat",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://huggingface.co/chat",
    "free": true,
    "description": "HuggingChat — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 12,
    "name": "Pi by Inflection",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://pi.ai",
    "free": true,
    "description": "Pi by Inflection — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 13,
    "name": "Poe",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://poe.com",
    "free": true,
    "description": "Poe — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 14,
    "name": "You.com",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://you.com",
    "free": true,
    "description": "You.com — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 15,
    "name": "Kimi",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://kimi.moonshot.cn",
    "free": true,
    "description": "Kimi — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 16,
    "name": "Cohere Coral",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://coral.cohere.com",
    "free": true,
    "description": "Cohere Coral — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 17,
    "name": "OpenRouter",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://openrouter.ai",
    "free": true,
    "description": "OpenRouter — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 18,
    "name": "Together AI",
    "category": "AI Chatbots",
    "icon": "💬",
    "url": "https://together.ai",
    "free": true,
    "description": "Together AI — AI Chatbots tool",
    "tags": [
      "chatbots"
    ],
    "approved": true
  },
  {
    "id": 19,
    "name": "Askcodi",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://www.google.com/search?q=Askcodi%20AI%20tool",
    "free": true,
    "description": "Askcodi — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 20,
    "name": "Codiga",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://www.google.com/search?q=Codiga%20AI%20tool",
    "free": true,
    "description": "Codiga — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 21,
    "name": "Cursor",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://cursor.sh",
    "free": true,
    "description": "Cursor — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 22,
    "name": "GitHub Copilot",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://github.com/features/copilot",
    "free": true,
    "description": "GitHub Copilot — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 23,
    "name": "Qodo",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://www.google.com/search?q=Qodo%20AI%20tool",
    "free": true,
    "description": "Qodo — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 24,
    "name": "Replit",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://replit.com",
    "free": true,
    "description": "Replit — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 25,
    "name": "Tabnine",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://tabnine.com",
    "free": true,
    "description": "Tabnine — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 26,
    "name": "Codeium",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://codeium.com",
    "free": true,
    "description": "Codeium — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 27,
    "name": "Supermaven",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://supermaven.com",
    "free": true,
    "description": "Supermaven — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 28,
    "name": "Amazon CodeWhisperer",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://aws.amazon.com/codewhisperer",
    "free": true,
    "description": "Amazon CodeWhisperer — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 29,
    "name": "Sourcegraph Cody",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://sourcegraph.com/cody",
    "free": true,
    "description": "Sourcegraph Cody — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 30,
    "name": "Pieces for Devs",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://pieces.app",
    "free": true,
    "description": "Pieces for Devs — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 31,
    "name": "Claude Code",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://claude.ai/code",
    "free": true,
    "description": "Claude Code — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 32,
    "name": "Gemini Code Assist",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://cloud.google.com/gemini/docs/codeassist",
    "free": true,
    "description": "Gemini Code Assist — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 33,
    "name": "Continue.dev",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://continue.dev",
    "free": true,
    "description": "Continue.dev — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 34,
    "name": "Aider",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://aider.chat",
    "free": true,
    "description": "Aider — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 35,
    "name": "Bolt.new",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://bolt.new",
    "free": true,
    "description": "Bolt.new — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 36,
    "name": "v0 by Vercel",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://v0.dev",
    "free": true,
    "description": "v0 by Vercel — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 37,
    "name": "Lovable",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://lovable.dev",
    "free": true,
    "description": "Lovable — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 38,
    "name": "Windsurf",
    "category": "AI Coding Assistance",
    "icon": "👨‍💻",
    "url": "https://codeium.com/windsurf",
    "free": true,
    "description": "Windsurf — AI Coding Assistance tool",
    "tags": [
      "coding"
    ],
    "approved": true
  },
  {
    "id": 39,
    "name": "Adobe Firefly",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://firefly.adobe.com",
    "free": true,
    "description": "Adobe Firefly — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 40,
    "name": "DALL-E",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://openai.com/dall-e-3",
    "free": true,
    "description": "DALL-E — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 41,
    "name": "FLUX.1",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://blackforestlabs.ai",
    "free": true,
    "description": "FLUX.1 — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 42,
    "name": "Ideogram",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://ideogram.ai",
    "free": true,
    "description": "Ideogram — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 43,
    "name": "Midjourney",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://midjourney.com",
    "free": true,
    "description": "Midjourney — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 44,
    "name": "Recraft",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://recraft.ai",
    "free": true,
    "description": "Recraft — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 45,
    "name": "Stable Diffusion",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://stability.ai",
    "free": true,
    "description": "Stable Diffusion — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 46,
    "name": "Leonardo AI",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://leonardo.ai",
    "free": true,
    "description": "Leonardo AI — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 47,
    "name": "Bing Image Creator",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://www.bing.com/images/create",
    "free": true,
    "description": "Bing Image Creator — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 48,
    "name": "Playground AI",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://playground.ai",
    "free": true,
    "description": "Playground AI — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 49,
    "name": "Nightcafe",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://nightcafe.studio",
    "free": true,
    "description": "Nightcafe — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 50,
    "name": "Lexica",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://lexica.art",
    "free": true,
    "description": "Lexica — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 51,
    "name": "Krea AI",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://krea.ai",
    "free": true,
    "description": "Krea AI — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 52,
    "name": "Magnific",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://magnific.ai",
    "free": true,
    "description": "Magnific — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 53,
    "name": "Freepik AI",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://freepik.com/ai",
    "free": true,
    "description": "Freepik AI — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 54,
    "name": "Artbreeder",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://artbreeder.com",
    "free": true,
    "description": "Artbreeder — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 55,
    "name": "Craiyon",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://craiyon.com",
    "free": true,
    "description": "Craiyon — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 56,
    "name": "SeaArt",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://seaart.ai",
    "free": true,
    "description": "SeaArt — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 57,
    "name": "Tensor.art",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://tensor.art",
    "free": true,
    "description": "Tensor.art — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 58,
    "name": "Getimg.ai",
    "category": "AI Image Generation",
    "icon": "🎨",
    "url": "https://getimg.ai",
    "free": true,
    "description": "Getimg.ai — AI Image Generation tool",
    "tags": [
      "image"
    ],
    "approved": true
  },
  {
    "id": 59,
    "name": "Viralsky",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://www.google.com/search?q=Viralsky%20AI%20tool",
    "free": true,
    "description": "Viralsky — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 60,
    "name": "Vibefluencer",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://www.google.com/search?q=Vibefluencer%20AI%20tool",
    "free": true,
    "description": "Vibefluencer — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 61,
    "name": "FreedomThreads",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://www.google.com/search?q=FreedomThreads%20AI%20tool",
    "free": true,
    "description": "FreedomThreads — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 62,
    "name": "JotBot",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://myjotbot.com",
    "free": true,
    "description": "JotBot — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 63,
    "name": "Quarkle",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://www.google.com/search?q=Quarkle%20AI%20tool",
    "free": true,
    "description": "Quarkle — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 64,
    "name": "Quillbot",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://quillbot.com",
    "free": true,
    "description": "Quillbot — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 65,
    "name": "Rytr",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://rytr.me",
    "free": true,
    "description": "Rytr — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 66,
    "name": "Sudowrite",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://sudowrite.com",
    "free": true,
    "description": "Sudowrite — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 67,
    "name": "Writesonic",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://writesonic.com",
    "free": true,
    "description": "Writesonic — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 68,
    "name": "Copy.ai",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://copy.ai",
    "free": true,
    "description": "Copy.ai — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 69,
    "name": "Jasper",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://jasper.ai",
    "free": true,
    "description": "Jasper — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 70,
    "name": "Notion AI",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://notion.so/ai",
    "free": true,
    "description": "Notion AI — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 71,
    "name": "Grammarly",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://grammarly.com",
    "free": true,
    "description": "Grammarly — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 72,
    "name": "ProWritingAid",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://prowritingaid.com",
    "free": true,
    "description": "ProWritingAid — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 73,
    "name": "Wordtune",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://wordtune.com",
    "free": true,
    "description": "Wordtune — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 74,
    "name": "Anyword",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://anyword.com",
    "free": true,
    "description": "Anyword — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 75,
    "name": "Shortly AI",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://shortlyai.com",
    "free": true,
    "description": "Shortly AI — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 76,
    "name": "Hypotenuse AI",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://hypotenuse.ai",
    "free": true,
    "description": "Hypotenuse AI — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 77,
    "name": "Longshot AI",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://longshot.ai",
    "free": true,
    "description": "Longshot AI — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 78,
    "name": "Lex",
    "category": "AI Writing Generation",
    "icon": "✍️",
    "url": "https://lex.page",
    "free": true,
    "description": "Lex — AI Writing Generation tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 79,
    "name": "Beautiful.AI",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://beautiful.ai",
    "free": true,
    "description": "Beautiful.AI — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 80,
    "name": "Gamma",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://gamma.app",
    "free": true,
    "description": "Gamma — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 81,
    "name": "Pitch",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://pitch.com",
    "free": true,
    "description": "Pitch — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 82,
    "name": "Plus",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://www.google.com/search?q=Plus%20AI%20tool",
    "free": true,
    "description": "Plus — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 83,
    "name": "PopAI",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://www.google.com/search?q=PopAI%20AI%20tool",
    "free": true,
    "description": "PopAI — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 84,
    "name": "Presentation.Ai",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://www.google.com/search?q=Presentation.Ai%20AI%20tool",
    "free": true,
    "description": "Presentation.Ai — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 85,
    "name": "Slidesgo",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://slidesgo.com",
    "free": true,
    "description": "Slidesgo — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 86,
    "name": "Tome",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://tome.app",
    "free": true,
    "description": "Tome — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 87,
    "name": "MagicSlides",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://magicslides.app",
    "free": true,
    "description": "MagicSlides — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 88,
    "name": "Decktopus",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://decktopus.com",
    "free": true,
    "description": "Decktopus — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 89,
    "name": "Simplified",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://simplified.com",
    "free": true,
    "description": "Simplified — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 90,
    "name": "SlidesAI",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://slidesai.io",
    "free": true,
    "description": "SlidesAI — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 91,
    "name": "Sendsteps",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://sendsteps.com",
    "free": true,
    "description": "Sendsteps — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 92,
    "name": "Kroma",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://www.google.com/search?q=Kroma%20AI%20tool",
    "free": true,
    "description": "Kroma — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 93,
    "name": "Presentations.AI",
    "category": "AI Presentation",
    "icon": "📊",
    "url": "https://www.google.com/search?q=Presentations.AI%20AI%20tool",
    "free": true,
    "description": "Presentations.AI — AI Presentation tool",
    "tags": [
      "presentation"
    ],
    "approved": true
  },
  {
    "id": 94,
    "name": "Clippit.Ai",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=Clippit.Ai%20AI%20tool",
    "free": true,
    "description": "Clippit.Ai — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 95,
    "name": "Friday",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=Friday%20AI%20tool",
    "free": true,
    "description": "Friday — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 96,
    "name": "Mailmaestro",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=Mailmaestro%20AI%20tool",
    "free": true,
    "description": "Mailmaestro — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 97,
    "name": "Shortwave",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://shortwave.com",
    "free": true,
    "description": "Shortwave — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 98,
    "name": "Superhuman",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://superhuman.com",
    "free": true,
    "description": "Superhuman — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 99,
    "name": "Lavender",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://lavender.ai",
    "free": true,
    "description": "Lavender — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 100,
    "name": "Smartwriter",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://smartwriter.ai",
    "free": true,
    "description": "Smartwriter — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 101,
    "name": "SalesHandy",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=SalesHandy%20AI%20tool",
    "free": true,
    "description": "SalesHandy — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 102,
    "name": "Instantly",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://instantly.ai",
    "free": true,
    "description": "Instantly — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 103,
    "name": "Warmbox",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=Warmbox%20AI%20tool",
    "free": true,
    "description": "Warmbox — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 104,
    "name": "Sanebox",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://www.google.com/search?q=Sanebox%20AI%20tool",
    "free": true,
    "description": "Sanebox — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 105,
    "name": "Ellie",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://tryellie.com",
    "free": true,
    "description": "Ellie — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 106,
    "name": "Compose AI",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://compose.ai",
    "free": true,
    "description": "Compose AI — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 107,
    "name": "Flowrite",
    "category": "AI Email Assistance",
    "icon": "📧",
    "url": "https://flowrite.com",
    "free": true,
    "description": "Flowrite — AI Email Assistance tool",
    "tags": [
      "email"
    ],
    "approved": true
  },
  {
    "id": 108,
    "name": "Integrately",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://www.google.com/search?q=Integrately%20AI%20tool",
    "free": true,
    "description": "Integrately — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 109,
    "name": "Make",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://make.com",
    "free": true,
    "description": "Make — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 110,
    "name": "Monday.com",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://monday.com",
    "free": true,
    "description": "Monday.com — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 111,
    "name": "n8n",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://n8n.io",
    "free": true,
    "description": "n8n — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 112,
    "name": "Wrike",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://wrike.com",
    "free": true,
    "description": "Wrike — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 113,
    "name": "Zapier",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://zapier.com",
    "free": true,
    "description": "Zapier — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 114,
    "name": "Activepieces",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://activepieces.com",
    "free": true,
    "description": "Activepieces — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 115,
    "name": "Pipedream",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://pipedream.com",
    "free": true,
    "description": "Pipedream — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 116,
    "name": "Automatisch",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://www.google.com/search?q=Automatisch%20AI%20tool",
    "free": true,
    "description": "Automatisch — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 117,
    "name": "Tray.io",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://www.google.com/search?q=Tray.io%20AI%20tool",
    "free": true,
    "description": "Tray.io — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 118,
    "name": "Bardeen",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://bardeen.ai",
    "free": true,
    "description": "Bardeen — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 119,
    "name": "Relay.app",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://relay.app",
    "free": true,
    "description": "Relay.app — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 120,
    "name": "Gumloop",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://gumloop.com",
    "free": true,
    "description": "Gumloop — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 121,
    "name": "Lindy",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://lindy.ai",
    "free": true,
    "description": "Lindy — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 122,
    "name": "Relevance AI",
    "category": "AI Workflow Automation",
    "icon": "⚙️",
    "url": "https://relevanceai.com",
    "free": true,
    "description": "Relevance AI — AI Workflow Automation tool",
    "tags": [
      "workflow"
    ],
    "approved": true
  },
  {
    "id": 123,
    "name": "Skysnail",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Skysnail%20AI%20tool",
    "free": true,
    "description": "Skysnail — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 124,
    "name": "Canva",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://canva.com",
    "free": true,
    "description": "Canva — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 125,
    "name": "Design.com",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Design.com%20AI%20tool",
    "free": true,
    "description": "Design.com — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 126,
    "name": "Framer",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://framer.com",
    "free": true,
    "description": "Framer — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 127,
    "name": "Microsoft Designer",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://designer.microsoft.com",
    "free": true,
    "description": "Microsoft Designer — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 128,
    "name": "Uizard",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Uizard%20AI%20tool",
    "free": true,
    "description": "Uizard — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 129,
    "name": "Looka",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://looka.com",
    "free": true,
    "description": "Looka — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 130,
    "name": "Brandmark",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Brandmark%20AI%20tool",
    "free": true,
    "description": "Brandmark — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 131,
    "name": "Wix Logo Maker",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Wix%20Logo%20Maker%20AI%20tool",
    "free": true,
    "description": "Wix Logo Maker — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 132,
    "name": "Hatchful",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Hatchful%20AI%20tool",
    "free": true,
    "description": "Hatchful — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 133,
    "name": "Designs.ai",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://www.google.com/search?q=Designs.ai%20AI%20tool",
    "free": true,
    "description": "Designs.ai — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 134,
    "name": "Renderforest",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://renderforest.com",
    "free": true,
    "description": "Renderforest — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 135,
    "name": "Adobe Express",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://express.adobe.com",
    "free": true,
    "description": "Adobe Express — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 136,
    "name": "Picsart",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://picsart.com",
    "free": true,
    "description": "Picsart — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 137,
    "name": "Remove.bg",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://remove.bg",
    "free": true,
    "description": "Remove.bg — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 138,
    "name": "Clipdrop",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://clipdrop.co",
    "free": true,
    "description": "Clipdrop — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 139,
    "name": "Vectorizer.ai",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://vectorizer.ai",
    "free": true,
    "description": "Vectorizer.ai — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 140,
    "name": "Hotpot.ai",
    "category": "AI Graphic Design",
    "icon": "🖌️",
    "url": "https://hotpot.ai",
    "free": true,
    "description": "Hotpot.ai — AI Graphic Design tool",
    "tags": [
      "graphic"
    ],
    "approved": true
  },
  {
    "id": 141,
    "name": "ViralityAI",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://www.google.com/search?q=ViralityAI%20AI%20tool",
    "free": true,
    "description": "ViralityAI — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 142,
    "name": "Flourish",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://flourish.studio",
    "free": true,
    "description": "Flourish — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 143,
    "name": "Julius",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://www.google.com/search?q=Julius%20AI%20tool",
    "free": true,
    "description": "Julius — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 144,
    "name": "Visme",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://visme.co",
    "free": true,
    "description": "Visme — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 145,
    "name": "Zing Data",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://www.google.com/search?q=Zing%20Data%20AI%20tool",
    "free": true,
    "description": "Zing Data — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 146,
    "name": "Tableau Public",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://www.google.com/search?q=Tableau%20Public%20AI%20tool",
    "free": true,
    "description": "Tableau Public — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 147,
    "name": "RAWGraphs",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://rawgraphs.io",
    "free": true,
    "description": "RAWGraphs — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 148,
    "name": "Datawrapper",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://datawrapper.de",
    "free": true,
    "description": "Datawrapper — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 149,
    "name": "Observable",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://observablehq.com",
    "free": true,
    "description": "Observable — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 150,
    "name": "Infogram",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://infogram.com",
    "free": true,
    "description": "Infogram — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 151,
    "name": "Piktochart",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://piktochart.com",
    "free": true,
    "description": "Piktochart — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 152,
    "name": "ChartBlocks",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://www.google.com/search?q=ChartBlocks%20AI%20tool",
    "free": true,
    "description": "ChartBlocks — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 153,
    "name": "Polymer",
    "category": "AI Data Visualization",
    "icon": "📈",
    "url": "https://polymersearch.com",
    "free": true,
    "description": "Polymer — AI Data Visualization tool",
    "tags": [
      "data"
    ],
    "approved": true
  },
  {
    "id": 154,
    "name": "Bricks",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://bricks.so",
    "free": true,
    "description": "Bricks — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 155,
    "name": "Formula Bot",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://formulabot.com",
    "free": true,
    "description": "Formula Bot — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 156,
    "name": "Gigasheet",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://gigasheet.com",
    "free": true,
    "description": "Gigasheet — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 157,
    "name": "Rows AI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://www.google.com/search?q=Rows%20AI%20AI%20tool",
    "free": true,
    "description": "Rows AI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 158,
    "name": "SheetAI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://sheetai.app",
    "free": true,
    "description": "SheetAI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 159,
    "name": "Luminal",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://www.google.com/search?q=Luminal%20AI%20tool",
    "free": true,
    "description": "Luminal — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 160,
    "name": "Excel AI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://www.google.com/search?q=Excel%20AI%20AI%20tool",
    "free": true,
    "description": "Excel AI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 161,
    "name": "Google Sheets AI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://www.google.com/search?q=Google%20Sheets%20AI%20AI%20tool",
    "free": true,
    "description": "Google Sheets AI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 162,
    "name": "Grist",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://getgrist.com",
    "free": true,
    "description": "Grist — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 163,
    "name": "Airtable AI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://airtable.com",
    "free": true,
    "description": "Airtable AI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 164,
    "name": "NovaceneAI",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://www.google.com/search?q=NovaceneAI%20AI%20tool",
    "free": true,
    "description": "NovaceneAI — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 165,
    "name": "Equals",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://equals.app",
    "free": true,
    "description": "Equals — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 166,
    "name": "Causal",
    "category": "AI Spreadsheet",
    "icon": "📋",
    "url": "https://causal.app",
    "free": true,
    "description": "Causal — AI Spreadsheet tool",
    "tags": [
      "spreadsheet"
    ],
    "approved": true
  },
  {
    "id": 167,
    "name": "Calendly",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://calendly.com",
    "free": true,
    "description": "Calendly — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 168,
    "name": "Clockwise",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://getclockwise.com",
    "free": true,
    "description": "Clockwise — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 169,
    "name": "Motion",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://usemotion.com",
    "free": true,
    "description": "Motion — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 170,
    "name": "Reclaim AI",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://reclaim.ai",
    "free": true,
    "description": "Reclaim AI — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 171,
    "name": "Taskade",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://taskade.com",
    "free": true,
    "description": "Taskade — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 172,
    "name": "Trevor AI",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://trevorai.com",
    "free": true,
    "description": "Trevor AI — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 173,
    "name": "Cal.com",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://cal.com",
    "free": true,
    "description": "Cal.com — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 174,
    "name": "Fantastical AI",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://flexibits.com/fantastical",
    "free": true,
    "description": "Fantastical AI — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 175,
    "name": "Clara",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://clara.com",
    "free": true,
    "description": "Clara — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 176,
    "name": "x.ai",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://www.google.com/search?q=x.ai%20AI%20tool",
    "free": true,
    "description": "x.ai — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 177,
    "name": "Doodle",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://doodle.com",
    "free": true,
    "description": "Doodle — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 178,
    "name": "Kronologic",
    "category": "AI Scheduling",
    "icon": "🗓️",
    "url": "https://www.google.com/search?q=Kronologic%20AI%20tool",
    "free": true,
    "description": "Kronologic — AI Scheduling tool",
    "tags": [
      "scheduling"
    ],
    "approved": true
  },
  {
    "id": 179,
    "name": "Avoma",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://www.google.com/search?q=Avoma%20AI%20tool",
    "free": true,
    "description": "Avoma — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 180,
    "name": "Equal Time",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://www.google.com/search?q=Equal%20Time%20AI%20tool",
    "free": true,
    "description": "Equal Time — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 181,
    "name": "Fathom",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://fathom.video",
    "free": true,
    "description": "Fathom — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 182,
    "name": "Fellow.app",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://www.google.com/search?q=Fellow.app%20AI%20tool",
    "free": true,
    "description": "Fellow.app — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 183,
    "name": "Fireflies",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://fireflies.ai",
    "free": true,
    "description": "Fireflies — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 184,
    "name": "Krisp",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://krisp.ai",
    "free": true,
    "description": "Krisp — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 185,
    "name": "Otter",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://otter.ai",
    "free": true,
    "description": "Otter — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 186,
    "name": "Tactiq",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://tactiq.io",
    "free": true,
    "description": "Tactiq — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 187,
    "name": "Notta",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://notta.ai",
    "free": true,
    "description": "Notta — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 188,
    "name": "Airgram",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://airgram.io",
    "free": true,
    "description": "Airgram — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 189,
    "name": "Read.ai",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://read.ai",
    "free": true,
    "description": "Read.ai — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 190,
    "name": "Supernormal",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://supernormal.com",
    "free": true,
    "description": "Supernormal — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 191,
    "name": "Sembly",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://sembly.ai",
    "free": true,
    "description": "Sembly — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 192,
    "name": "Rewatch",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://rewatch.com",
    "free": true,
    "description": "Rewatch — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 193,
    "name": "Grain",
    "category": "AI Meeting Notes",
    "icon": "📝",
    "url": "https://grain.com",
    "free": true,
    "description": "Grain — AI Meeting Notes tool",
    "tags": [
      "meeting"
    ],
    "approved": true
  },
  {
    "id": 194,
    "name": "Syllaba",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://www.google.com/search?q=Syllaba%20AI%20tool",
    "free": true,
    "description": "Syllaba — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 195,
    "name": "Haiper AI",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://haiper.ai",
    "free": true,
    "description": "Haiper AI — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 196,
    "name": "Invideo AI",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://invideo.io",
    "free": true,
    "description": "Invideo AI — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 197,
    "name": "Kling",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://klingai.com",
    "free": true,
    "description": "Kling — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 198,
    "name": "Krea",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://www.google.com/search?q=Krea%20AI%20tool",
    "free": true,
    "description": "Krea — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 199,
    "name": "LTX Studio",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://www.google.com/search?q=LTX%20Studio%20AI%20tool",
    "free": true,
    "description": "LTX Studio — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 200,
    "name": "Luma AI",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://lumalabs.ai",
    "free": true,
    "description": "Luma AI — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 201,
    "name": "Pika AI",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://pika.art",
    "free": true,
    "description": "Pika AI — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 202,
    "name": "Runway",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://runwayml.com",
    "free": true,
    "description": "Runway — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 203,
    "name": "Sora",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://sora.openai.com",
    "free": true,
    "description": "Sora — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 204,
    "name": "Hailuo AI",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://hailuoai.com",
    "free": true,
    "description": "Hailuo AI — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 205,
    "name": "Wan 2.1",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://wanxiang.aliyun.com",
    "free": true,
    "description": "Wan 2.1 — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 206,
    "name": "Veo 2",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://deepmind.google/veo",
    "free": true,
    "description": "Veo 2 — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 207,
    "name": "Animate Diff",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://www.google.com/search?q=Animate%20Diff%20AI%20tool",
    "free": true,
    "description": "Animate Diff — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 208,
    "name": "Hedra",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://hedra.com",
    "free": true,
    "description": "Hedra — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 209,
    "name": "Pixverse",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://pixverse.ai",
    "free": true,
    "description": "Pixverse — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 210,
    "name": "Stable Video",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://www.google.com/search?q=Stable%20Video%20AI%20tool",
    "free": true,
    "description": "Stable Video — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 211,
    "name": "Genmo",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://genmo.ai",
    "free": true,
    "description": "Genmo — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 212,
    "name": "Morph Studio",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://morphstudio.com",
    "free": true,
    "description": "Morph Studio — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 213,
    "name": "Vidu",
    "category": "AI Video Generation",
    "icon": "🎬",
    "url": "https://vidu.io",
    "free": true,
    "description": "Vidu — AI Video Generation tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 214,
    "name": "Notion",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://notion.so",
    "free": true,
    "description": "Notion — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 215,
    "name": "Tettra",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://www.google.com/search?q=Tettra%20AI%20tool",
    "free": true,
    "description": "Tettra — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 216,
    "name": "Obsidian AI",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://obsidian.md",
    "free": true,
    "description": "Obsidian AI — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 217,
    "name": "Logseq",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://logseq.com",
    "free": true,
    "description": "Logseq — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 218,
    "name": "Roam Research",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://roamresearch.com",
    "free": true,
    "description": "Roam Research — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 219,
    "name": "Mem.ai",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://mem.ai",
    "free": true,
    "description": "Mem.ai — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 220,
    "name": "Napkin AI",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://napkin.ai",
    "free": true,
    "description": "Napkin AI — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 221,
    "name": "Capacities",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://capacities.io",
    "free": true,
    "description": "Capacities — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 222,
    "name": "NotebookLM",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://notebooklm.google.com",
    "free": true,
    "description": "NotebookLM — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 223,
    "name": "Reflect",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://reflect.app",
    "free": true,
    "description": "Reflect — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 224,
    "name": "Reor",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://www.google.com/search?q=Reor%20AI%20tool",
    "free": true,
    "description": "Reor — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 225,
    "name": "Tana",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://tana.inc",
    "free": true,
    "description": "Tana — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 226,
    "name": "Supermemory",
    "category": "AI Knowledge Management",
    "icon": "🧠",
    "url": "https://supermemory.ai",
    "free": true,
    "description": "Supermemory — AI Knowledge Management tool",
    "tags": [
      "knowledge"
    ],
    "approved": true
  },
  {
    "id": 227,
    "name": "Elicit",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://elicit.com",
    "free": true,
    "description": "Elicit — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 228,
    "name": "Consensus",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://consensus.app",
    "free": true,
    "description": "Consensus — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 229,
    "name": "Semantic Scholar",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://semanticscholar.org",
    "free": true,
    "description": "Semantic Scholar — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 230,
    "name": "Scite",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://scite.ai",
    "free": true,
    "description": "Scite — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 231,
    "name": "Explainpaper",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://explainpaper.com",
    "free": true,
    "description": "Explainpaper — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 232,
    "name": "SciSpace",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://typeset.io",
    "free": true,
    "description": "SciSpace — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 233,
    "name": "Research Rabbit",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://researchrabbitapp.com",
    "free": true,
    "description": "Research Rabbit — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 234,
    "name": "Undermind",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://undermind.ai",
    "free": true,
    "description": "Undermind — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 235,
    "name": "Humata",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://humata.ai",
    "free": true,
    "description": "Humata — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 236,
    "name": "ChatPDF",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://chatpdf.com",
    "free": true,
    "description": "ChatPDF — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 237,
    "name": "Scholarcy",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://scholarcy.com",
    "free": true,
    "description": "Scholarcy — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 238,
    "name": "Lateral",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://lateral.io",
    "free": true,
    "description": "Lateral — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 239,
    "name": "Iris.ai",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://www.google.com/search?q=Iris.ai%20AI%20tool",
    "free": true,
    "description": "Iris.ai — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 240,
    "name": "Litmaps",
    "category": "AI Research",
    "icon": "🔍",
    "url": "https://litmaps.com",
    "free": true,
    "description": "Litmaps — AI Research tool",
    "tags": [
      "research"
    ],
    "approved": true
  },
  {
    "id": 241,
    "name": "Suno",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://suno.com",
    "free": true,
    "description": "Suno — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 242,
    "name": "Udio",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://udio.com",
    "free": true,
    "description": "Udio — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 243,
    "name": "Mubert",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://mubert.com",
    "free": true,
    "description": "Mubert — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 244,
    "name": "Soundraw",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://soundraw.io",
    "free": true,
    "description": "Soundraw — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 245,
    "name": "Aiva",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://aiva.ai",
    "free": true,
    "description": "Aiva — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 246,
    "name": "Boomy",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://boomy.com",
    "free": true,
    "description": "Boomy — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 247,
    "name": "Loudly",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://loudly.com",
    "free": true,
    "description": "Loudly — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 248,
    "name": "ElevenLabs",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://elevenlabs.io",
    "free": true,
    "description": "ElevenLabs — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 249,
    "name": "Murf",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://murf.ai",
    "free": true,
    "description": "Murf — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 250,
    "name": "Lovo",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://lovo.ai",
    "free": true,
    "description": "Lovo — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 251,
    "name": "Speechify",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://speechify.com",
    "free": true,
    "description": "Speechify — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 252,
    "name": "Resemble AI",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://resemble.ai",
    "free": true,
    "description": "Resemble AI — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 253,
    "name": "Adobe Podcast",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://podcast.adobe.com",
    "free": true,
    "description": "Adobe Podcast — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 254,
    "name": "Auphonic",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://auphonic.com",
    "free": true,
    "description": "Auphonic — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 255,
    "name": "Podcastle",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://podcastle.ai",
    "free": true,
    "description": "Podcastle — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 256,
    "name": "Cleanvoice",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://cleanvoice.ai",
    "free": true,
    "description": "Cleanvoice — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 257,
    "name": "Descript",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://descript.com",
    "free": true,
    "description": "Descript — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 258,
    "name": "Riverside",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://riverside.fm",
    "free": true,
    "description": "Riverside — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 259,
    "name": "Beatoven.ai",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://beatoven.ai",
    "free": true,
    "description": "Beatoven.ai — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 260,
    "name": "Musicfy",
    "category": "AI Audio & Music",
    "icon": "🎵",
    "url": "https://musicfy.lol",
    "free": true,
    "description": "Musicfy — AI Audio & Music tool",
    "tags": [
      "audio"
    ],
    "approved": true
  },
  {
    "id": 261,
    "name": "Play.ht",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://play.ht",
    "free": true,
    "description": "Play.ht — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 262,
    "name": "WellSaid Labs",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://wellsaidlabs.com",
    "free": true,
    "description": "WellSaid Labs — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 263,
    "name": "Replica Studios",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://replicastudios.com",
    "free": true,
    "description": "Replica Studios — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 264,
    "name": "Voicemaker",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://voicemaker.in",
    "free": true,
    "description": "Voicemaker — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 265,
    "name": "NaturalReader",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://naturalreaders.com",
    "free": true,
    "description": "NaturalReader — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 266,
    "name": "Balabolka",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://www.google.com/search?q=Balabolka%20AI%20tool",
    "free": true,
    "description": "Balabolka — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 267,
    "name": "TTSMaker",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://ttsmaker.com",
    "free": true,
    "description": "TTSMaker — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 268,
    "name": "Narakeet",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://narakeet.com",
    "free": true,
    "description": "Narakeet — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 269,
    "name": "Bark",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://github.com/suno-ai/bark",
    "free": true,
    "description": "Bark — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 270,
    "name": "Coqui TTS",
    "category": "AI Voice & TTS",
    "icon": "🎙️",
    "url": "https://coqui.ai",
    "free": true,
    "description": "Coqui TTS — AI Voice & TTS tool",
    "tags": [
      "voice"
    ],
    "approved": true
  },
  {
    "id": 271,
    "name": "CapCut AI",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://capcut.com",
    "free": true,
    "description": "CapCut AI — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 272,
    "name": "Opus Clip",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://opus.pro",
    "free": true,
    "description": "Opus Clip — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 273,
    "name": "Munch",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://getmunch.com",
    "free": true,
    "description": "Munch — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 274,
    "name": "Wisecut",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://wisecut.video",
    "free": true,
    "description": "Wisecut — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 275,
    "name": "Pictory",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://pictory.ai",
    "free": true,
    "description": "Pictory — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 276,
    "name": "Lumen5",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://lumen5.com",
    "free": true,
    "description": "Lumen5 — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 277,
    "name": "Synthesia",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://synthesia.io",
    "free": true,
    "description": "Synthesia — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 278,
    "name": "HeyGen",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://heygen.com",
    "free": true,
    "description": "HeyGen — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 279,
    "name": "D-ID",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://d-id.com",
    "free": true,
    "description": "D-ID — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 280,
    "name": "Colossyan",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://colossyan.com",
    "free": true,
    "description": "Colossyan — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 281,
    "name": "Fliki",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://fliki.ai",
    "free": true,
    "description": "Fliki — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 282,
    "name": "Steve AI",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://steve.ai",
    "free": true,
    "description": "Steve AI — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 283,
    "name": "Veed.io",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://veed.io",
    "free": true,
    "description": "Veed.io — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 284,
    "name": "Captions.ai",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://captions.ai",
    "free": true,
    "description": "Captions.ai — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 285,
    "name": "Submagic",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://submagic.co",
    "free": true,
    "description": "Submagic — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 286,
    "name": "Vizard",
    "category": "AI Video Editing",
    "icon": "✂️",
    "url": "https://vizard.ai",
    "free": true,
    "description": "Vizard — AI Video Editing tool",
    "tags": [
      "video"
    ],
    "approved": true
  },
  {
    "id": 287,
    "name": "Intercom AI",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://intercom.com",
    "free": true,
    "description": "Intercom AI — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 288,
    "name": "Zendesk AI",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://zendesk.com",
    "free": true,
    "description": "Zendesk AI — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 289,
    "name": "Freshdesk AI",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://freshdesk.com",
    "free": true,
    "description": "Freshdesk AI — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 290,
    "name": "Tidio",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://tidio.com",
    "free": true,
    "description": "Tidio — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 291,
    "name": "Drift",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://drift.com",
    "free": true,
    "description": "Drift — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 292,
    "name": "Landbot",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://landbot.io",
    "free": true,
    "description": "Landbot — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 293,
    "name": "ManyChat",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://manychat.com",
    "free": true,
    "description": "ManyChat — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 294,
    "name": "Botpress",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://botpress.com",
    "free": true,
    "description": "Botpress — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 295,
    "name": "Voiceflow",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://voiceflow.com",
    "free": true,
    "description": "Voiceflow — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 296,
    "name": "Chatbase",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://chatbase.co",
    "free": true,
    "description": "Chatbase — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 297,
    "name": "CustomGPT",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://customgpt.ai",
    "free": true,
    "description": "CustomGPT — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 298,
    "name": "Helpshift",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://www.google.com/search?q=Helpshift%20AI%20tool",
    "free": true,
    "description": "Helpshift — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 299,
    "name": "Ada",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://ada.cx",
    "free": true,
    "description": "Ada — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 300,
    "name": "Forethought",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://forethought.ai",
    "free": true,
    "description": "Forethought — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 301,
    "name": "Cognigy",
    "category": "AI Customer Support",
    "icon": "🤖",
    "url": "https://www.google.com/search?q=Cognigy%20AI%20tool",
    "free": true,
    "description": "Cognigy — AI Customer Support tool",
    "tags": [
      "customer"
    ],
    "approved": true
  },
  {
    "id": 302,
    "name": "Surfer SEO",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://surferseo.com",
    "free": true,
    "description": "Surfer SEO — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 303,
    "name": "Frase",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://frase.io",
    "free": true,
    "description": "Frase — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 304,
    "name": "MarketMuse",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://marketmuse.com",
    "free": true,
    "description": "MarketMuse — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 305,
    "name": "Clearscope",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://clearscope.io",
    "free": true,
    "description": "Clearscope — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 306,
    "name": "Semrush AI",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://semrush.com",
    "free": true,
    "description": "Semrush AI — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 307,
    "name": "Ahrefs AI",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://ahrefs.com",
    "free": true,
    "description": "Ahrefs AI — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 308,
    "name": "NeuronWriter",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://neuronwriter.com",
    "free": true,
    "description": "NeuronWriter — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 309,
    "name": "Outranking",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://outranking.io",
    "free": true,
    "description": "Outranking — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 310,
    "name": "Scalenut",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://scalenut.com",
    "free": true,
    "description": "Scalenut — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 311,
    "name": "GrowthBar",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://growthbar.io",
    "free": true,
    "description": "GrowthBar — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 312,
    "name": "Keyword Insights",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://www.google.com/search?q=Keyword%20Insights%20AI%20tool",
    "free": true,
    "description": "Keyword Insights — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 313,
    "name": "Postwise",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://postwise.ai",
    "free": true,
    "description": "Postwise — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 314,
    "name": "Taplio",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://taplio.com",
    "free": true,
    "description": "Taplio — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 315,
    "name": "Tribescaler",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://tribescaler.com",
    "free": true,
    "description": "Tribescaler — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 316,
    "name": "Predis.ai",
    "category": "AI SEO & Marketing",
    "icon": "📣",
    "url": "https://predis.ai",
    "free": true,
    "description": "Predis.ai — AI SEO & Marketing tool",
    "tags": [
      "seo"
    ],
    "approved": true
  },
  {
    "id": 317,
    "name": "DeepL",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://deepl.com",
    "free": true,
    "description": "DeepL — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 318,
    "name": "Google Translate",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://translate.google.com",
    "free": true,
    "description": "Google Translate — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 319,
    "name": "DeepL Write",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://deepl.com/write",
    "free": true,
    "description": "DeepL Write — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 320,
    "name": "Lokalise AI",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://lokalise.com",
    "free": true,
    "description": "Lokalise AI — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 321,
    "name": "Phrase",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://phrase.com",
    "free": true,
    "description": "Phrase — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 322,
    "name": "Smartcat",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://smartcat.com",
    "free": true,
    "description": "Smartcat — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 323,
    "name": "Unbabel",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://unbabel.com",
    "free": true,
    "description": "Unbabel — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 324,
    "name": "ModernMT",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://www.google.com/search?q=ModernMT%20AI%20tool",
    "free": true,
    "description": "ModernMT — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 325,
    "name": "Lilt",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://www.google.com/search?q=Lilt%20AI%20tool",
    "free": true,
    "description": "Lilt — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 326,
    "name": "Weglot",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://weglot.com",
    "free": true,
    "description": "Weglot — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 327,
    "name": "Translized",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://www.google.com/search?q=Translized%20AI%20tool",
    "free": true,
    "description": "Translized — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 328,
    "name": "Systran",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://systransoft.com",
    "free": true,
    "description": "Systran — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 329,
    "name": "NLLB",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://www.google.com/search?q=NLLB%20AI%20tool",
    "free": true,
    "description": "NLLB — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 330,
    "name": "Argos Translate",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://argosopentech.com",
    "free": true,
    "description": "Argos Translate — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 331,
    "name": "LibreTranslate",
    "category": "AI Translation",
    "icon": "🌐",
    "url": "https://libretranslate.com",
    "free": true,
    "description": "LibreTranslate — AI Translation tool",
    "tags": [
      "translation"
    ],
    "approved": true
  },
  {
    "id": 332,
    "name": "Adobe Photoshop AI",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://www.google.com/search?q=Adobe%20Photoshop%20AI%20AI%20tool",
    "free": true,
    "description": "Adobe Photoshop AI — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 333,
    "name": "Luminar Neo",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://skylum.com/luminar",
    "free": true,
    "description": "Luminar Neo — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 334,
    "name": "Fotor AI",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://fotor.com",
    "free": true,
    "description": "Fotor AI — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 335,
    "name": "Pixlr AI",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://pixlr.com",
    "free": true,
    "description": "Pixlr AI — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 336,
    "name": "Cleanup.pictures",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://cleanup.pictures",
    "free": true,
    "description": "Cleanup.pictures — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 337,
    "name": "Photoroom",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://photoroom.com",
    "free": true,
    "description": "Photoroom — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 338,
    "name": "BgRem",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://bgrem.ai",
    "free": true,
    "description": "BgRem — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 339,
    "name": "Upscayl",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://upscayl.org",
    "free": true,
    "description": "Upscayl — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 340,
    "name": "Let's Enhance",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://letsenhance.io",
    "free": true,
    "description": "Let's Enhance — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 341,
    "name": "Topaz Photo AI",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://topazlabs.com",
    "free": true,
    "description": "Topaz Photo AI — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 342,
    "name": "Remini",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://remini.ai",
    "free": true,
    "description": "Remini — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 343,
    "name": "Picwish",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://picwish.com",
    "free": true,
    "description": "Picwish — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 344,
    "name": "Cutout.pro",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://cutout.pro",
    "free": true,
    "description": "Cutout.pro — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 345,
    "name": "Icons8",
    "category": "AI Photo Editing",
    "icon": "🖼️",
    "url": "https://www.google.com/search?q=Icons8%20AI%20tool",
    "free": true,
    "description": "Icons8 — AI Photo Editing tool",
    "tags": [
      "photo"
    ],
    "approved": true
  },
  {
    "id": 346,
    "name": "Hour One",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://hourone.ai",
    "free": true,
    "description": "Hour One — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 347,
    "name": "Deepbrain AI",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://deepbrain.io",
    "free": true,
    "description": "Deepbrain AI — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 348,
    "name": "Elai",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://elai.io",
    "free": true,
    "description": "Elai — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 349,
    "name": "Vidyard AI",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://vidyard.com",
    "free": true,
    "description": "Vidyard AI — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 350,
    "name": "Tavus",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://tavus.io",
    "free": true,
    "description": "Tavus — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 351,
    "name": "Caricaturer",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://www.google.com/search?q=Caricaturer%20AI%20tool",
    "free": true,
    "description": "Caricaturer — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 352,
    "name": "AI Photo",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://www.google.com/search?q=AI%20Photo%20AI%20tool",
    "free": true,
    "description": "AI Photo — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 353,
    "name": "ProfilePicture.ai",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://profilepicture.ai",
    "free": true,
    "description": "ProfilePicture.ai — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 354,
    "name": "PFPMaker",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://pfpmaker.com",
    "free": true,
    "description": "PFPMaker — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 355,
    "name": "Fotor Avatar",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://fotor.com",
    "free": true,
    "description": "Fotor Avatar — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 356,
    "name": "Artguru",
    "category": "AI Avatars & Faces",
    "icon": "👤",
    "url": "https://www.google.com/search?q=Artguru%20AI%20tool",
    "free": true,
    "description": "Artguru — AI Avatars & Faces tool",
    "tags": [
      "avatars"
    ],
    "approved": true
  },
  {
    "id": 357,
    "name": "Kickresume",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://kickresume.com",
    "free": true,
    "description": "Kickresume — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 358,
    "name": "Resume.io",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://resume.io",
    "free": true,
    "description": "Resume.io — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 359,
    "name": "Rezi",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://rezi.ai",
    "free": true,
    "description": "Rezi — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 360,
    "name": "Teal",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://tealhq.com",
    "free": true,
    "description": "Teal — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 361,
    "name": "Jobscan",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://jobscan.co",
    "free": true,
    "description": "Jobscan — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 362,
    "name": "Enhancv",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://enhancv.com",
    "free": true,
    "description": "Enhancv — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 363,
    "name": "Zety AI",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://zety.com",
    "free": true,
    "description": "Zety AI — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 364,
    "name": "Resume Worded",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://resumeworded.com",
    "free": true,
    "description": "Resume Worded — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 365,
    "name": "Careerflow",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://careerflow.ai",
    "free": true,
    "description": "Careerflow — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 366,
    "name": "Simplify",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://simplify.jobs",
    "free": true,
    "description": "Simplify — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 367,
    "name": "Interview Warmup",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://grow.google/certificates/interview-warmup",
    "free": true,
    "description": "Interview Warmup — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 368,
    "name": "Final Round AI",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://finalroundai.com",
    "free": true,
    "description": "Final Round AI — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 369,
    "name": "Yoodli",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://yoodli.ai",
    "free": true,
    "description": "Yoodli — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 370,
    "name": "Big Interview",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://biginterview.com",
    "free": true,
    "description": "Big Interview — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 371,
    "name": "Interviewing.io",
    "category": "AI Resume & Career",
    "icon": "💼",
    "url": "https://www.google.com/search?q=Interviewing.io%20AI%20tool",
    "free": true,
    "description": "Interviewing.io — AI Resume & Career tool",
    "tags": [
      "resume"
    ],
    "approved": true
  },
  {
    "id": 372,
    "name": "Khan Academy AI",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://khanacademy.org",
    "free": true,
    "description": "Khan Academy AI — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 373,
    "name": "Duolingo AI",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://duolingo.com",
    "free": true,
    "description": "Duolingo AI — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 374,
    "name": "Socratic",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://socratic.org",
    "free": true,
    "description": "Socratic — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 375,
    "name": "Photomath",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://photomath.com",
    "free": true,
    "description": "Photomath — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 376,
    "name": "Wolfram Alpha",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://wolframalpha.com",
    "free": true,
    "description": "Wolfram Alpha — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 377,
    "name": "Quizlet AI",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://quizlet.com",
    "free": true,
    "description": "Quizlet AI — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 378,
    "name": "Coursera AI",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://www.google.com/search?q=Coursera%20AI%20AI%20tool",
    "free": true,
    "description": "Coursera AI — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 379,
    "name": "Brainly",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://www.google.com/search?q=Brainly%20AI%20tool",
    "free": true,
    "description": "Brainly — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 380,
    "name": "Khanmigo",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://khanmigo.ai",
    "free": true,
    "description": "Khanmigo — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 381,
    "name": "Mindgrasp",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://mindgrasp.ai",
    "free": true,
    "description": "Mindgrasp — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 382,
    "name": "Synthesis AI",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://www.google.com/search?q=Synthesis%20AI%20AI%20tool",
    "free": true,
    "description": "Synthesis AI — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 383,
    "name": "Numerade",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://numerade.com",
    "free": true,
    "description": "Numerade — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 384,
    "name": "Studyable",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://studyable.app",
    "free": true,
    "description": "Studyable — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 385,
    "name": "Otter Edu",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://www.google.com/search?q=Otter%20Edu%20AI%20tool",
    "free": true,
    "description": "Otter Edu — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 386,
    "name": "Revisely",
    "category": "AI Education",
    "icon": "🎓",
    "url": "https://www.google.com/search?q=Revisely%20AI%20tool",
    "free": true,
    "description": "Revisely — AI Education tool",
    "tags": [
      "education"
    ],
    "approved": true
  },
  {
    "id": 387,
    "name": "AutoGPT",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://autogpt.net",
    "free": true,
    "description": "AutoGPT — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 388,
    "name": "AgentGPT",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://agentgpt.reworkd.ai",
    "free": true,
    "description": "AgentGPT — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 389,
    "name": "BabyAGI",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://www.google.com/search?q=BabyAGI%20AI%20tool",
    "free": true,
    "description": "BabyAGI — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 390,
    "name": "CrewAI",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://crewai.io",
    "free": true,
    "description": "CrewAI — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 391,
    "name": "LangChain",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://langchain.com",
    "free": true,
    "description": "LangChain — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 392,
    "name": "LlamaIndex",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://llamaindex.ai",
    "free": true,
    "description": "LlamaIndex — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 393,
    "name": "Dust",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://dust.tt",
    "free": true,
    "description": "Dust — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 394,
    "name": "Cognosys",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://www.google.com/search?q=Cognosys%20AI%20tool",
    "free": true,
    "description": "Cognosys — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 395,
    "name": "SuperAGI",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://superagi.com",
    "free": true,
    "description": "SuperAGI — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 396,
    "name": "Spell",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://www.google.com/search?q=Spell%20AI%20tool",
    "free": true,
    "description": "Spell — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 397,
    "name": "MultiOn",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://multion.ai",
    "free": true,
    "description": "MultiOn — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 398,
    "name": "Browser Use",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://browser-use.com",
    "free": true,
    "description": "Browser Use — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 399,
    "name": "OpenAI Assistants",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://www.google.com/search?q=OpenAI%20Assistants%20AI%20tool",
    "free": true,
    "description": "OpenAI Assistants — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 400,
    "name": "Fixie",
    "category": "AI Agents & Assistants",
    "icon": "🦾",
    "url": "https://www.google.com/search?q=Fixie%20AI%20tool",
    "free": true,
    "description": "Fixie — AI Agents & Assistants tool",
    "tags": [
      "agents"
    ],
    "approved": true
  },
  {
    "id": 401,
    "name": "Buffer AI",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://buffer.com",
    "free": true,
    "description": "Buffer AI — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 402,
    "name": "Hootsuite AI",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://hootsuite.com",
    "free": true,
    "description": "Hootsuite AI — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 403,
    "name": "Later AI",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://later.com",
    "free": true,
    "description": "Later AI — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 404,
    "name": "Sprout Social AI",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://sproutsocial.com",
    "free": true,
    "description": "Sprout Social AI — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 405,
    "name": "Ocoya",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://ocoya.com",
    "free": true,
    "description": "Ocoya — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 406,
    "name": "Publer",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://publer.io",
    "free": true,
    "description": "Publer — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 407,
    "name": "Typefully",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://typefully.com",
    "free": true,
    "description": "Typefully — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 408,
    "name": "Feedhive",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://feedhive.io",
    "free": true,
    "description": "Feedhive — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 409,
    "name": "ContentStudio",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://contentstudio.io",
    "free": true,
    "description": "ContentStudio — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 410,
    "name": "Vista Social",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://www.google.com/search?q=Vista%20Social%20AI%20tool",
    "free": true,
    "description": "Vista Social — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 411,
    "name": "MissingLettr",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://missinglettr.com",
    "free": true,
    "description": "MissingLettr — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 412,
    "name": "Hypefury",
    "category": "AI Social Media",
    "icon": "📱",
    "url": "https://hypefury.com",
    "free": true,
    "description": "Hypefury — AI Social Media tool",
    "tags": [
      "social"
    ],
    "approved": true
  },
  {
    "id": 413,
    "name": "DeepCode",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://snyk.io/product/snyk-code",
    "free": true,
    "description": "DeepCode — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 414,
    "name": "Snyk AI",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://snyk.io",
    "free": true,
    "description": "Snyk AI — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 415,
    "name": "Codacy",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://codacy.com",
    "free": true,
    "description": "Codacy — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 416,
    "name": "SonarQube AI",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://sonarqube.org",
    "free": true,
    "description": "SonarQube AI — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 417,
    "name": "Bito",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://bito.ai",
    "free": true,
    "description": "Bito — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 418,
    "name": "CodeScene",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://codescene.io",
    "free": true,
    "description": "CodeScene — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 419,
    "name": "Mutable.ai",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://mutable.ai",
    "free": true,
    "description": "Mutable.ai — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 420,
    "name": "Mintlify",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://mintlify.com",
    "free": true,
    "description": "Mintlify — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 421,
    "name": "Swimm",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://swimm.io",
    "free": true,
    "description": "Swimm — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 422,
    "name": "Diffblue Cover",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Diffblue%20Cover%20AI%20tool",
    "free": true,
    "description": "Diffblue Cover — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 423,
    "name": "Applitools",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Applitools%20AI%20tool",
    "free": true,
    "description": "Applitools — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 424,
    "name": "Meticulous",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Meticulous%20AI%20tool",
    "free": true,
    "description": "Meticulous — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 425,
    "name": "Launchable",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Launchable%20AI%20tool",
    "free": true,
    "description": "Launchable — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 426,
    "name": "Functionize",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Functionize%20AI%20tool",
    "free": true,
    "description": "Functionize — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 427,
    "name": "Testim",
    "category": "AI Code Review & Testing",
    "icon": "🧪",
    "url": "https://www.google.com/search?q=Testim%20AI%20tool",
    "free": true,
    "description": "Testim — AI Code Review & Testing tool",
    "tags": [
      "code"
    ],
    "approved": true
  },
  {
    "id": 428,
    "name": "Spline AI",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://spline.design",
    "free": true,
    "description": "Spline AI — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 429,
    "name": "Scenario",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://scenario.gg",
    "free": true,
    "description": "Scenario — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 430,
    "name": "Skybox AI",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://skybox.blockadelabs.com",
    "free": true,
    "description": "Skybox AI — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 431,
    "name": "Meshy",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://meshy.ai",
    "free": true,
    "description": "Meshy — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 432,
    "name": "CSM.ai",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=CSM.ai%20AI%20tool",
    "free": true,
    "description": "CSM.ai — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 433,
    "name": "Kaedim",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://kaedim3d.com",
    "free": true,
    "description": "Kaedim — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 434,
    "name": "Luma 3D",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://lumalabs.ai",
    "free": true,
    "description": "Luma 3D — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 435,
    "name": "TripoSR",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://tripo3d.ai",
    "free": true,
    "description": "TripoSR — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 436,
    "name": "Shap-E",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=Shap-E%20AI%20tool",
    "free": true,
    "description": "Shap-E — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 437,
    "name": "GET3D",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=GET3D%20AI%20tool",
    "free": true,
    "description": "GET3D — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 438,
    "name": "Point-E",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=Point-E%20AI%20tool",
    "free": true,
    "description": "Point-E — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 439,
    "name": "Genie",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=Genie%20AI%20tool",
    "free": true,
    "description": "Genie — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 440,
    "name": "Gamesee",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://www.google.com/search?q=Gamesee%20AI%20tool",
    "free": true,
    "description": "Gamesee — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 441,
    "name": "Inworld AI",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://inworld.ai",
    "free": true,
    "description": "Inworld AI — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 442,
    "name": "Charisma.ai",
    "category": "AI 3D & Game Dev",
    "icon": "🎮",
    "url": "https://charisma.ai",
    "free": true,
    "description": "Charisma.ai — AI 3D & Game Dev tool",
    "tags": [
      "3d"
    ],
    "approved": true
  },
  {
    "id": 443,
    "name": "ClickUp AI",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://clickup.com",
    "free": true,
    "description": "ClickUp AI — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 444,
    "name": "Asana AI",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://asana.com",
    "free": true,
    "description": "Asana AI — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 445,
    "name": "Linear AI",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://linear.app",
    "free": true,
    "description": "Linear AI — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 446,
    "name": "Height",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://height.app",
    "free": true,
    "description": "Height — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 447,
    "name": "Fabric",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://fabric.so",
    "free": true,
    "description": "Fabric — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 448,
    "name": "Cron",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://www.google.com/search?q=Cron%20AI%20tool",
    "free": true,
    "description": "Cron — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 449,
    "name": "Sunsama",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://sunsama.com",
    "free": true,
    "description": "Sunsama — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 450,
    "name": "Akiflow",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://akiflow.com",
    "free": true,
    "description": "Akiflow — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 451,
    "name": "Routine",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://routine.co",
    "free": true,
    "description": "Routine — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 452,
    "name": "Amazing Marvin",
    "category": "AI Productivity",
    "icon": "⚡",
    "url": "https://amazingmarvin.com",
    "free": true,
    "description": "Amazing Marvin — AI Productivity tool",
    "tags": [
      "productivity"
    ],
    "approved": true
  },
  {
    "id": 453,
    "name": "Harvey AI",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://harvey.ai",
    "free": true,
    "description": "Harvey AI — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 454,
    "name": "Casetext",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://casetext.com",
    "free": true,
    "description": "Casetext — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 455,
    "name": "Spellbook",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://spellbook.legal",
    "free": true,
    "description": "Spellbook — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 456,
    "name": "DoNotPay",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://donotpay.com",
    "free": true,
    "description": "DoNotPay — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 457,
    "name": "Lexion",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://lexion.ai",
    "free": true,
    "description": "Lexion — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 458,
    "name": "ContractPodAi",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=ContractPodAi%20AI%20tool",
    "free": true,
    "description": "ContractPodAi — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 459,
    "name": "Ironclad AI",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://ironcladapp.com",
    "free": true,
    "description": "Ironclad AI — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 460,
    "name": "Kira Systems",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://kirasystems.com",
    "free": true,
    "description": "Kira Systems — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 461,
    "name": "Luminance",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Luminance%20AI%20tool",
    "free": true,
    "description": "Luminance — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 462,
    "name": "Kensho",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Kensho%20AI%20tool",
    "free": true,
    "description": "Kensho — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 463,
    "name": "Alphasense",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://alpha-sense.com",
    "free": true,
    "description": "Alphasense — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 464,
    "name": "Bloomberg GPT",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Bloomberg%20GPT%20AI%20tool",
    "free": true,
    "description": "Bloomberg GPT — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 465,
    "name": "Fin2AI",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Fin2AI%20AI%20tool",
    "free": true,
    "description": "Fin2AI — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 466,
    "name": "Draftwise",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Draftwise%20AI%20tool",
    "free": true,
    "description": "Draftwise — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 467,
    "name": "Latch",
    "category": "AI Finance & Legal",
    "icon": "⚖️",
    "url": "https://www.google.com/search?q=Latch%20AI%20tool",
    "free": true,
    "description": "Latch — AI Finance & Legal tool",
    "tags": [
      "finance"
    ],
    "approved": true
  },
  {
    "id": 468,
    "name": "Ada Health",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://ada.com",
    "free": true,
    "description": "Ada Health — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 469,
    "name": "Symptom Checker AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://www.google.com/search?q=Symptom%20Checker%20AI%20AI%20tool",
    "free": true,
    "description": "Symptom Checker AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 470,
    "name": "Babylon Health",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://www.google.com/search?q=Babylon%20Health%20AI%20tool",
    "free": true,
    "description": "Babylon Health — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 471,
    "name": "Woebot",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://woebot.io",
    "free": true,
    "description": "Woebot — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 472,
    "name": "Wysa",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://wysa.ai",
    "free": true,
    "description": "Wysa — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 473,
    "name": "Replika",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://replika.ai",
    "free": true,
    "description": "Replika — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 474,
    "name": "Character.AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://character.ai",
    "free": true,
    "description": "Character.AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 475,
    "name": "Headspace AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://headspace.com",
    "free": true,
    "description": "Headspace AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 476,
    "name": "Calm AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://calm.com",
    "free": true,
    "description": "Calm AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 477,
    "name": "Noom AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://noom.com",
    "free": true,
    "description": "Noom AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 478,
    "name": "Lumen",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://www.google.com/search?q=Lumen%20AI%20tool",
    "free": true,
    "description": "Lumen — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 479,
    "name": "Flo AI",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://flo.health",
    "free": true,
    "description": "Flo AI — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 480,
    "name": "Ovia",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://www.google.com/search?q=Ovia%20AI%20tool",
    "free": true,
    "description": "Ovia — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 481,
    "name": "Spring Health",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://springhealth.com",
    "free": true,
    "description": "Spring Health — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 482,
    "name": "Elomia",
    "category": "AI Health & Wellness",
    "icon": "🏥",
    "url": "https://elomia.com",
    "free": true,
    "description": "Elomia — AI Health & Wellness tool",
    "tags": [
      "health"
    ],
    "approved": true
  },
  {
    "id": 483,
    "name": "Phind",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://phind.com",
    "free": true,
    "description": "Phind — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 484,
    "name": "Kagi",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://kagi.com",
    "free": true,
    "description": "Kagi — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 485,
    "name": "Bing AI",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://bing.com",
    "free": true,
    "description": "Bing AI — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 486,
    "name": "Google AI Overview",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://www.google.com/search?q=Google%20AI%20Overview%20AI%20tool",
    "free": true,
    "description": "Google AI Overview — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 487,
    "name": "Arc Search",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://arc.net/search",
    "free": true,
    "description": "Arc Search — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 488,
    "name": "Brave Leo",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://brave.com/leo",
    "free": true,
    "description": "Brave Leo — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 489,
    "name": "Exa",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://exa.ai",
    "free": true,
    "description": "Exa — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 490,
    "name": "Metaphor",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://www.google.com/search?q=Metaphor%20AI%20tool",
    "free": true,
    "description": "Metaphor — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 491,
    "name": "Andi",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://andisearch.com",
    "free": true,
    "description": "Andi — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 492,
    "name": "Tavily",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://tavily.com",
    "free": true,
    "description": "Tavily — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 493,
    "name": "SerpAPI",
    "category": "AI Search Engines",
    "icon": "🔎",
    "url": "https://www.google.com/search?q=SerpAPI%20AI%20tool",
    "free": true,
    "description": "SerpAPI — AI Search Engines tool",
    "tags": [
      "search"
    ],
    "approved": true
  },
  {
    "id": 494,
    "name": "Bubble AI",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://bubble.io",
    "free": true,
    "description": "Bubble AI — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 495,
    "name": "Webflow AI",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://webflow.com",
    "free": true,
    "description": "Webflow AI — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 496,
    "name": "Softr",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://softr.io",
    "free": true,
    "description": "Softr — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 497,
    "name": "Glide",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://glideapps.com",
    "free": true,
    "description": "Glide — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 498,
    "name": "Adalo",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://adalo.com",
    "free": true,
    "description": "Adalo — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 499,
    "name": "AppGyver",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=AppGyver%20AI%20tool",
    "free": true,
    "description": "AppGyver — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 500,
    "name": "FlutterFlow",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://flutterflow.io",
    "free": true,
    "description": "FlutterFlow — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 501,
    "name": "Draftbit",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=Draftbit%20AI%20tool",
    "free": true,
    "description": "Draftbit — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 502,
    "name": "Pory",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=Pory%20AI%20tool",
    "free": true,
    "description": "Pory — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 503,
    "name": "Bravo Studio",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=Bravo%20Studio%20AI%20tool",
    "free": true,
    "description": "Bravo Studio — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 504,
    "name": "Thunkable",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=Thunkable%20AI%20tool",
    "free": true,
    "description": "Thunkable — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 505,
    "name": "Retool AI",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://retool.com",
    "free": true,
    "description": "Retool AI — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 506,
    "name": "Appsmith",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://appsmith.com",
    "free": true,
    "description": "Appsmith — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 507,
    "name": "Tooljet",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://tooljet.com",
    "free": true,
    "description": "Tooljet — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 508,
    "name": "Airplane.dev",
    "category": "AI No-Code / App Build",
    "icon": "🏗️",
    "url": "https://www.google.com/search?q=Airplane.dev%20AI%20tool",
    "free": true,
    "description": "Airplane.dev — AI No-Code / App Build tool",
    "tags": [
      "nocode"
    ],
    "approved": true
  },
  {
    "id": 509,
    "name": "Greenhouse",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://greenhouse.com",
    "free": true,
    "description": "Greenhouse — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 510,
    "name": "Lever",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://lever.co",
    "free": true,
    "description": "Lever — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 511,
    "name": "Ashby",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://ashbyhq.com",
    "free": true,
    "description": "Ashby — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 512,
    "name": "Workable AI",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://workable.com",
    "free": true,
    "description": "Workable AI — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 513,
    "name": "HireVue",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://hirevue.com",
    "free": true,
    "description": "HireVue — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 514,
    "name": "Paradox (Olivia)",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://paradox.ai",
    "free": true,
    "description": "Paradox (Olivia) — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 515,
    "name": "Eightfold AI",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://eightfold.ai",
    "free": true,
    "description": "Eightfold AI — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 516,
    "name": "SeekOut",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://seekout.com",
    "free": true,
    "description": "SeekOut — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 517,
    "name": "Gem",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://gem.com",
    "free": true,
    "description": "Gem — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 518,
    "name": "Findem",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://findem.ai",
    "free": true,
    "description": "Findem — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 519,
    "name": "Metaview",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://metaview.ai",
    "free": true,
    "description": "Metaview — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 520,
    "name": "Screenloop",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://screenloop.com",
    "free": true,
    "description": "Screenloop — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 521,
    "name": "Kula AI",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://kula.ai",
    "free": true,
    "description": "Kula AI — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 522,
    "name": "Beamery",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://beamery.com",
    "free": true,
    "description": "Beamery — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 523,
    "name": "hireEZ",
    "category": "AI HR & Recruiting",
    "icon": "🧑‍💼",
    "url": "https://hireez.com",
    "free": true,
    "description": "hireEZ — AI HR & Recruiting tool",
    "tags": [
      "hr"
    ],
    "approved": true
  },
  {
    "id": 524,
    "name": "Salesforce Einstein",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://salesforce.com/ai",
    "free": true,
    "description": "Salesforce Einstein — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 525,
    "name": "HubSpot AI",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://hubspot.com/ai",
    "free": true,
    "description": "HubSpot AI — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 526,
    "name": "Gong",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://gong.io",
    "free": true,
    "description": "Gong — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 527,
    "name": "Chorus",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://chorus.ai",
    "free": true,
    "description": "Chorus — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 528,
    "name": "Outreach AI",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://outreach.io",
    "free": true,
    "description": "Outreach AI — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 529,
    "name": "Apollo.io",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://apollo.io",
    "free": true,
    "description": "Apollo.io — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 530,
    "name": "Clay",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://clay.com",
    "free": true,
    "description": "Clay — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 531,
    "name": "Amplemarket",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://amplemarket.com",
    "free": true,
    "description": "Amplemarket — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 532,
    "name": "Seamless.AI",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://seamless.ai",
    "free": true,
    "description": "Seamless.AI — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 533,
    "name": "Exceed.ai",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://exceed.ai",
    "free": true,
    "description": "Exceed.ai — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 534,
    "name": "People.ai",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://people.ai",
    "free": true,
    "description": "People.ai — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 535,
    "name": "Clari",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://clari.com",
    "free": true,
    "description": "Clari — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 536,
    "name": "Revenue.io",
    "category": "AI Sales & CRM",
    "icon": "💰",
    "url": "https://revenue.io",
    "free": true,
    "description": "Revenue.io — AI Sales & CRM tool",
    "tags": [
      "sales"
    ],
    "approved": true
  },
  {
    "id": 537,
    "name": "Shopify AI",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://shopify.com/ai",
    "free": true,
    "description": "Shopify AI — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 538,
    "name": "Octane AI",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://octaneai.com",
    "free": true,
    "description": "Octane AI — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 539,
    "name": "Nosto",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://nosto.com",
    "free": true,
    "description": "Nosto — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 540,
    "name": "Vue.ai",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://vue.ai",
    "free": true,
    "description": "Vue.ai — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 541,
    "name": "Unbxd",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://unbxd.com",
    "free": true,
    "description": "Unbxd — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 542,
    "name": "Clarifai",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://clarifai.com",
    "free": true,
    "description": "Clarifai — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 543,
    "name": "Recombee",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://recombee.com",
    "free": true,
    "description": "Recombee — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 544,
    "name": "Clerk.io",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://clerk.io",
    "free": true,
    "description": "Clerk.io — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 545,
    "name": "Visenze",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://visenze.com",
    "free": true,
    "description": "Visenze — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 546,
    "name": "Algolia AI",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://algolia.com",
    "free": true,
    "description": "Algolia AI — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 547,
    "name": "Bloomreach",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://bloomreach.com",
    "free": true,
    "description": "Bloomreach — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 548,
    "name": "Wunderkind",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://wunderkind.co",
    "free": true,
    "description": "Wunderkind — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 549,
    "name": "Yotpo AI",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://yotpo.com",
    "free": true,
    "description": "Yotpo AI — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 550,
    "name": "Akeneo AI",
    "category": "AI E-Commerce",
    "icon": "🛒",
    "url": "https://akeneo.com",
    "free": true,
    "description": "Akeneo AI — AI E-Commerce tool",
    "tags": [
      "ecommerce"
    ],
    "approved": true
  },
  {
    "id": 551,
    "name": "Darktrace",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://darktrace.com",
    "free": true,
    "description": "Darktrace — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 552,
    "name": "CrowdStrike AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://crowdstrike.com",
    "free": true,
    "description": "CrowdStrike AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 553,
    "name": "SentinelOne AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://sentinelone.com",
    "free": true,
    "description": "SentinelOne AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 554,
    "name": "Vectra AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://vectra.ai",
    "free": true,
    "description": "Vectra AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 555,
    "name": "Tessian",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://tessian.com",
    "free": true,
    "description": "Tessian — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 556,
    "name": "Abnormal Security",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://abnormalsecurity.com",
    "free": true,
    "description": "Abnormal Security — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 557,
    "name": "Orca Security",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://orca.security",
    "free": true,
    "description": "Orca Security — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 558,
    "name": "Wiz AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://wiz.io",
    "free": true,
    "description": "Wiz AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 559,
    "name": "VirusTotal AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://virustotal.com",
    "free": true,
    "description": "VirusTotal AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 560,
    "name": "IBM QRadar AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://ibm.com/qradar",
    "free": true,
    "description": "IBM QRadar AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 561,
    "name": "Microsoft Security AI",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://microsoft.com/security",
    "free": true,
    "description": "Microsoft Security AI — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 562,
    "name": "Reality Defender",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://realitydefender.com",
    "free": true,
    "description": "Reality Defender — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 563,
    "name": "Cylance",
    "category": "AI Cybersecurity",
    "icon": "🔐",
    "url": "https://blackberry.com/cylance",
    "free": true,
    "description": "Cylance — AI Cybersecurity tool",
    "tags": [
      "cybersecurity"
    ],
    "approved": true
  },
  {
    "id": 564,
    "name": "Tableau AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://tableau.com",
    "free": true,
    "description": "Tableau AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 565,
    "name": "Power BI AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://powerbi.microsoft.com",
    "free": true,
    "description": "Power BI AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 566,
    "name": "Looker",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://looker.com",
    "free": true,
    "description": "Looker — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 567,
    "name": "ThoughtSpot",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://thoughtspot.com",
    "free": true,
    "description": "ThoughtSpot — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 568,
    "name": "Domo AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://domo.com",
    "free": true,
    "description": "Domo AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 569,
    "name": "Sisense",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://sisense.com",
    "free": true,
    "description": "Sisense — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 570,
    "name": "Qlik AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://qlik.com",
    "free": true,
    "description": "Qlik AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 571,
    "name": "Metabase",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://metabase.com",
    "free": true,
    "description": "Metabase — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 572,
    "name": "Hex",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://hex.tech",
    "free": true,
    "description": "Hex — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 573,
    "name": "Lightdash",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://lightdash.com",
    "free": true,
    "description": "Lightdash — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 574,
    "name": "Count.co",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://count.co",
    "free": true,
    "description": "Count.co — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 575,
    "name": "Omni",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://omni.co",
    "free": true,
    "description": "Omni — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 576,
    "name": "Deepnote",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://deepnote.com",
    "free": true,
    "description": "Deepnote — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 577,
    "name": "Grafana AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://grafana.com",
    "free": true,
    "description": "Grafana AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 578,
    "name": "Mixpanel AI",
    "category": "AI Analytics & BI",
    "icon": "📊",
    "url": "https://mixpanel.com",
    "free": true,
    "description": "Mixpanel AI — AI Analytics & BI tool",
    "tags": [
      "analytics"
    ],
    "approved": true
  },
  {
    "id": 579,
    "name": "PDF.ai",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://pdf.ai",
    "free": true,
    "description": "PDF.ai — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 580,
    "name": "Sider",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://sider.ai",
    "free": true,
    "description": "Sider — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 581,
    "name": "Docsumo",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://docsumo.com",
    "free": true,
    "description": "Docsumo — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 582,
    "name": "Nanonets",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://nanonets.com",
    "free": true,
    "description": "Nanonets — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 583,
    "name": "Rossum",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://rossum.ai",
    "free": true,
    "description": "Rossum — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 584,
    "name": "Klippa",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://klippa.com",
    "free": true,
    "description": "Klippa — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 585,
    "name": "Abbyy AI",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://abbyy.com",
    "free": true,
    "description": "Abbyy AI — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 586,
    "name": "Reducto",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://reducto.ai",
    "free": true,
    "description": "Reducto — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 587,
    "name": "Unstructured",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://unstructured.io",
    "free": true,
    "description": "Unstructured — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 588,
    "name": "DocuSign AI",
    "category": "AI PDF & Documents",
    "icon": "📄",
    "url": "https://docusign.com",
    "free": true,
    "description": "DocuSign AI — AI PDF & Documents tool",
    "tags": [
      "pdf"
    ],
    "approved": true
  },
  {
    "id": 589,
    "name": "OpenAI API",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://platform.openai.com",
    "free": true,
    "description": "OpenAI API — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 590,
    "name": "Anthropic API",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://console.anthropic.com",
    "free": true,
    "description": "Anthropic API — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 591,
    "name": "Google AI Studio",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://aistudio.google.com",
    "free": true,
    "description": "Google AI Studio — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 592,
    "name": "Hugging Face",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://huggingface.co",
    "free": true,
    "description": "Hugging Face — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 593,
    "name": "Replicate",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://replicate.com",
    "free": true,
    "description": "Replicate — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 594,
    "name": "Groq",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://groq.com",
    "free": true,
    "description": "Groq — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 595,
    "name": "Fireworks AI",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://fireworks.ai",
    "free": true,
    "description": "Fireworks AI — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 596,
    "name": "Modal",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://modal.com",
    "free": true,
    "description": "Modal — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 597,
    "name": "Vercel AI SDK",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://sdk.vercel.ai",
    "free": true,
    "description": "Vercel AI SDK — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 598,
    "name": "LangSmith",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://langsmith.com",
    "free": true,
    "description": "LangSmith — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 599,
    "name": "Weights & Biases",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://wandb.ai",
    "free": true,
    "description": "Weights & Biases — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 600,
    "name": "MLflow",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://mlflow.org",
    "free": true,
    "description": "MLflow — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 601,
    "name": "BentoML",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://bentoml.com",
    "free": true,
    "description": "BentoML — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 602,
    "name": "Dify",
    "category": "AI Developer APIs",
    "icon": "⚡",
    "url": "https://dify.ai",
    "free": true,
    "description": "Dify — AI Developer APIs tool",
    "tags": [
      "developer"
    ],
    "approved": true
  },
  {
    "id": 603,
    "name": "InteriorAI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://interiorai.com",
    "free": true,
    "description": "InteriorAI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 604,
    "name": "RoomGPT",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://roomgpt.io",
    "free": true,
    "description": "RoomGPT — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 605,
    "name": "Planner 5D",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://planner5d.com",
    "free": true,
    "description": "Planner 5D — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 606,
    "name": "HomeDesigns AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://homedesigns.ai",
    "free": true,
    "description": "HomeDesigns AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 607,
    "name": "ReimagineHome",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://reimaginehome.ai",
    "free": true,
    "description": "ReimagineHome — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 608,
    "name": "Virtual Staging AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://virtualstaging.ai",
    "free": true,
    "description": "Virtual Staging AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 609,
    "name": "Collov AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://collov.ai",
    "free": true,
    "description": "Collov AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 610,
    "name": "Decor8 AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://decor8.ai",
    "free": true,
    "description": "Decor8 AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 611,
    "name": "Spacely AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://spacely.ai",
    "free": true,
    "description": "Spacely AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 612,
    "name": "ArchiVinci",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://archivinci.com",
    "free": true,
    "description": "ArchiVinci — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 613,
    "name": "Morpholio Board",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://morpholioapps.com",
    "free": true,
    "description": "Morpholio Board — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 614,
    "name": "MagicPlan",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://magicplan.app",
    "free": true,
    "description": "MagicPlan — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 615,
    "name": "Decorilla",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://decorilla.com",
    "free": true,
    "description": "Decorilla — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 616,
    "name": "REimagineHome",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://reimaginehome.ai",
    "free": true,
    "description": "REimagineHome — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 617,
    "name": "Archi AI",
    "category": "AI Interior Design",
    "icon": "🛋️",
    "url": "https://archi.com",
    "free": true,
    "description": "Archi AI — AI Interior Design tool",
    "tags": [
      "interior"
    ],
    "approved": true
  },
  {
    "id": 618,
    "name": "Layla AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://layla.ai",
    "free": true,
    "description": "Layla AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 619,
    "name": "Roam Around",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://roamaround.io",
    "free": true,
    "description": "Roam Around — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 620,
    "name": "Vacay Chatbot",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://vacay.io",
    "free": true,
    "description": "Vacay Chatbot — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 621,
    "name": "TripPlanner AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://tripplanner.ai",
    "free": true,
    "description": "TripPlanner AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 622,
    "name": "GuideGeek",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://guidegeek.com",
    "free": true,
    "description": "GuideGeek — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 623,
    "name": "Wanderlog",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://wanderlog.com",
    "free": true,
    "description": "Wanderlog — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 624,
    "name": "Kayak AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://kayak.com",
    "free": true,
    "description": "Kayak AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 625,
    "name": "Expedia AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://expedia.com",
    "free": true,
    "description": "Expedia AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 626,
    "name": "Google Travel AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://www.google.com/search?q=Google%20Travel%20AI%20AI%20tool",
    "free": true,
    "description": "Google Travel AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 627,
    "name": "Tripnotes",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://tripnotes.ai",
    "free": true,
    "description": "Tripnotes — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 628,
    "name": "Plantrip AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://plantrip.ai",
    "free": true,
    "description": "Plantrip AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 629,
    "name": "Mindtrip",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://mindtrip.ai",
    "free": true,
    "description": "Mindtrip — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 630,
    "name": "Trip.com AI",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://trip.com",
    "free": true,
    "description": "Trip.com AI — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 631,
    "name": "Elude",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://elude.com",
    "free": true,
    "description": "Elude — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 632,
    "name": "Hopper",
    "category": "AI Travel Planning",
    "icon": "✈️",
    "url": "https://hopper.com",
    "free": true,
    "description": "Hopper — AI Travel Planning tool",
    "tags": [
      "travel"
    ],
    "approved": true
  },
  {
    "id": 633,
    "name": "Stitch Fix AI",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://stitchfix.com",
    "free": true,
    "description": "Stitch Fix AI — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 634,
    "name": "Stylebot",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://stylebot.ai",
    "free": true,
    "description": "Stylebot — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 635,
    "name": "YesPlz",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://yesplz.ai",
    "free": true,
    "description": "YesPlz — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 636,
    "name": "Fashable",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://fashable.ai",
    "free": true,
    "description": "Fashable — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 637,
    "name": "Cala",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://ca.la",
    "free": true,
    "description": "Cala — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 638,
    "name": "Botika",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://botika.online",
    "free": true,
    "description": "Botika — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 639,
    "name": "Revery AI",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://revery.ai",
    "free": true,
    "description": "Revery AI — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 640,
    "name": "Perfect Corp",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://perfectcorp.com",
    "free": true,
    "description": "Perfect Corp — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 641,
    "name": "ModiFace",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://modiface.com",
    "free": true,
    "description": "ModiFace — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 642,
    "name": "Skin AI",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://skinai.app",
    "free": true,
    "description": "Skin AI — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 643,
    "name": "Haut.AI",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://haut.ai",
    "free": true,
    "description": "Haut.AI — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 644,
    "name": "Looklet",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://looklet.com",
    "free": true,
    "description": "Looklet — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 645,
    "name": "The Yes",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://theyes.com",
    "free": true,
    "description": "The Yes — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 646,
    "name": "Rosebud AI",
    "category": "AI Fashion & Beauty",
    "icon": "👗",
    "url": "https://rosebud.ai",
    "free": true,
    "description": "Rosebud AI — AI Fashion & Beauty tool",
    "tags": [
      "fashion"
    ],
    "approved": true
  },
  {
    "id": 647,
    "name": "ChefGPT",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://chefgpt.xyz",
    "free": true,
    "description": "ChefGPT — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 648,
    "name": "Whisk",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://whisk.com",
    "free": true,
    "description": "Whisk — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 649,
    "name": "Mealime AI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://mealime.com",
    "free": true,
    "description": "Mealime AI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 650,
    "name": "Plant Jammer",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://plantjammer.com",
    "free": true,
    "description": "Plant Jammer — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 651,
    "name": "SideChef AI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://sidechef.com",
    "free": true,
    "description": "SideChef AI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 652,
    "name": "Yummly AI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://yummly.com",
    "free": true,
    "description": "Yummly AI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 653,
    "name": "Foodvisor",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://foodvisor.io",
    "free": true,
    "description": "Foodvisor — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 654,
    "name": "Nutrify",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://nutrify.app",
    "free": true,
    "description": "Nutrify — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 655,
    "name": "Calorie Mama",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://caloriemama.ai",
    "free": true,
    "description": "Calorie Mama — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 656,
    "name": "DishGen",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://dishgen.com",
    "free": true,
    "description": "DishGen — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 657,
    "name": "RecipeIQ",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://recipeiq.app",
    "free": true,
    "description": "RecipeIQ — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 658,
    "name": "Kitchen Stories AI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://kitchenstories.com",
    "free": true,
    "description": "Kitchen Stories AI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 659,
    "name": "CookAI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://cookai.today",
    "free": true,
    "description": "CookAI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 660,
    "name": "Flavour Crusader",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://www.google.com/search?q=Flavour%20Crusader%20AI%20tool",
    "free": true,
    "description": "Flavour Crusader — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 661,
    "name": "Meal Planner AI",
    "category": "AI Food & Cooking",
    "icon": "🍳",
    "url": "https://mealplanner.ai",
    "free": true,
    "description": "Meal Planner AI — AI Food & Cooking tool",
    "tags": [
      "food"
    ],
    "approved": true
  },
  {
    "id": 662,
    "name": "Zillow AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://zillow.com",
    "free": true,
    "description": "Zillow AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 663,
    "name": "Redfin AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://redfin.com",
    "free": true,
    "description": "Redfin AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 664,
    "name": "HouseCanary",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://housecanary.com",
    "free": true,
    "description": "HouseCanary — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 665,
    "name": "Restb.ai",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://restb.ai",
    "free": true,
    "description": "Restb.ai — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 666,
    "name": "Skyline AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://skyline.ai",
    "free": true,
    "description": "Skyline AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 667,
    "name": "Epique AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://epique.ai",
    "free": true,
    "description": "Epique AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 668,
    "name": "Rex Homes",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://www.google.com/search?q=Rex%20Homes%20AI%20tool",
    "free": true,
    "description": "Rex Homes — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 669,
    "name": "Structurely",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://structurely.com",
    "free": true,
    "description": "Structurely — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 670,
    "name": "Likely.AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://likely.ai",
    "free": true,
    "description": "Likely.AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 671,
    "name": "Offrs",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://offrs.com",
    "free": true,
    "description": "Offrs — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 672,
    "name": "Quantarium",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://quantarium.com",
    "free": true,
    "description": "Quantarium — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 673,
    "name": "CoreLogic AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://corelogic.com",
    "free": true,
    "description": "CoreLogic AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 674,
    "name": "PropStream",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://propstream.com",
    "free": true,
    "description": "PropStream — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 675,
    "name": "Privy AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://privy.com",
    "free": true,
    "description": "Privy AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 676,
    "name": "Zestimate AI",
    "category": "AI Real Estate",
    "icon": "🏠",
    "url": "https://www.google.com/search?q=Zestimate%20AI%20AI%20tool",
    "free": true,
    "description": "Zestimate AI — AI Real Estate tool",
    "tags": [
      "real"
    ],
    "approved": true
  },
  {
    "id": 677,
    "name": "Blue Yonder",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://blueyonder.com",
    "free": true,
    "description": "Blue Yonder — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 678,
    "name": "Kinaxis",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://kinaxis.com",
    "free": true,
    "description": "Kinaxis — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 679,
    "name": "o9 Solutions",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://o9solutions.com",
    "free": true,
    "description": "o9 Solutions — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 680,
    "name": "Coupa AI",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://coupa.com",
    "free": true,
    "description": "Coupa AI — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 681,
    "name": "SAP IBP",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://sap.com/ibp",
    "free": true,
    "description": "SAP IBP — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 682,
    "name": "E2open",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://e2open.com",
    "free": true,
    "description": "E2open — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 683,
    "name": "RELEX Solutions",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://relexsolutions.com",
    "free": true,
    "description": "RELEX Solutions — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 684,
    "name": "Logility",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://logility.com",
    "free": true,
    "description": "Logility — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 685,
    "name": "Llamasoft",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://www.google.com/search?q=Llamasoft%20AI%20tool",
    "free": true,
    "description": "Llamasoft — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 686,
    "name": "project44",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://project44.com",
    "free": true,
    "description": "project44 — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 687,
    "name": "FourKites",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://fourkites.com",
    "free": true,
    "description": "FourKites — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 688,
    "name": "Resilinc",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://resilinc.com",
    "free": true,
    "description": "Resilinc — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 689,
    "name": "Nulogy",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://www.google.com/search?q=Nulogy%20AI%20tool",
    "free": true,
    "description": "Nulogy — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 690,
    "name": "Celonis",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://celonis.com",
    "free": true,
    "description": "Celonis — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 691,
    "name": "One Network",
    "category": "AI Supply Chain",
    "icon": "🚚",
    "url": "https://onenetwork.com",
    "free": true,
    "description": "One Network — AI Supply Chain tool",
    "tags": [
      "supply"
    ],
    "approved": true
  },
  {
    "id": 692,
    "name": "AlphaFold",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://alphafold.ebi.ac.uk",
    "free": true,
    "description": "AlphaFold — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 693,
    "name": "ESMFold",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://esmatlas.com",
    "free": true,
    "description": "ESMFold — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 694,
    "name": "ChemCrow",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://github.com/ur-whitelab/chemcrow",
    "free": true,
    "description": "ChemCrow — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 695,
    "name": "Galactica",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://galactica.org",
    "free": true,
    "description": "Galactica — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 696,
    "name": "BioGPT",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://github.com/microsoft/BioGPT",
    "free": true,
    "description": "BioGPT — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 697,
    "name": "PubMed AI",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://pubmed.ncbi.nlm.nih.gov",
    "free": true,
    "description": "PubMed AI — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 698,
    "name": "IBM Watson Discovery",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://ibm.com/cloud/watson-discovery",
    "free": true,
    "description": "IBM Watson Discovery — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 699,
    "name": "Rxivist",
    "category": "AI Science & Research",
    "icon": "🔬",
    "url": "https://www.google.com/search?q=Rxivist%20AI%20tool",
    "free": true,
    "description": "Rxivist — AI Science & Research tool",
    "tags": [
      "science"
    ],
    "approved": true
  },
  {
    "id": 700,
    "name": "Be My Eyes AI",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://bemyeyes.com",
    "free": true,
    "description": "Be My Eyes AI — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 701,
    "name": "Otter.ai",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://www.google.com/search?q=Otter.ai%20AI%20tool",
    "free": true,
    "description": "Otter.ai — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 702,
    "name": "Microsoft Seeing AI",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://seeingai.com",
    "free": true,
    "description": "Microsoft Seeing AI — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 703,
    "name": "Google Lookout",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://support.google.com/accessibility/android/answer/9031321",
    "free": true,
    "description": "Google Lookout — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 704,
    "name": "Voiceitt",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://voiceitt.com",
    "free": true,
    "description": "Voiceitt — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 705,
    "name": "Aiko",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://sindresorhus.com/aiko",
    "free": true,
    "description": "Aiko — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 706,
    "name": "Whisper",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://openai.com/research/whisper",
    "free": true,
    "description": "Whisper — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 707,
    "name": "Read&Write",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://texthelp.com/products/read-and-write",
    "free": true,
    "description": "Read&Write — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 708,
    "name": "Claro Software",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://clarosoftware.com",
    "free": true,
    "description": "Claro Software — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 709,
    "name": "TextHelp",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://texthelp.com",
    "free": true,
    "description": "TextHelp — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 710,
    "name": "Snap&Read",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://donjohnston.com",
    "free": true,
    "description": "Snap&Read — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 711,
    "name": "Kurzweil 3000",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://kurzweiledu.com",
    "free": true,
    "description": "Kurzweil 3000 — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 712,
    "name": "Voice Dream",
    "category": "AI Accessibility",
    "icon": "♿",
    "url": "https://voicedream.com",
    "free": true,
    "description": "Voice Dream — AI Accessibility tool",
    "tags": [
      "accessibility"
    ],
    "approved": true
  },
  {
    "id": 713,
    "name": "Supermeme.ai",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://supermeme.ai",
    "free": true,
    "description": "Supermeme.ai — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 714,
    "name": "Meme Generator AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://www.google.com/search?q=Meme%20Generator%20AI%20AI%20tool",
    "free": true,
    "description": "Meme Generator AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 715,
    "name": "ImgFlip AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://imgflip.com/ai-meme",
    "free": true,
    "description": "ImgFlip AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 716,
    "name": "ThisPersonDoesNotExist",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://thispersondoesnotexist.com",
    "free": true,
    "description": "ThisPersonDoesNotExist — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 717,
    "name": "AI Dungeon",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://aidungeon.io",
    "free": true,
    "description": "AI Dungeon — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 718,
    "name": "Janitor AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://janitorai.com",
    "free": true,
    "description": "Janitor AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 719,
    "name": "Chai AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://chai.ml",
    "free": true,
    "description": "Chai AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 720,
    "name": "Candy AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://candy.ai",
    "free": true,
    "description": "Candy AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 721,
    "name": "Tavern AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://tavernai.net",
    "free": true,
    "description": "Tavern AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 722,
    "name": "SillyTavern",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://www.google.com/search?q=SillyTavern%20AI%20tool",
    "free": true,
    "description": "SillyTavern — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 723,
    "name": "Kindroid",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://kindroid.ai",
    "free": true,
    "description": "Kindroid — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 724,
    "name": "Dreamscape AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://www.google.com/search?q=Dreamscape%20AI%20AI%20tool",
    "free": true,
    "description": "Dreamscape AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 725,
    "name": "Nomi AI",
    "category": "AI Meme & Fun",
    "icon": "😂",
    "url": "https://nomi.ai",
    "free": true,
    "description": "Nomi AI — AI Meme & Fun tool",
    "tags": [
      "meme"
    ],
    "approved": true
  },
  {
    "id": 726,
    "name": "AdCreative.ai",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://adcreative.ai",
    "free": true,
    "description": "AdCreative.ai — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 727,
    "name": "Pencil AI",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://pencil.com",
    "free": true,
    "description": "Pencil AI — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 728,
    "name": "Smartly.io",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://smartly.io",
    "free": true,
    "description": "Smartly.io — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 729,
    "name": "Pattern89",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://pattern89.com",
    "free": true,
    "description": "Pattern89 — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 730,
    "name": "Persado",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://persado.com",
    "free": true,
    "description": "Persado — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 731,
    "name": "Phrasee",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://phrasee.co",
    "free": true,
    "description": "Phrasee — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 732,
    "name": "Flashtalking AI",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://www.google.com/search?q=Flashtalking%20AI%20AI%20tool",
    "free": true,
    "description": "Flashtalking AI — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 733,
    "name": "Celtra",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://celtra.com",
    "free": true,
    "description": "Celtra — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 734,
    "name": "Typeface",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://typeface.ai",
    "free": true,
    "description": "Typeface — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 735,
    "name": "Omneky",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://omneky.com",
    "free": true,
    "description": "Omneky — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 736,
    "name": "Smartads",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://www.google.com/search?q=Smartads%20AI%20tool",
    "free": true,
    "description": "Smartads — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 737,
    "name": "Brafton AI",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://www.google.com/search?q=Brafton%20AI%20AI%20tool",
    "free": true,
    "description": "Brafton AI — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 738,
    "name": "Rocketium",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://rocketium.com",
    "free": true,
    "description": "Rocketium — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 739,
    "name": "Bannerbear",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://bannerbear.com",
    "free": true,
    "description": "Bannerbear — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 740,
    "name": "Creatopy",
    "category": "AI Ad Creative",
    "icon": "📢",
    "url": "https://creatopy.com",
    "free": true,
    "description": "Creatopy — AI Ad Creative tool",
    "tags": [
      "ad"
    ],
    "approved": true
  },
  {
    "id": 741,
    "name": "Novelcrafter",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://novelcrafter.com",
    "free": true,
    "description": "Novelcrafter — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 742,
    "name": "Reedsy AI",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://reedsy.com",
    "free": true,
    "description": "Reedsy AI — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 743,
    "name": "Atticus",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://atticus.io",
    "free": true,
    "description": "Atticus — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 744,
    "name": "AutoCrit",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://autocrit.com",
    "free": true,
    "description": "AutoCrit — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 745,
    "name": "Fictionary",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://fictionary.co",
    "free": true,
    "description": "Fictionary — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 746,
    "name": "StoryGrid AI",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://www.google.com/search?q=StoryGrid%20AI%20AI%20tool",
    "free": true,
    "description": "StoryGrid AI — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 747,
    "name": "Dabble",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://dabblewriter.com",
    "free": true,
    "description": "Dabble — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 748,
    "name": "Scrivener AI",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://literatureandlatte.com/scrivener",
    "free": true,
    "description": "Scrivener AI — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 749,
    "name": "Hemingway Editor",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://hemingwayapp.com",
    "free": true,
    "description": "Hemingway Editor — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 750,
    "name": "iA Writer AI",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://ia.net/writer",
    "free": true,
    "description": "iA Writer AI — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 751,
    "name": "Draft",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://draftin.com",
    "free": true,
    "description": "Draft — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 752,
    "name": "Letterpal",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://letterpal.ai",
    "free": true,
    "description": "Letterpal — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  },
  {
    "id": 753,
    "name": "Plottr",
    "category": "AI Writing (Long Form)",
    "icon": "📖",
    "url": "https://plottr.com",
    "free": true,
    "description": "Plottr — AI Writing (Long Form) tool",
    "tags": [
      "writing"
    ],
    "approved": true
  }
];

function initDB() {
  ensureDir();

  if (fs.existsSync(TOOLS_FILE)) {
    const existing = readJSON(TOOLS_FILE);
    if (existing.length < 100) {
      writeJSON(TOOLS_FILE, SEED_TOOLS);
      console.log(`✅ Reseeded with ${SEED_TOOLS.length} tools`);
    } else {
      console.log(`✅ Tools DB ready (${existing.length} tools)`);
    }
  } else {
    writeJSON(TOOLS_FILE, SEED_TOOLS);
    console.log(`✅ Seeded ${SEED_TOOLS.length} tools`);
  }

  if (!fs.existsSync(USERS_FILE)) {
    const hash = bcrypt.hashSync('admin123', 10);
    writeJSON(USERS_FILE, [{
      id:1, username:'admin', email:'admin@aitools.com',
      password:hash, role:'admin', createdAt: new Date().toISOString()
    }]);
    console.log('✅ Created default admin user');
  }

  if (!fs.existsSync(FAVS_FILE))   writeJSON(FAVS_FILE, []);
  if (!fs.existsSync(SUBMIT_FILE)) writeJSON(SUBMIT_FILE, []);
  console.log('✅ Database ready');
}

const DB = {
  getUsers:         ()      => readJSON(USERS_FILE),
  saveUsers:        (d)     => writeJSON(USERS_FILE, d),
  getUserById:      (id)    => readJSON(USERS_FILE).find(u => u.id === id),
  getUserByEmail:   (e)     => readJSON(USERS_FILE).find(u => u.email === e),
  getUserByUsername:(u)     => readJSON(USERS_FILE).find(u2 => u2.username === u),
  createUser: (user) => {
    const users = readJSON(USERS_FILE);
    user.id = nextId(users); user.role = 'user';
    user.createdAt = new Date().toISOString();
    users.push(user); writeJSON(USERS_FILE, users); return user;
  },
  getTools:    ()     => readJSON(TOOLS_FILE),
  saveTools:   (d)    => writeJSON(TOOLS_FILE, d),
  getToolById: (id)   => readJSON(TOOLS_FILE).find(t => t.id === Number(id)),
  createTool: (tool) => {
    const tools = readJSON(TOOLS_FILE);
    tool.id = nextId(tools); tool.createdAt = new Date().toISOString();
    tool.approved = false; tools.push(tool);
    writeJSON(TOOLS_FILE, tools); return tool;
  },
  updateTool: (id, data) => {
    const tools = readJSON(TOOLS_FILE);
    const idx = tools.findIndex(t => t.id === Number(id));
    if (idx === -1) return null;
    tools[idx] = { ...tools[idx], ...data, id: Number(id), updatedAt: new Date().toISOString() };
    writeJSON(TOOLS_FILE, tools); return tools[idx];
  },
  deleteTool: (id) => {
    const tools = readJSON(TOOLS_FILE);
    const filtered = tools.filter(t => t.id !== Number(id));
    writeJSON(TOOLS_FILE, filtered);
    return filtered.length < tools.length;
  },
  getFavs:       ()        => readJSON(FAVS_FILE),
  getFavsByUser: (userId)  => readJSON(FAVS_FILE).filter(f => f.userId === userId),
  addFav: (userId, toolId) => {
    const favs = readJSON(FAVS_FILE);
    if (favs.find(f => f.userId === userId && f.toolId === Number(toolId))) return { already: true };
    const fav = { id: nextId(favs), userId, toolId: Number(toolId), createdAt: new Date().toISOString() };
    favs.push(fav); writeJSON(FAVS_FILE, favs); return fav;
  },
  removeFav: (userId, toolId) => {
    const favs = readJSON(FAVS_FILE);
    const filtered = favs.filter(f => !(f.userId === userId && f.toolId === Number(toolId)));
    writeJSON(FAVS_FILE, filtered); return filtered.length < favs.length;
  },
  getSubmissions: ()      => readJSON(SUBMIT_FILE),
  addSubmission: (data)   => {
    const subs = readJSON(SUBMIT_FILE);
    data.id = nextId(subs); data.status = 'pending';
    data.submittedAt = new Date().toISOString();
    subs.push(data); writeJSON(SUBMIT_FILE, subs); return data;
  },
  updateSubmission: (id, data) => {
    const subs = readJSON(SUBMIT_FILE);
    const idx = subs.findIndex(s => s.id === Number(id));
    if (idx === -1) return null;
    subs[idx] = { ...subs[idx], ...data };
    writeJSON(SUBMIT_FILE, subs); return subs[idx];
  },
};

module.exports = { initDB, DB };