import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  PhoneCall,
  Zap,
  Smile,
  FileText,
  Ghost,
  ArrowLeft,
  Swords,
  Play,
  Lock,
  Cpu,
  Presentation,
  Network,
} from "lucide-react";

// --- 常量数据 ---
const OFFICE_BG_URL =
  "https://youke.xn--y7xa690gmna.cn/s1/2026/02/15/69913188a0f1e.webp";

// --- 老板技能 ---
const BOSS_SKILLS = [
  {
    id: "b1",
    name: "下班·封印术",
    desc: "17:59 发起会议，锁定下班按钮",
    icon: PhoneCall,
  },
  {
    id: "b2",
    name: "微操·周报催命",
    desc: "要求精确到分钟的日报，体力减半",
    icon: FileText,
  },
  {
    id: "b3",
    name: "零点·PPT降临",
    desc: "明早就要方案，施加【通宵】Debuff",
    icon: Presentation,
  },
  {
    id: "b4",
    name: "降维·文字过敏",
    desc: "拒绝阅读文字，强制要求商业架构图",
    icon: Network,
  },
];

// --- 员工技能 ---
const ALL_EMP_SKILLS = [
  {
    id: "e1",
    name: "AI 嘴替·礼貌回绝",
    desc: "LLM 生成高情商废话，无伤格挡",
    icon: Smile,
  },
  {
    id: "e2",
    name: "黑话·周报膨胀术",
    desc: "把 1 个 Bug 吹成底层重构",
    icon: Cpu,
  },
  {
    id: "e3",
    name: "Gamma·光速PPT",
    desc: "Gamma 一键生成，瞬秒 Deadline",
    icon: Zap,
  },
  {
    id: "e4",
    name: "Napkin·画饼具象化",
    desc: "文字转架构图，克制【文字过敏】",
    icon: Briefcase,
  },
];

// --- 技能联动 ---
const SKILL_LINKAGE = {
  b1: ["e1"],
  b2: ["e2"],
  b3: ["e3"],
  b4: ["e4"],
};

