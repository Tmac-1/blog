module.exports = {
    extends: ["@commitlint/config-conventional"],
//   extends: ["cz"],
//   parserPreset: {
//     parserOpts: {
//       headerPattern: /^(\w*)\(([\u4e00-\u9fa5]*)\)/,
//       headerCorrespondence: ["type", "scope"],
//     },
//   },
//   rules: {
//     "type-empty": [2, "never"],
//     "scope-empty": [2, "never"],
//   },
"rules": {"type-enum": [2,"always",["✨ 新功能","🐛 修复"]],"type-empty": [0],"subject-empty": [0]}
};
