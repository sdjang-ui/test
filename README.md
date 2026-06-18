# 출판사 60초 브랜드 인트로 (Remotion)

출판사를 처음 접하는 독자를 위한 **60초 모션 그래픽 브랜드 영상** 모음입니다.
Remotion(React 기반)으로 제작했습니다. 두 개의 컴포지션이 들어 있습니다.

| 컴포지션 ID | 대상 | 결과물 | 장면 | 비고 |
|-------------|------|--------|------|------|
| `WikibookIntro` | 위키북스 (wikibook.co.kr) | `out/wikibook-intro.mp4` | 7 | 풍부한 검증 자료 기반 |
| `ShiftIntro` | 도서출판 시프트 (shiftbook) | `out/shift-intro.mp4` | 8 | 사이트 접근 차단 → 검증된 최소 정보 + 자막 나레이션 |
| `DabanIntro` | 다반 (davanbook) | `out/daban-intro.mp4` | 8 | 사이트 접근 차단 → 검증된 최소 정보(에세이·예술·디페랑스) + 자막 나레이션 |
| `RuachIntro` | 루아크 (ruachbook) | `out/ruach-intro.mp4` | 11 | 사이트 차단 → 검증 도서 『경성의 건축가들』(2017) 기반 + 자막 나레이션 |
| `MytomoIntro` | 내친구의서재 (mytomobook) | `out/mytomo-intro.mp4` | 11 | 사이트 차단 → 추리·미스터리 전문, 검증 도서 2종 기반 + 자막 나레이션 |
| `JungwonIntro` | 공중정원 (북 커버 디자이너) | `out/jungwon-intro.mp4` | 11 | 포트폴리오 차단·표지 미확인 → 커버 디자인 '작업(craft)' 중심 + 목업(자막 나레이션) |

모두 60.0초 · 1920×1080 · 30fps.

## 문서

**위키북스**
- **[SCRIPT.md](./SCRIPT.md)** — 메시지 · 내레이션 · 장면 · 자산 고지
- **[SOURCES.md](./SOURCES.md)** — 출처

**도서출판 시프트**
- **[SHIFT_SCRIPT.md](./SHIFT_SCRIPT.md)** — 메시지 · 자막 나레이션 · 장면 · 제작 전제
- **[SHIFT_SOURCES.md](./SHIFT_SOURCES.md)** — 출처 및 제약

**다반 (Daban)**
- **[DABAN_SCRIPT.md](./DABAN_SCRIPT.md)** — 메시지 · 자막 나레이션 · 장면 · 제작 전제
- **[DABAN_SOURCES.md](./DABAN_SOURCES.md)** — 출처 및 제약

**루아크 (Ruach)**
- **[RUACH_SCRIPT.md](./RUACH_SCRIPT.md)** — 메시지 · 자막 나레이션 · 장면 · 제작 전제
- **[RUACH_SOURCES.md](./RUACH_SOURCES.md)** — 출처 및 제약

**내친구의서재 (mytomobook)**
- **[MYTOMO_SCRIPT.md](./MYTOMO_SCRIPT.md)** — 메시지 · 자막 나레이션 · 장면 · 제작 전제
- **[MYTOMO_SOURCES.md](./MYTOMO_SOURCES.md)** — 출처 및 제약

**공중정원 (북 커버 디자이너)**
- **[JUNGWON_SCRIPT.md](./JUNGWON_SCRIPT.md)** — 메시지 · 자막 나레이션 · 장면 · 제작 전제
- **[JUNGWON_SOURCES.md](./JUNGWON_SOURCES.md)** — 출처 및 제약 (표지 미확인 고지)
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
