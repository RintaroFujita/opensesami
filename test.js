const url = "http://os3-298-38954.vs.sakura.ne.jp/keycode/20/";

async function sendRequest(query) {
  try {
    const response = await fetch(`${url}${query}`);
    
    if (response.ok) {
      const result = await response.json();
      // ここで結果を処理する
      console.log(result);
      return result; // resultを返す
    } else {
      console.error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

async function main() {
  let collect = 0;
  let currentQuery = "";

  for (let queryDigit = 0; queryDigit < 20; queryDigit++) {
    for (let digit = 0; digit < 10; digit++) {
      let newQuery = currentQuery + digit;

      // ここでリクエストを送信
      const result = await sendRequest(newQuery);

      // 仮に結果が正しい場合、collectを更新
      if (result && result.correct) {
        collect++;
        currentQuery = newQuery;
        break; // collectが増えたら内側のループを抜ける
      }
    }

    // collectが20に達したらループを抜ける
    if (collect === 20) {
      break;
    }
  }

  if (collect !== 20) {
    console.error("Error: Collect did not reach 20.");
  } else {
    console.log("Final Query:", currentQuery);
  }
}

main();