// --- 动画配置 ---
const pageVariants = {
  initial: { opacity: 0, scale: 1, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 1,
    filter: "blur(10px)",
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function App() {
  const [scene, setScene] = useState("start");
  const [selected, setSelected] = useState({ boss: [], emp: [] });

  const availableEmpSkills = useMemo(() => {
    const bossId = selected.boss[0];
    if (!bossId) return [];
    return ALL_EMP_SKILLS.filter((skill) =>
      SKILL_LINKAGE[bossId].includes(skill.id)
    );
  }, [selected.boss]);

  const toggleSkill = (role, id) => {
    setSelected((prev) => {
      const isAlreadySelected = prev[role].includes(id);
      if (role === "boss") {
        return { ...prev, boss: isAlreadySelected ? [] : [id], emp: [] };
      } else {
        return { ...prev, emp: isAlreadySelected ? [] : [id] };
      }
    });
  };

  const isReady = selected.boss.length === 1 && selected.emp.length === 1;

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black text-white selection:bg-yellow-500 selection:text-black">
      {/* 背景层 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${OFFICE_BG_URL})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] opacity-30 animate-scan" />
      </div>

      <AnimatePresence mode="wait">
        {scene === "start" && (
          <motion.div
            key="start"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 h-full flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center relative group z-10"
            >
              <div className="absolute -inset-10 bg-yellow-500/10 blur-3xl rounded-full opacity-50" />

              {/* 首页标题：保持较大，但不过分 */}
              <h1 className="pixel-zh-title text-5xl md:text-8xl mb-4 relative z-10 tracking-widest">
                摸鱼谷物语
              </h1>
              <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-700 drop-shadow-[3px_3px_0_#000] tracking-[0.2em] opacity-90 relative z-10">
                OFFICE VALLEY
              </h2>
            </motion.div>

            <motion.button
              onClick={() => setScene("select")}
              whileHover={{ scale: 1.05, backgroundColor: "#4ade80" }}
              whileTap={{ scale: 0.95, y: 4 }}
              className="mt-16 group relative px-12 py-6 bg-green-500 text-black font-bold text-xl md:text-2xl uppercase tracking-widest shadow-[6px_6px_0_#000] border-2 border-black"
            >
              <span className="flex items-center gap-4 relative z-10">
                <Play className="w-8 h-8 animate-pulse" fill="currentColor" />{" "}
                START GAME
              </span>
            </motion.button>
          </motion.div>
        )}

        {scene === "select" && (
          <motion.div
            key="select"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 h-full flex flex-col p-4 md:p-8"
          >
            <div className="flex justify-between items-center mb-6 bg-black/60 p-4 rounded-xl border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setScene("start")}
                className="text-slate-400 hover:text-white flex items-center gap-2 group text-base font-bold"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />{" "}
                BACK
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400">
                配置对局 (1v1)
              </h2>
              <div className="w-16"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 items-stretch justify-center max-w-7xl mx-auto w-full overflow-hidden">
              <SelectCard
                role="boss"
                title="BOSS"
                subtitle="选择 1 个压迫招式"
                icon="👹"
                theme="red"
                skills={BOSS_SKILLS}
                selectedIds={selected.boss}
                onToggle={toggleSkill}
              />
              <div className="hidden md:flex items-center justify-center">
                <Swords
                  className={`w-12 h-12 transition-colors ${
                    isReady
                      ? "text-yellow-500 animate-bounce"
                      : "text-slate-700"
                  }`}
                />
              </div>
              <SelectCard
                role="emp"
                title="YOU"
                subtitle={
                  selected.boss.length
                    ? "选择 1 个应对策略"
                    : "请先选择老板技能"
                }
                icon="🧑‍💻"
                theme="blue"
                skills={availableEmpSkills}
                selectedIds={selected.emp}
                onToggle={toggleSkill}
                isLocked={selected.boss.length === 0}
              />
            </div>

            <motion.div className="mt-6 flex justify-center pb-4">
              <motion.button
                disabled={!isReady}
                animate={
                  isReady
                    ? { backgroundColor: "#eab308", color: "#000", scale: 1.05 }
                    : { backgroundColor: "#1e293b", color: "#64748b", scale: 1 }
                }
                className="px-12 py-5 font-bold text-lg md:text-xl uppercase tracking-widest rounded-xl transition-all border-2 shadow-xl flex items-center gap-3 disabled:cursor-not-allowed"
                onClick={() => alert("对线开始！")}
              >
                {isReady ? (
                  <>
                    <Swords className="w-6 h-6" /> ENTER OFFICE
                  </>
                ) : (
                  "请双方各选 1 个技能"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan { from { background-position: 0 0; } to { background-position: 0 100%; } }
        .animate-scan { animation: scan 15s linear infinite; }

        .pixel-zh-title {
            font-family: "SimHei", "Microsoft YaHei", "Heiti SC", sans-serif;
            font-weight: 900;
            color: #facc15;
            text-shadow: 3px 3px 0px #a16207, 6px 6px 0px #000000;
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: grayscale;
            letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}

function SelectCard({
  role,
  title,
  subtitle,
  icon,
  theme,
  skills,
  selectedIds,
  onToggle,
  isLocked,
}) {
  const isBoss = role === "boss";
  const themeColors = {
    red: {
      bg: "from-red-950/40 to-slate-900/90",
      border: "border-red-500/40",
      text: "text-red-100",
      accent: "text-red-500",
      activeBg: "rgba(239,68,68,0.3)",
      activeBorder: "#ef4444",
    },
    blue: {
      bg: "from-blue-950/40 to-slate-900/90",
      border: "border-blue-500/40",
      text: "text-blue-100",
      accent: "text-blue-500",
      activeBg: "rgba(59,130,246,0.3)",
      activeBorder: "#3b82f6",
    },
  };
  const c = themeColors[theme];

  return (
    <motion.div
      variants={itemVariants}
      className={`flex-1 bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-6 backdrop-blur-md flex flex-col relative shadow-2xl overflow-hidden`}
    >
      <div className="absolute -top-10 -right-10 opacity-5 text-9xl pointer-events-none select-none">
        {icon}
      </div>
      <div className="text-center mb-6 z-10">
        {/* 标题：3xl (适中) */}
        <h3
          className={`text-3xl md:text-4xl ${c.text} font-bold drop-shadow-md`}
        >
          {title}
        </h3>
        <p className="text-slate-400 text-xs md:text-sm mt-2 tracking-widest uppercase font-bold">
          {subtitle}
        </p>
      </div>
      <div className="flex-1 space-y-3 z-10 overflow-y-auto">
        {isLocked ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
            <Lock size={48} />
            <p className="text-base font-bold">技能尚未解锁</p>
          </div>
        ) : (
          skills.map((skill) => {
            const isSelected = selectedIds.includes(skill.id);
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.id}
                onClick={() => onToggle(role, skill.id)}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.1 }}
                animate={
                  isSelected
                    ? {
                        backgroundColor: c.activeBg,
                        borderColor: c.activeBorder,
                        borderWidth: "2px",
                      }
                    : {
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderColor: "rgba(255,255,255,0.05)",
                        borderWidth: "1px",
                      }
                }
                className={`cursor-pointer w-full p-4 rounded-xl border transition-all flex items-center gap-4 group relative`}
              >
                <div
                  className={`p-2 rounded-lg bg-slate-800 transition-colors`}
                >
                  {/* 图标：w-6 h-6 (标准) */}
                  <Icon
                    className={`w-6 h-6 ${
                      isSelected ? c.accent : "text-slate-500"
                    }`}
                  />
                </div>
                <div>
                  {/* 技能名：text-lg (清晰) */}
                  <div
                    className={`text-base md:text-lg font-bold ${
                      isSelected ? c.text : "text-slate-300"
                    }`}
                  >
                    {skill.name}
                  </div>
                  {/* 描述：text-sm (易读) */}
                  <div className="text-xs md:text-sm text-slate-400 leading-snug mt-1">
                    {skill.desc}
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute right-4 w-3 h-3 rounded-full ${
                      isBoss ? "bg-red-500" : "bg-blue-500"
                    }`}
                  />
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
