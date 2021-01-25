function check() {
  const posts =  document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click",()=>{
      // getAttributeで属性値を取得することができるので、メモのidを取得することができる
      const postId = post.getAttribute("data-id");
      // エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行うためにオブジェクトの生成をする
      const XHR = new XMLHttpRequest();
      // openとは、XMLHttpRequestで定義されているメソッドで、どのようなリクエストをするのかを指定することができる(HTTPメソッドの指定,パスの指定,非同期通信のON/OFF)
      XHR.open("GET",`/posts/${postId}`, true);
      // responseTypeは、XMLHttpRequestで定義されているメソッドで、レスポンスで欲しい情報の形式を指定するメソッド
      XHR.responseType = "json";
      // sendとは、XMLHttpRequestで定義されているメソッドで、リクエストをサーバーサイドへ送信する
      XHR.send();
      // onloadとは、XMLHttpRequestで定義されているプロパティで、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      XHR.onload = () => {
      // statusメソッドを用いて、レスポンスがエラーだった場合の処理の記述
      //return null;の記述でJavaScriptの処理から抜け出すことができる
        if (XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check","true");
        } else if (item.checked === false){
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
//setIntervalメソッドとは、一定の間隔（時間）ごとに指定した関数などを実行できるnoメソッド(addEventListenerの（いつ）を指定できるようなもの、これを扱うためには、４−７行目の記述が必要)
setInterval(check, 1000);