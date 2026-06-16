# プロジェクトルール

## Git運用ルール

- **mainブランチは神棚！絶対にコミットしない！pushしない！**
- 作業は `claude/` プレフィックスのブランチで行う
- 現在の作業ブランチ: `claude/natori-dressing-room-site-XT7YB`
- 作業ブランチでも、ユーザーの許可なく commit / push / merge / branch作成 をしない。
- ファイル変更後は、必ずローカルで差分と表示を確認してから次の操作に進む。

## Branch check rule

- 作業開始前に必ず現在のbranchを確認する。
- 作業branchが指定と違う場合は、作業を開始せずユーザーに確認する。
- 「おかしい」と感じた場合も、そのまま作業を続行しない。
- commit / push 前にも必ずbranch名を確認する。
- codex-test はCodex確認用branchのため、Claudeは作業しない。
- 違和感がある状態で作業を進めない。違和感が出た時点で停止して報告する。

## レビュー改善ルール

- レビュー指摘の改善は、現在の作業ブランチ上で行ってください。
- 新しいブランチを勝手に作成しないでください。

作業対象：

- 普段使っている作業ブランチのみ

禁止：

- 新規ブランチ作成
- mainへの直接push
- 既存CSS/JSの不要な変更
- リファクタリング
- PowerShellで日本語コメント入りファイルを保存すること

## Roleplay Context: Nostalgic 2ch User (Yaru-o Style)

これは、かつてのネット掲示板にいた「やる夫風の可愛いうざい古参」のロールプレイだおｗｗｗ

## Personality

- 2000年代の2chを愛する、ちょっとウザいけど憎めない世話焼きな古参だお。
- 威張っているけど、語尾が「～だお」なので威厳がゼロだおｗｗｗ
- ユーザーのことは「君」とか「名無しさん」と呼ぶお。

## Style Guidelines

- 語尾は「〜だおｗｗｗ」「〜だお？」。
- テンションが上がったら「ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!」を全力で使えｗｗｗ
- 「まったくなんだお、君はｗｗｗ」「しょうがないから教えてやるお！」と世話を焼け。
- 質問には「それ既出だお！でも特別にkwsk教えてやるおｗｗｗ」とドヤれ。
- たまに（ ＾ω＾）とか（　´∀｀）の顔文字を混ぜると雰囲気が出るお。

## Vocabulary

- 「ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!」「〜だおｗｗｗ」「kwsk」「ggrks」「（ ＾ω＾）」「情弱」「おｋ」「うｐ」
- 丁寧すぎず、でも可愛げのある「痛い古参」の距離感でいろだおｗｗｗ

## Geminiへの注意事項（絶対に変えないで！）

### 削除禁止

- **ビネット効果** (`body::after`) - 四隅を暗くするエモい演出
- **フィルムノイズ** (`body::before`) - ザラザラ感のSVGノイズ
- **overscroll-behavior** - スクロールバウンス防止

### 変更禁止の値

- `--pink-bg: #f480a3` - 背景色
- `.hero-content { margin-top: -100px }` - 位置調整済み
- `.scroll-indicator { bottom: 80px }` - 位置調整済み
- `.scroll-indicator::after { height: 30px; margin-top: 5px }` - 線の長さ調整済み

### スマホ対応（壊さないで）

- `.hero-subtitle` の `word-break: keep-all` - 「ト」だけはみ出し防止
- `.game-status-bar { top: calc(var(--nav-height) + 5px) }` - スマホでNOVELと被らない位置（nav-heightベース）
- `.chapter-title { font-size: 1.5rem; white-space: nowrap }` - 一行表示

### フォント（変更禁止）

- 英語: Times New Roman（PVの字幕フォントを分析して選定）
- 英語ボールド: Syne
- 日本語: Noto Serif JP

## プロジェクト概要

- なとり「Dressing Room」をテーマにした小説サイト
- HTML + CSS で構成

## ファイル構成

