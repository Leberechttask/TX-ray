TX-ray
====
## 対象・使用目的
* 撮り鉄の人(どちらの方向からどの種の列車が来るか視覚的にわかるので撮りやすい)  
* 電車の位置がわかる(例えば、〇〇時〇〇分の電車に乗った人がどの区間にいるか、まだ電車に乗っているかなど)
## 実装項目
### Web
🌸 toppageとシステム画面を用意  
　→cgiからjsに切り替えた  
🌸 システム画面に設定ボタンを配置  
🌸 設定モーダルから入力情報の読み取り(JSの変数に格納)  
🌸 サンプルデータでのCSVの読み取り(JSの配列に格納)
🌸 時刻入力から時間帯入力への変更
🌸 休日平日判定を行い、対応したCSVファイルの取得
🌸 取得した入力時刻(String型)のData型への変換

### canvas
🌸 canvasでの路線図表示  
🌸 canvasでの時間による電車表示  
🌸 作成したcanvasプログラムの表示(上手く動かない問題解決)

### table
🌸 データの取り出し  
→提案1: jQueryのload関数でtable要素取り出し  
https://www.plusdesign.co.jp/blog/?p=4832  
→提案2: tableの各要素の取り出し(配列格納)  
http://write-remember.com/program/javascript/get_table/  
🌸 取り出したデータをCSVに変換  
  
## 未実装
### Web
* Complete!

### canvas
* 車種ごとの表示  
* 入力情報と取り出したデータの条件比較  

### table
* Complete!  
