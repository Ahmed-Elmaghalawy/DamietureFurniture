const fs = require('fs');
const files = ['index.html', 'store.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Make logo have a black background
  content = content.replace(/class="([^"]*h-16 w-auto object-contain[^"]*)"/g, 'class="$1 bg-black rounded-lg p-1"');
  content = content.replace(/class="([^"]*max-h-16 w-auto object-contain[^"]*)"/g, 'class="$1 bg-black rounded-lg p-1"');

  // 2. Remove Theme Toggle button
  content = content.replace(/<button id="themeToggle"[\s\S]*?<\/button>\s*/g, '');

  // 3. Change body to black and red base
  content = content.replace(/class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"/g, 'class="bg-black text-white"');

  // 4. Update the header background
  content = content.replace(/bg-white\/70 dark:bg-slate-950\/70/g, 'bg-black/80');
  content = content.replace(/border-slate-200\/50 dark:border-red-800\/30/g, 'border-red-900/50');

  // 5. Update text colors that were slate-900 to white
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-white');
  content = content.replace(/text-slate-900/g, 'text-white');

  // 6. Update text colors that were slate-600/700 to gray-400
  content = content.replace(/text-slate-600 dark:text-slate-300/g, 'text-gray-300');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-gray-400');
  content = content.replace(/text-slate-700 dark:text-slate-200/g, 'text-gray-200');
  content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-gray-400');
  content = content.replace(/text-slate-700/g, 'text-gray-300');
  content = content.replace(/text-slate-600/g, 'text-gray-400');

  // 7. Update gradients and backgrounds to black/red
  content = content.replace(/bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-black dark:to-slate-900/g, 'bg-gradient-to-br from-black via-neutral-950 to-red-950/20');
  content = content.replace(/bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900\/50 dark:to-slate-800\/30/g, 'bg-gradient-to-br from-black to-red-950/30');
  content = content.replace(/bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950\/30 dark:to-red-900\/20/g, 'bg-gradient-to-br from-red-950/40 to-black');
  content = content.replace(/bg-slate-50 dark:bg-slate-900\/30/g, 'bg-red-950/10 border border-red-900/20');
  content = content.replace(/bg-white dark:bg-slate-950/g, 'bg-black');
  content = content.replace(/bg-white\/95 dark:bg-slate-950\/95/g, 'bg-black/95');

  // 8. Update glass cards and buttons hovering over white
  content = content.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-red-950/40 border border-red-900/30');

  // Footer gradient or colors
  content = content.replace(/border-slate-200\/50 dark:border-slate-800\/50/g, 'border-red-900/30');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
