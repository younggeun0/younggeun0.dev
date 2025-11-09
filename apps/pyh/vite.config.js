import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// tsconfig.json의 extends를 해결하여 전체 설정을 로드
function loadTsConfig() {
  const tsconfigPath = resolve(__dirname, 'tsconfig.json');
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  
  // extends가 있으면 확장된 설정을 반환
  if (tsconfig.extends) {
    const baseConfigPath = resolve(__dirname, tsconfig.extends);
    const baseConfig = JSON.parse(readFileSync(baseConfigPath, 'utf-8'));
    
    // baseConfig와 tsconfig를 병합
    return {
      ...baseConfig,
      compilerOptions: {
        ...baseConfig.compilerOptions,
        ...tsconfig.compilerOptions,
      },
      include: tsconfig.include || baseConfig.include,
      exclude: tsconfig.exclude || baseConfig.exclude,
    };
  }
  
  return tsconfig;
}

const tsconfig = loadTsConfig();

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
      },
    },
    esbuild: {
      // esbuild에 TypeScript 설정 전달 (extends 해결된 버전)
      tsconfigRaw: {
        compilerOptions: {
          ...tsconfig.compilerOptions,
          // esbuild는 일부 옵션만 지원하므로 필요한 것만 전달
          target: tsconfig.compilerOptions.target || 'es2016',
          jsx: tsconfig.compilerOptions.jsx || 'preserve',
          module: tsconfig.compilerOptions.module || 'esnext',
          moduleResolution: tsconfig.compilerOptions.moduleResolution || 'node',
        },
      },
    },
  };
});
