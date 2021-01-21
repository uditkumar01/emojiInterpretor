import React, { useState } from "react";
import "./styles.css";

// like counter begin
// export default function App() {
//   const [likeCount, setLikeCount] = useState(0);
//   var likeUpdater = () => {
//     setLikeCount(likeCount+1);
//   }
//   return (
//     <div className="App">
//       <h1>Like Here</h1>
//       <button onClick = {likeUpdater}>like</button>
//       <span style={{background:"red",color:'white',padding: "0.2rem 0.4rem",borderRadius:"50%",margin:"1rem"}}>{likeCount}</span>
//     </div>
//   );
// }

//like counter end

// VISER : View => Interact => State change using event Handler => Render
const emoji = require("emoji-dictionary");
// used emoji-dictonary instead pf dict
const emojiDict = {
  "😀": "grinning face",
  "😁": "smiling face",
  "😊": "blush"
};
const emojiList = Object.keys(emojiDict);
export default function App() {
  const [updateEmoji, setUpdateEmoji] = useState([]);
  function getAllEmojiList(emojis) {
    var arr = emojis.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    var ans = [];
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i];
      if (c) {
        try {
          var z = emoji.getName(c).replace("_", " ").toUpperCase();
          // var len = z.length;
          // ans = ans + c + " : " + z + "\n";
          ans.push([c, z]);
        } catch {
          // ans = ans + c + " : Invalid emoji\n";
          ans.push([c, "Invalid Value"]);
        }
      }
    }
    return ans;
  }
  const emojiWeKnowType = (emoji) => {
    setUpdateEmoji(getAllEmojiList(emoji));
  };
  const getEmojiType = (event) => {
    var type = event.target.value;
    if (type) {
      console.log(getAllEmojiList(type));
      setUpdateEmoji(getAllEmojiList(type));
    } else {
      setUpdateEmoji([]);
    }
  };
  function getBg(item) {
    if (item === "Invalid Value") {
      return "white";
    }
    return "#706fd3";
  }
  function getFg(item) {
    if (item === "Invalid Value") {
      return "black";
    }
    return "#fff";
  }
  const getEmojiCheck = () => {
    if (updateEmoji.length !== 0) {
      return "";
    }
    return "none";
  };

  return (
    <div className="App">
      <h1>Inside Outtt:</h1>
      <input type="text" onChange={getEmojiType} />
      <br />
      <br />

      <div className="table-div">
        <h3>emojis we know</h3>
      </div>
      <div className="table-div">
        {emojiList.map((emoji) => {
          return (
            <span
              onClick={() => emojiWeKnowType(emoji)}
              style={{ padding: "0.5rem", fontSize: "2rem", cursor: "pointer" }}
            >
              {emoji}
            </span>
          );
        })}
      </div>
      <div className="table-div">
        <table>
          <thead>
            <tr style={{ display: getEmojiCheck() }}>
              <th>Emoji</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {updateEmoji.map((item) => {
              console.log(item);
              return (
                <tr
                  style={{ background: getBg(item[1]), color: getFg(item[1]) }}
                >
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
