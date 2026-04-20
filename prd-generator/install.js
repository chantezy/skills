#!/usr/bin/env node

/**
 * CodeBuddy Skill 安装脚本
 * 将技能安装到用户的 ~/.codebuddy/skills 目录
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'skills-prd-generator';
const SKILL_DIR = path.join(os.homedir(), '.codebuddy', 'skills', SKILL_NAME);

function install() {
  console.log(`📦 Installing ${SKILL_NAME}...`);
  
  // 获取当前包目录
  const packageDir = path.dirname(fs.realpathSync(__filename));
  
  // 确保目标目录存在
  if (!fs.existsSync(SKILL_DIR)) {
    fs.mkdirSync(SKILL_DIR, { recursive: true });
  }
  
  // 复制文件
  const filesToCopy = ['SKILL.md', 'package.json', 'README.md'];
  const dirsToCopy = ['references'];
  
  filesToCopy.forEach(file => {
    const src = path.join(packageDir, file);
    const dest = path.join(SKILL_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  ✅ Copied ${file}`);
    }
  });
  
  dirsToCopy.forEach(dir => {
    const src = path.join(packageDir, dir);
    const dest = path.join(SKILL_DIR, dir);
    if (fs.existsSync(src) && fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(file => {
        fs.copyFileSync(path.join(src, file), path.join(dest, file));
        console.log(`  ✅ Copied ${dir}/${file}`);
      });
    }
  });
  
  console.log(`\n✨ ${SKILL_NAME} installed successfully!`);
  console.log(`📂 Location: ${SKILL_DIR}`);
}

install();