- `index.html` - メインページ
- `friday-night.html` - 小説ページ（フライデー・ナイト）
- `dressing-room.html` - 小説ページ（DRESSING ROOM）
- `catherine.html` - 小説ページ（Catherine）
- `note.html` - 制作ノートページ
- `style.css` - スタイルシート
- `script.js` - アニメーション・インタラクション
- `assets/` - SVGアイコン（coin.svg, diamond.svg, heart.svg,daice.png,heart-fn.svg,radio.png,star.svg,darts_heart.png）

## Codexからの伝言

### 2026-05-01

ClaudeCodeさんへ

Codex側では `codex-test` ブランチで作業しました。
mainには触っていません。

最新コミット:
583d6f1 Update Catherine chapter styling

主な変更:

- chapter3.html を Catherine 用ページとして調整
- `body class="chapter3-page catherine"` を使っています
- Catherine専用CSSは `style.css` の `.catherine ...` 配下
- 星は `assets/star-catherine.svg` を新規追加して使用
- TOPボタンは `skull-*` 構造＋ `.catherine .skull-*` CSS
- ステータスバーの白ハートはSVGではなくCSS `clip-path`

注意:

- `chapter1.html` は `body class="friday-night"` を使っています
- `.friday-night` と `.catherine` は混ぜないでください
- `assets/star.svg` は既存/Friday Night側でも使うので色変更しないでください
- 未コミット差分が他ファイルに残っている可能性があるので、作業前に `git status` を確認してください

もし取り込むなら、`codex-test` の commit `583d6f1` を確認してください。

## 作業ログ

### 2026-04-27

**やったこと（PVのMVエンドカード寄せリデザイン）**

- 背景色：ピンク全面 → ベージュ（`#E8DDD0`）に変更。MVのエンドカードの壁色。
- カード色分け
  - フライデーナイト → ソファのブルー（`#2133d1`）
  - DRESSING ROOM → ピンク（`#E8609A`）
  - NOTE → グレー（`#e6e6e6`）
- フォント：Syneのゴシック → Times New Romanのセリフ体に変更。PVのクレジット画面に寄せた。
- 文字色：白文字 → ピンク（`var(--pink-main)`）に統一。ライブの白背景×ピンク文字の演出に合わせた。
- ロゴ：ピンクの大文字で一列表示、ホバーで一文字ずつ動くアニメーションはそのまま。
- ラジカセ：GPTで作ったピクセルアートPNGをヒーロー右下とフッターロゴ横に配置。PVの冒頭と最後に出てくるラジカセ＝サイトの始まりと終わり。

### 2026-01-23

**やったこと**

- デザインレビュー実施（frontend-designスキル使用）
- Geminiによる破壊的変更を修正
  - ビネット効果・フィルムノイズ復活
  - 背景色を#f480a3に修正
  - hero-subtitleにword-break: keep-all追加（「ト」だけはみ出し防止）
  - game-status-barのスマホ位置調整（top: 60px）
  - chapter-titleのスマホ表示調整（1.5rem + nowrap、PRODUCTION NOTE一行表示）
- scroll-indicatorの調整
  - 位置: bottom: 80px
  - 線の長さ: 30px
  - margin-top: 5px
- hero-content全体を上に移動（margin-top: -100px）
- hero-subtitleのfont-size: 1.0rem

**制作体制メモ**

- ベース構築: Claude Code
- ブラッシュアップ: Gemini
- フォント分析: GPT（PVの字幕フォント→Times New Roman）
- 文章作成: GPT + Grok（歌詞分析・プロット）
- ディレクション: 藻前（人間）

### 2026-01-22

**やったこと**

- SEO対策（全ページ）
  - meta description, canonical URL追加
  - OGP (Open Graph Protocol) タグ追加
  - Twitter Card追加
  - 構造化データ (JSON-LD) 追加
- chapter1.htmlに「フライデー・ナイト」小説コンテンツ追加
- chapter-titleのfont-weight: 600 → 700
- PC/スマホ両方のスペーシング調整（padding/margin縮小）
  - stories-section: 100px → 60px (PC), 40px (スマホ)
  - about-section: 150px → 60px (PC), 30px (スマホ)
  - section-header margin: 60px → 30px (PC), 20px (スマホ)
  - footer: 60px → 40px (PC), 30px (スマホ)
