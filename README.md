# 위키북스 60초 브랜드 인트로 (Remotion)

위키북스(wikibook.co.kr)를 처음 접하는 독자를 위한 **60초 모션 그래픽 브랜드 영상**입니다.
Remotion(React 기반) 으로 제작했습니다.

| 항목 | 값 |
|------|-----|
| 길이 | 60.0초 (1,800 프레임) |
| 해상도 | 1920×1080 (30fps) |
| 결과물 | `out/wikibook-intro.mp4` |
| 장면 수 | 7 |

## 문서

- **[SCRIPT.md](./SCRIPT.md)** — 핵심 메시지 · 내레이션 대본 · 장면 구성 · 자산 활용 고지
- **[SOURCES.md](./SOURCES.md)** — 사용한 모든 사실의 출처

## 재생/재제작

```bash
npm install

# 미리보기 스튜디오
npm start

# 렌더 (이 환경에서는 Remotion 기본 브라우저 다운로드가 차단되어
#       시스템 Chromium 경로를 --browser-executable 로 지정)
npx remotion render WikibookIntro out/wikibook-intro.mp4 \
  --browser-executable=/path/to/chrome-or-headless_shell
```

## 실제 로고·표지 이미지로 교체하려면

이 작업 환경은 네트워크 정책상 `wikibook.co.kr` 접근이 차단되어
실제 로고/표지 이미지를 내려받지 못했습니다. 교체하려면:

1. egress allowlist 에 `wikibook.co.kr` 추가
2. 로고/표지 이미지를 `public/` 에 저장
3. `src/components.tsx` 의 `Logo`, `BookCover` 를 `<Img src={staticFile(...)}/>` 로 교체
