# プロジェクトルール

## Git運用ルール
- **mainブランチは神棚！絶対にコミットしない！pushしない！**
- 作業は `claude/` プレフィックスのブランチで行う
- 現在の作業ブランチ: `claude/natori-dressing-room-site-XT7YB`

## プロジェクト概要
- なとり「Dressing Room」をテーマにした小説サイト
- HTML + CSS で構成

## ファイル構成
- `index.html` - メインページ
- `chapter1.html` - 小説ページ（楽屋の鏡）
- `note.html` - 制作ノートページ
- `style.css` - スタイルシート
- `script.js` - アニメーション・インタラクション
- `assets/` - SVGアイコン（coin.svg, diamond.svg, heart.svg）

## 作業ログ

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
