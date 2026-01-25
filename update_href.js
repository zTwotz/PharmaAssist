const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the FEATURED_CATEGORIES array with new one containing hrefs
const newFeaturedCategories = `const FEATURED_CATEGORIES = [
  {
    id: "brain",
    name: "Thần kinh não",
    filterName: "Thần kinh não",
    href: "/thuc-pham-chuc-nang/than-kinh-nao",
    count: 55,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Brain outline with details */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 01-6-6c0-2 1.5-3.5 2-4.5.5-1 0-2.5.5-3.5A3.5 3.5 0 0112 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 006-6c0-2-1.5-3.5-2-4.5-.5-1 0-2.5-.5-3.5A3.5 3.5 0 0012 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5h3M16.5 12.5h-3M8.5 9h2.5M15.5 9h-2.5" />
      </svg>
    )
  },
  {
    id: "vitamin",
    name: "Vitamin & Khoáng chất",
    filterName: "Vitamin & Khoáng chất",
    href: "/thuc-pham-chuc-nang/vitamin-and-khoang-chat",
    count: 83,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Medicine/Vitamin Bottle with label */}
        <rect x="8" y="3" width="8" height="2" rx="0.5" />
        <rect x="6" y="5" width="12" height="15" rx="1.5" />
        <rect x="6" y="9" width="12" height="6" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "hormone",
    name: "Sinh lý - Nội tiết tố",
    filterName: "Sinh lý - Nội tiết tố",
    href: "/thuc-pham-chuc-nang/sinh-ly-noi-tiet-to",
    count: 44,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Two bottles side-by-side */}
        <rect x="5" y="6" width="6" height="13" rx="1" />
        <rect x="6.5" y="4" width="3" height="2" rx="0.5" />
        <rect x="13" y="6" width="6" height="13" rx="1" />
        <rect x="14.5" y="4" width="3" height="2" rx="0.5" />
        <path d="M8 10v5M16 10v5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "cardio",
    name: "Tim mạch - Huyết áp",
    filterName: "Tim mạch - Huyết áp",
    href: "/thuc-pham-chuc-nang/tim-mach-huyet-ap",
    count: 21,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Heart with ECG pulse line */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h2.5l1.5-3.5 2 7 1.5-5 1.5 2.5H20" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C6 14 3.5 10 3.5 7.5a4.5 4.5 0 018.5-2 4.5 4.5 0 018.5 2c0 2.5-2.5 6.5-8.5 13.5z" />
      </svg>
    )
  },
  {
    id: "immune",
    name: "Miễn dịch - Đề kháng",
    filterName: "Miễn dịch - Đề kháng",
    href: "/thuc-pham-chuc-nang/mien-dich-de-khang",
    count: 48,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Shield with checkmark */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    id: "digest",
    name: "Tiêu hóa",
    filterName: "Tiêu hóa",
    href: "/thuc-pham-chuc-nang/tieu-hoa",
    count: 70,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Stomach shape */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 3-3 4-3 7 0 4.5 3.5 7 7 7s5-2 5-5.5c0-3.5-3.5-5.5-4-7.5M12 3v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 13.5c1 1.5 2.5 1.5 3.5 0" />
      </svg>
    )
  },
  {
    id: "skin-solution",
    name: "Giải pháp làn da",
    filterName: "Giải pháp làn da",
    href: "/duoc-my-pham/giai-phap-lan-da",
    count: 71,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Medical cross above skin layers */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M9 6h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c4-2 6 2 10 0s6-2 10 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18c4-2 6 2 10 0s6-2 10 0" />
      </svg>
    )
  },
  {
    id: "face-care",
    name: "Chăm sóc da mặt",
    filterName: "Chăm sóc da mặt",
    href: "/duoc-my-pham/cham-soc-da-mat",
    count: 158,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Smiley face with sparkles */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10.5" r="1" fill="currentColor" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.5c1.5 1.5 3.5 1.5 5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M15 12a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0" />
      </svg>
    )
  },
  {
    id: "beauty",
    name: "Hỗ trợ làm đẹp",
    filterName: "Hỗ trợ làm đẹp",
    href: "/thuc-pham-chuc-nang/ho-tro-lam-dep",
    count: 18,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Droplet with swirl/leaf */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.5 4.5-7 8.5-7 11.5A7 7 0 0012 21a7 7 0 007-6.5c0-3-2.5-7-7-11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2 0 3.5 1.5 3.5 3.5S14 18 12 18" />
      </svg>
    )
  },
  {
    id: "sex",
    name: "Hỗ trợ tình dục",
    filterName: "Hỗ trợ tình dục",
    href: "/cham-soc-ca-nhan/ho-tro-tinh-duc",
    count: 41,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Intertwined gender symbols */}
        <circle cx="9.5" cy="14.5" r="4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 19v3M7.5 20.5h4" />
        <circle cx="14.5" cy="9.5" r="4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 5.5h3v3M17.5 8.5l4-4" />
      </svg>
    )
  },
  {
    id: "milk",
    name: "Sữa",
    filterName: "Sữa",
    href: "/thuc-pham-chuc-nang/sua",
    count: 43,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Milk carton */}
        <rect x="8" y="7" width="8" height="13" rx="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4M8 11h8M12 11v9" />
      </svg>
    )
  },
  {
    id: "monitoring",
    name: "Dụng cụ theo dõi",
    filterName: "Dụng cụ theo dõi",
    href: "/thiet-bi-y-te/dung-cu-theo-doi",
    count: 95,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Stethoscope */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5v5a7 7 0 0014 0V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v3M9 20h6" />
        <circle cx="5" cy="4" r="1.5" fill="currentColor" />
        <circle cx="19" cy="4" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];`;

const startIndex = content.indexOf('const FEATURED_CATEGORIES = [');
if (startIndex === -1) {
  console.error('Could not find FEATURED_CATEGORIES start');
  process.exit(1);
}

let openBrackets = 1;
let index = content.indexOf('[', startIndex) + 1;

while (openBrackets > 0 && index < content.length) {
  if (content[index] === '[') {
    openBrackets++;
  } else if (content[index] === ']') {
    openBrackets--;
  }
  index++;
}

if (openBrackets !== 0) {
  console.error('Could not find matching bracket for FEATURED_CATEGORIES');
  process.exit(1);
}

const endIndex = index;
content = content.substring(0, startIndex) + newFeaturedCategories + content.substring(endIndex);

// 2. Replace button elements inside FEATURED_CATEGORIES.map rendering with Link elements
const oldButtonBlock = `                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.filterName)}
                  className={\`p-5 rounded-2xl text-center flex flex-col items-center justify-between border transition-all duration-300 hover:scale-102 hover:shadow-lg h-full min-h-[158px] group relative \${
                    isSelected 
                      ? "bg-[#eff6ff] border-[#024ad8]/40 shadow-sm" 
                      : "bg-white border-fog hover:border-[#024ad8]/20 shadow-sm"
                  }\`}
                >`;

const newLinkBlock = `                <Link
                  key={cat.id}
                  href={cat.href || '#'}
                  className={\`p-5 rounded-2xl text-center flex flex-col items-center justify-between border transition-all duration-300 hover:scale-102 hover:shadow-lg h-full min-h-[158px] group relative bg-white border-fog hover:border-[#024ad8]/20 shadow-sm\`}
                >`;

const oldClosingTag = `                </button>`;
const newClosingTag = `                </Link>`;

content = content.replace(oldButtonBlock, newLinkBlock);
content = content.replace(oldClosingTag, newClosingTag);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated categories to use Links with correct URLs!');
