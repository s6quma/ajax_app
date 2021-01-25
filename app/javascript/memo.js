function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // FormDataとは、フォームに入力された値を取得できるオブジェクト
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    // formDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    // 既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理の記述
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert (`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // formTextを取得する理由は、メモの入力フォームをリセットするため
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 「メモとして描画する部分のHTML」を定義
        list.insertAdjacentHTML("afterend", HTML);
        // メモの入力フォームに入力されたままの文字をリセットする（""で上書きしている）
        formText.value = "";
    };
    // 標準設定されている（Default）イベントを阻止する（prevent）メソッド(コントローラーのcreateアクションと、JavaScriptの処理が重複するのを防ぐため」」)
    e.preventDefault();
  });
}
window.addEventListener("load", memo);

