"use client"

import { useState } from "react"

export default function BarrierFreeBitesPage() {
  const [filter, setFilter] = useState<"all" | "hearing" | "visual">("all")

  const isVisible = (type: "hearing" | "visual") => filter === "all" || filter === type

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <style>{`
          :root {
            --color-white: rgba(255, 255, 255, 1);
            --color-cream-50: rgba(252, 252, 249, 1);
            --color-cream-100: rgba(255, 255, 253, 1);
            --color-gray-300: rgba(167, 169, 169, 1);
            --color-slate-500: rgba(98, 108, 113, 1);
            --color-brown-600: rgba(94, 82, 64, 1);
            --color-charcoal-700: rgba(31, 33, 33, 1);
            --color-charcoal-800: rgba(38, 40, 40, 1);
            --color-slate-900: rgba(19, 52, 59, 1);
            --color-teal-300: rgba(50, 184, 198, 1);
            --color-teal-500: rgba(33, 128, 141, 1);
            --color-teal-600: rgba(29, 116, 128, 1);
            --color-teal-700: rgba(8, 145, 178, 1);
            --color-gray-200: rgba(245, 245, 245, 1);
            --color-orange-500: rgba(168, 75, 47, 1);
            --color-brown-600-rgb: 94, 82, 64;
            --color-teal-500-rgb: 33, 128, 141;
            --color-slate-900-rgb: 19, 52, 59;
            --color-gray-400-rgb: 119, 124, 124;
            --color-teal-300-rgb: 50, 184, 198;
            --color-background: var(--color-cream-50);
            --color-surface: var(--color-cream-100);
            --color-text: var(--color-slate-900);
            --color-text-secondary: var(--color-slate-500);
            --color-primary: rgba(147, 51, 234, 1);
            --color-primary-hover: rgba(126, 34, 206, 1);
            --color-accent: rgba(219, 39, 119, 1);
            --color-secondary: rgba(8, 145, 178, 1);
            --color-card-border: rgba(255, 255, 255, 0.2);
            --color-border: rgba(255, 255, 255, 0.2);
            --font-family-base: "FKGroteskNeue", "Microsoft YaHei", "PingFang SC", sans-serif;
            --font-size-sm: 12px;
            --font-size-base: 14px;
            --font-size-lg: 16px;
            --font-size-xl: 18px;
            --font-size-2xl: 20px;
            --font-size-3xl: 24px;
            --font-size-4xl: 30px;
            --font-weight-medium: 500;
            --font-weight-semibold: 550;
            --font-weight-bold: 600;
            --space-8: 8px;
            --space-12: 12px;
            --space-16: 16px;
            --space-20: 20px;
            --space-24: 24px;
            --space-32: 32px;
            --radius-base: 8px;
            --radius-lg: 12px;
            --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --color-background: var(--color-charcoal-700);
              --color-surface: var(--color-charcoal-800);
              --color-text: var(--color-gray-200);
              --color-text-secondary: rgba(var(--color-gray-300), 0.7);
              --color-primary: rgba(192, 132, 252, 1);
              --color-card-border: rgba(255, 255, 255, 0.15);
              --color-border: rgba(255, 255, 255, 0.3);
            }
          }
          .header { text-align: center; margin-bottom: var(--space-32); padding: var(--space-24) 0; }
          .subtitle { font-size: var(--font-size-lg); color: var(--color-text-secondary); font-weight: var(--font-weight-medium); }
          .filter-section { display: flex; gap: var(--space-12); margin-bottom: var(--space-32); flex-wrap: wrap; justify-content: center; }
          .filter-btn { padding: var(--space-8) var(--space-20); border: 2px solid var(--color-border); background: var(--color-surface); color: var(--color-text); border-radius: var(--radius-base); cursor: pointer; font-size: var(--font-size-base); font-weight: var(--font-weight-medium); transition: all 0.3s ease; }
          .filter-btn:hover { border-color: var(--color-primary); background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); color: var(--color-white); }
          .filter-btn.active { border-color: var(--color-primary); background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); color: var(--color-white); }
          .restaurants-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-24); margin-bottom: var(--space-32); }
          .restaurant-card { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: all 0.3s ease; display: flex; flex-direction: column; }
          .restaurant-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
          .restaurant-card.hidden { display: none; }
          .card-header { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-secondary) 100%); padding: var(--space-20); color: var(--color-white); }
          .restaurant-name { font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); }
          .accessibility-tags { display: flex; gap: var(--space-8); flex-wrap: wrap; }
          .tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px var(--space-12); background: rgba(255, 255, 255, 0.2); border-radius: 20px; font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
          .card-body { padding: var(--space-20); flex-grow: 1; display: flex; flex-direction: column; }
          .description { font-size: var(--font-size-base); color: var(--color-text-secondary); margin-bottom: var(--space-16); line-height: 1.7; }
          .features { margin-bottom: var(--space-16); }
          .features-title { font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-8); color: var(--color-text); }
          .features-list { list-style: none; padding: 0; }
          .features-list li { font-size: var(--font-size-sm); color: var(--color-text-secondary); padding: 4px 0; padding-left: var(--space-16); position: relative; }
          .features-list li::before { content: "✓"; position: absolute; left: 0; color: var(--color-primary); font-weight: var(--font-weight-bold); }
          .info-section { margin-top: auto; padding-top: var(--space-16); border-top: 1px solid var(--color-card-border); }
          .info-item { display: flex; align-items: flex-start; gap: var(--space-8); margin-bottom: var(--space-8); font-size: var(--font-size-sm); color: var(--color-text-secondary); }
          .info-label { font-weight: var(--font-weight-semibold); color: var(--color-text); min-width: 60px; }
          .about-section { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-24); margin-top: var(--space-32); }
          .about-title { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-16); color: var(--color-text); }
          .about-content { font-size: var(--font-size-base); color: var(--color-text-secondary); line-height: 1.8; }
          .icon { font-size: var(--font-size-lg); }
          @media (max-width: 768px) {
            .restaurants-grid { grid-template-columns: 1fr; }
            .filter-section { flex-direction: column; }
            .filter-btn { width: 100%; }
          }
          `}</style>

          <header className="header">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              🌟 无障碍友好美食指南
            </h1>
            <p className="subtitle">为每个人提供平等的美食体验</p>
          </header>

          <div className="filter-section">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部餐厅
            </button>
            <button
              className={`filter-btn ${filter === 'hearing' ? 'active' : ''}`}
              onClick={() => setFilter('hearing')}
            >
              听障友好
            </button>
            <button
              className={`filter-btn ${filter === 'visual' ? 'active' : ''}`}
              onClick={() => setFilter('visual')}
            >
              视障友好
            </button>
          </div>

          <div className="restaurants-grid">
            {/* 培哥烟囱面包 */}
            <div className={`restaurant-card ${isVisible('hearing') ? '' : 'hidden'}`} data-accessibility="hearing">
              <div className="card-header">
                <h2 className="restaurant-name">培哥烟囱面包</h2>
                <div className="accessibility-tags">
                  <span className="tag">
                    <span className="icon">👂</span>
                    听障友好
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="description">
                  一家致力于为听障人士提供温暖服务的特色面包店，以其独特的烟囱面包和无障碍沟通环境闻名。店内配备专业手语服务，让每一位顾客都能轻松点餐。
                </p>
                <div className="features">
                  <h3 className="features-title">无障碍特色</h3>
                  <ul className="features-list">
                    <li>提供专业手语翻译服务</li>
                    <li>图文并茂的菜单设计</li>
                    <li>电子点餐系统支持</li>
                    <li>视觉化叫号系统</li>
                    <li>写字板辅助沟通</li>
                  </ul>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <span className="info-label">特色美食：</span>
                    <span>烟囱面包、欧式软包、手工点心</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">服务亮点：</span>
                    <span>聘用听障员工，营造包容氛围</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">地址：</span>
                    <span>安徽省合肥市庐阳区含山路29号105-3室</span>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <a
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-white/30 bg-white/70 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 hover:text-white transition-colors"
                      href={`https://uri.amap.com/search?keyword=${encodeURIComponent("安徽省合肥市庐阳区含山路29号105-3室")}&city=${encodeURIComponent("合肥市")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📍 打开高德地图
                    </a>
                    <a
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-white/30 bg-white/70 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 hover:text-white transition-colors"
                      href={`https://map.baidu.com/search/${encodeURIComponent("安徽省合肥市庐阳区含山路29号105-3室")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🗺️ 打开百度地图
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 木马童话黑暗餐厅 */}
            <div className={`restaurant-card ${isVisible('visual') ? '' : 'hidden'}`} data-accessibility="visual">
              <div className="card-header">
                <h2 className="restaurant-name">木马童话黑暗餐厅</h2>
                <div className="accessibility-tags">
                  <span className="tag">
                    <span className="icon">👁️</span>
                    视障友好
                  </span>
                  <span className="tag">
                    <span className="icon">🍽️</span>
                    日式料理
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="description">
                  北京独特的黑暗餐厅，由曾经历视网膜脱落的外科医生于爽创办于2009年。餐厅提供完全黑暗的用餐体验，让顾客感受视障人士的世界，同时聘用视障员工提供专业服务。
                </p>
                <div className="features">
                  <h3 className="features-title">无障碍特色</h3>
                  <ul className="features-list">
                    <li>视障员工专业引导服务</li>
                    <li>完全黑暗的平等用餐环境</li>
                    <li>触觉和听觉为主的体验设计</li>
                    <li>无障碍通道和设施</li>
                    <li>盲文菜单和语音介绍</li>
                    <li>在线预订系统便捷服务</li>
                  </ul>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <span className="info-label">餐厅类型：</span>
                    <span>法国菜、日式料理、私人定制</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">地址：</span>
                    <span>北京西城区西单北大街109号西西友谊酒店8层</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">特色体验：</span>
                    <span>在黑暗中用餐，感受不同的美食维度</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">社会价值：</span>
                    <span>12年来为上百名残障人士提供就业机会</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="about-title">关于无障碍美食</h2>
            <p className="about-content">
              无障碍美食不仅仅是提供物理上的便利设施，更是一种尊重和包容的态度。这些餐厅通过专业的服务、贴心的设计和平等的理念，让每一位顾客都能享受到美好的用餐体验。它们不仅为残障人士提供了就业机会，也让更多人了解和关注无障碍服务的重要性。
            </p>
            <p className="about-content" style={{ marginTop: 'var(--space-16)' }}>
              我们希望通过这份指南，帮助大家发现更多这样有温度的餐厅，同时也呼吁更多餐饮企业关注无障碍服务，共同营造一个更加包容友好的社会环境。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}