<script lang="ts">
  import { pattern } from "../stores/pattern";
  import { game } from "../stores/gameScore";
  import { ordnett } from "../stores/ordnett";
  import { word } from "../stores/word";
  import { gameMessage } from "../stores/gameMessage";
  import { calculateWordPoints, isValidWord } from "../api/api";
  import { retriveData, storeData } from "../api/localstorage";

  export async function handleCheck() {
    if ($word.length <= 1) {
      gameMessage.newMessage("Trykk på bokstavene for å lage ord", "blue");
      return;
    }

    for (const letter of $word) {
      if (!$ordnett.includes(letter)) {
        gameMessage.newMessage(
          "Ordet inneholder bokstaver som ikke er i nettet",
          "red"
        );
        return;
      }
    }

    if ($word.length <= 3) {
      gameMessage.newMessage("Ordet er for kort", "red");
      return;
    }

    let isValid = await isValidWord($word.join("").toLowerCase());
    if (!isValid) {
      pattern.reset();
      word.reset();
      return;
    }

    game.update({
      score: $game.score + calculateWordPoints($word.join("")),
      words: [$word.join(""), ...$game.words],
    });
    storeData("my_words", [
      ...retriveData("my_words"),
      $word.join("").toLowerCase(),
    ]);

    gameMessage.newMessage(
      `Bra jobba +${calculateWordPoints($word.join(""))} poeng!`,
      "green"
    );

    word.reset();
    pattern.reset();
    parent.postMessage(`numWords:${$game.words.length}`, '*');
  }
</script>

<button class="check" on:click={() => handleCheck()}> Sjekk</button>

<style>
  .check {
    border: none;
    padding: 15px 32px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

    border: 1px solid grey;
    margin: 4px 2px;
    cursor: pointer;
    background-color: #ffffff;
    color: black;

    border-radius: 25px;

    font-weight: 600;
  }

  .check:active {
    border: 2px solid black;
  }
</style>
