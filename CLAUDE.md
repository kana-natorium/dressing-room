# プロジェクトルール

## Git運用ルール
- **mainブランチは神棚！絶対にコミットしない！pushしない！**
- 作業は `claude/` プレフィックスのブランチで行う
- 現在の作業ブランチ: `claude/natori-dressing-room-site-XT7YB`

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
- `.game-status-bar { top: 60px }` - NOVELと被らない位置
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
- `chapter1.html` - 小説ページ（フライデー・ナイト）
- `note.html` - 制作ノートページ
- `style.css` - スタイルシート
- `script.js` - アニメーション・インタラクション
- `assets/` - SVGアイコン（coin.svg, diamond.svg, heart.svg）

## 作業ログ

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
