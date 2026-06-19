// assets/content-map.js
// 站点内容分区与搜索过滤函数

const siteConfig = {
  baseUrl: "https://cctv-lejingsport.com",
  siteName: "乐竞体育",
  version: "1.2.0"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["乐竞体育", "赛事", "综合"],
    keywords: ["首页", "乐竞体育", "赛事首页"],
    items: [
      { name: "热门赛事", url: "/hot", tags: ["乐竞体育", "热门"] },
      { name: "最新动态", url: "/news", tags: ["乐竞体育", "新闻"] }
    ]
  },
  {
    id: "live",
    title: "直播",
    tags: ["乐竞体育", "直播", "实时"],
    keywords: ["乐竞体育直播", "实况", "在线"],
    items: [
      { name: "足球直播", url: "/live/football", tags: ["乐竞体育", "足球"] },
      { name: "篮球直播", url: "/live/basketball", tags: ["乐竞体育", "篮球"] },
      { name: "电竞直播", url: "/live/esports", tags: ["乐竞体育", "电竞"] }
    ]
  },
  {
    id: "results",
    title: "赛果",
    tags: ["乐竞体育", "赛果", "比分"],
    keywords: ["乐竞体育赛果", "比分查询"],
    items: [
      { name: "今日赛果", url: "/results/today", tags: ["乐竞体育", "今日"] },
      { name: "历史赛果", url: "/results/history", tags: ["乐竞体育", "历史"] }
    ]
  },
  {
    id: "stats",
    title: "数据",
    tags: ["乐竞体育", "数据", "统计"],
    keywords: ["乐竞体育数据", "统计信息"],
    items: [
      { name: "球队排名", url: "/stats/rankings", tags: ["乐竞体育", "排名"] },
      { name: "球员统计", url: "/stats/players", tags: ["乐竞体育", "球员"] }
    ]
  }
];

function filterSectionsByTag(tag) {
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

function filterItemsByKeyword(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const results = [];
  contentSections.forEach(section => {
    section.items.forEach(item => {
      const matchName = item.name.toLowerCase().includes(lowerKeyword);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(lowerKeyword));
      const matchSectionKeywords = section.keywords.some(k => k.toLowerCase().includes(lowerKeyword));
      if (matchName || matchTags || matchSectionKeywords) {
        results.push({ section: section.title, item });
      }
    });
  });
  return results;
}

function searchContent(query) {
  const lowerQuery = query.toLowerCase();
  const sectionMatches = contentSections.filter(s =>
    s.title.toLowerCase().includes(lowerQuery) ||
    s.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
  const itemMatches = filterItemsByKeyword(query);
  return { sections: sectionMatches, items: itemMatches };
}

function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(t => tagSet.add(t));
    section.items.forEach(item => item.tags.forEach(t => tagSet.add(t)));
  });
  return Array.from(tagSet);
}

function getSectionById(id) {
  return contentSections.find(section => section.id === id) || null;
}