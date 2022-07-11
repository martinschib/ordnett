<script lang="ts">
  import { pattern } from "../stores/pattern";
  import { game } from "../stores/gameScore";
  import { ordnett } from "../stores/ordnett";
  import { word } from "../stores/word";
  import { gameMessage } from "../stores/gameMessage";
  import { checkWord } from "../api/api";

  async function handleCheck() {
    const newWord = $pattern.map((value) => $ordnett[value]).join("");

    if (newWord.length <= 1) {
      gameMessage.newMessage("Trykk på bokstavene for å lage ord", "blue");
      return;
    }
    if (newWord.length <= 3) {
      gameMessage.newMessage("Ordet er for kort", "black");
      return;
    }

    let response = await checkWord(newWord);
    if (!response) {
      gameMessage.newMessage("Ops! Her har det skjedd noe galt..", "red");
      return;
    }

    if (!response.leaderBoard) {
      gameMessage.newMessage(response.message, "blue");
      word.reset();
      pattern.reset();
      return;
    }
    if (response.user_id) {
      document.cookie = `ordnett_userid=${response.user_id}`;
    }
    game.addWord(newWord);
    game.update({score: response.score, leaderboard: response.leaderBoard, numPlayers: response.num_players})
    gameMessage.newMessage(response.message, "green");

    word.reset();
    pattern.reset();
  }
</script>

<button class="check" on:click={() => handleCheck()}> Sjekk</button>

<style>
  .check {
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    background-color: #e7e7e7;
    color: black;
    border-radius: 5px;
  }

  .check:active {
    background-color: #c5c3c3;
  }
</style>
