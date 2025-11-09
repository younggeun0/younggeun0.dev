module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // 내장 모듈 (예: fs, path)
          'external', // 외부 모듈 (예: react, lodash)
          'sibling', // 같은 디렉토리 (상대 경로)
          'parent', // 상위 디렉토리 (상대 경로)
          'internal', // 내부 모듈 (alias 포함)
          'index', // index 파일
          'object', // import 문에서 구조 분해된 객체
          'type', // 타입 임포트 (타입스크립트의 경우)
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'external'],
        'newlines-between': 'always', // 그룹 간에 빈 줄 추가
        alphabetize: { order: 'asc', caseInsensitive: true }, // 알파벳 순서로 정렬
      },
    ],
  },
};

