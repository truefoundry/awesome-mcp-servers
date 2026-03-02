const fs = require('fs');

const readme = fs.readFileSync(process.argv[2], 'utf-8');
const lines = readme.split('\n');

const categoryMap = {
  'Aggregators': 'Aggregators',
  'Aerospace & Astrodynamics': 'Aerospace',
  'Art & Culture': 'Art & Culture',
  'Architecture & Design': 'Architecture',
  'Biology, Medicine and Bioinformatics': 'Biology & Medicine',
  'Browser Automation': 'Browser Automation',
  'Cloud Platforms': 'Cloud Platforms',
  'Code Execution': 'Code Execution',
  'Coding Agents': 'Coding Agents',
  'Command Line': 'Command Line',
  'Communication': 'Communication',
  'Customer Data Platforms': 'Data Platforms',
  'Databases': 'Databases',
  'Data Platforms': 'Data Platforms',
  'Delivery': 'Delivery',
  'Developer Tools': 'Developer Tools',
  'Data Science Tools': 'Data Science',
  'Embedded system': 'Embedded Systems',
  'Environment & Nature': 'Environment',
  'File Systems': 'File Systems',
  'Finance & Fintech': 'Finance',
  'Gaming': 'Gaming',
  'Home Automation': 'Home Automation',
  'Knowledge & Memory': 'Knowledge & Memory',
  'Legal': 'Legal',
  'Location Services': 'Location',
  'Marketing': 'Marketing',
  'Monitoring': 'Monitoring',
  'Multimedia Process': 'Multimedia',
  'Product Management': 'Product Management',
  'Research': 'Research',
  'Search & Data Extraction': 'Search',
  'Security': 'Security',
  'Social Media': 'Social Media',
  'Sports': 'Sports',
  'Support & Service Management': 'Support',
  'Translation Services': 'Translation',
  'Text-to-Speech': 'Text-to-Speech',
  'Travel & Transportation': 'Travel',
  'Version Control': 'Version Control',
  'Workplace & Productivity': 'Productivity',
  'Other Tools and Integrations': 'Other',
};

const langMap = {
  '🐍': 'Python',
  '📇': 'TypeScript',
  '🏎️': 'Go',
  '🏎': 'Go',
  '🦀': 'Rust',
  '#️⃣': 'C#',
  '☕': 'Java',
  '🌊': 'C/C++',
  '💎': 'Ruby',
};

const servers = [];
let currentCategory = null;

for (const line of lines) {
  const headerMatch = line.match(/^###?\s+(?:🔗|🎨|📐|📂|🧬|☁️|👨‍💻|🤖|🖥️|💬|👤|🗄️|📊|🚚|🛠️|🧮|📟|🌳|💰|🎮|🏠|🧠|⚖️|🗺️|🎯|📋|🔬|🔎|🔒|🌐|🏃|🎧|🌎|🚆|🔄|🏢|🚀)?\s*(.+)/);
  if (headerMatch) {
    const rawCat = headerMatch[1].trim();
    for (const [key, val] of Object.entries(categoryMap)) {
      if (rawCat.toLowerCase().includes(key.toLowerCase())) {
        currentCategory = val;
        break;
      }
    }
    if (!currentCategory && rawCat !== 'Server Implementations') {
      currentCategory = rawCat;
    }
    continue;
  }

  const serverMatch = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)\s*(.*)/);
  if (serverMatch && currentCategory) {
    const name = serverMatch[1];
    const url = serverMatch[2];
    let rest = serverMatch[3];

    let isOfficial = rest.includes('🎖️') || rest.includes('🎖');

    let language = null;
    for (const [emoji, lang] of Object.entries(langMap)) {
      if (rest.includes(emoji)) {
        language = lang;
        break;
      }
    }

    const descMatch = rest.match(/[-–]\s+(.+)/);
    const description = descMatch ? descMatch[1].trim() : '';

    if (!description) continue;

    const ghMatch = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const repo = ghMatch ? `${ghMatch[1]}/${ghMatch[2]}` : name;

    servers.push({
      name: name,
      repo: repo,
      url: url,
      description: description,
      category: currentCategory,
      language: language,
      isOfficial: isOfficial,
    });
  }
}

console.log(JSON.stringify(servers, null, 2));
console.error(`Parsed ${servers.length} servers across categories`);