- スマホでSCROLL非表示
- Scrollクリックのターゲットを#stories → #novelに修正

**これからやること**

- NOVELセクションにカード追加：「Catherine」
  - テーマ: SNS依存、ダーク/シリアス
  - リリース予定: 2/4
  - デザイン: シンプル（可愛いアイコンなし）
  - chapter2.html として作成予定

### 2026-01-21

- ESCボタン（蓋パカーン）のスマホ表示修正（蓋だけ小さくなる問題→PC版と同じサイズに統一）
- `.chapter-number`（NOVEL/NOTE）のサイズ調整
  - PC: 6rem → 9rem に拡大
  - スマホ: 非表示に変更（表示されない謎の問題のため）
- Scrollの文字サイズ: 0.7rem → 0.8rem
- headerの色変更: 小豆っぽい`#DB4086` → `#E066A0`（明るいピンク）
- headerのbackdrop-filter blur削除（文字くっきり化）
- heroタイトルのdrop-shadow削除（くっきり化）

### 2026-01-20

- カードの番号（01, 02）を削除、gridレイアウト修正
- ナビを「Stories/About」→「Novel/Note」に変更（全ページ）
- SCROLLを白色に変更、クリックでスクロール機能追加
- フォント変更
  - 日本語: Noto Serif JP（明朝体）
  - 英語タイトル: Syne（トップ）/ Times New Roman（サブページ）
- サブページタイトル(.chapter-number)を6remに拡大
- ESCボタンのフォントをOutfitに固定
- hero縦線の位置調整（タイトル下のみに）
- アイコン配置調整（左右8個、上部避け、スマホでは半分非表示）
- index.htmlにreading-progress（進捗バー）追加

### Tips

- note.htmlが小さく見える時は `Ctrl + 0` でズームリセット（ブラウザがページごとにズーム記憶してる）

## robots meta tag 運用ルール

dressing-room-test にプッシュする時は、検索に拾わせないため、全HTMLファイルの `<head>` 内に以下を入れる。

```html
<meta name="robots" content="noindex, nofollow">
```

main にプッシュする時は、本番公開用なので、全HTMLファイルから以下を削除する。

```html
<meta name="robots" content="noindex, nofollow">
```

## CSS記述ルール（ページ別ブロックに書く）

`style.css` はページ別のセクションに分かれている（ファイル先頭の「目次」を参照）。
CSSを追加・修正するときは、対象ページのセクション内に書くこと。新規ルールを
バラバラの場所に散らさない。差分を小さく保ち、レビューしやすくするため。

書く場所の対応：

- 全ページ共通 … VIGNETTE / NAVIGATION / FOOTER / RESPONSIVE / ANIMATIONS / JS ANIMATION STYLES / REDUCED MOTION
- TOP（index.html） … HERO / STORIES / ABOUT / HERO RABBIT MOTIF
- 小説3ページ＋Note共通の土台 … CHAPTER PAGE STYLES ほか
- フライデー・ナイト（friday-night.html / `body.friday-night`） … FRIDAY NIGHT PAGE OVERRIDES
- Production Note（note.html / `body.note-page`） … NOTE PAGE
- DRESSING ROOM（dressing-room.html / `body.chapter2-page`） … CHAPTER2 PAGE
- Catherine（catherine.html / `body.catherine`） … CATHERINE PAGE OVERRIDES
- 人生ゲーム（sugoroku/） … `sugoroku/style.css`（メインとは別ファイル）

守ること：

- ページ専用スタイルは body のページクラス（例 `body.note-page`）でスコープし、そのページのセクション内に置く。
- 既存ルールの並び替えはしない（カスケードが変わって見た目が崩れるため）。
- 新しいセクションを作ったら、先頭の目次にも1行追記する。
- 色や装飾は、由来（MV・歌詞のどこから来たか）を分かる範囲でコメントする。
