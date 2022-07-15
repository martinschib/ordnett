<script type="ts">
  import { game } from "../../stores/gameScore";

  let hint = "";

  const getHint = () => {
    let unusedWords = $game.solutions.filter((a) => !$game.words.includes(a))
    let word = unusedWords[Math.floor(Math.random() * unusedWords.length)]

    if (word.length >= 6) {
      hint =
        word[0] + word[1] + "*".repeat(word.length - 3) + word[word.length - 1];
      return;
    } else {
      hint = word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
      return;
    }
  };
</script>

<span style="position: relative;">
  <button on:click={() => getHint()} class="check"
    ><i class="fa-regular fa-lightbulb fa-lg" /></button
  >
  {#if hint}
    <p class="hint">Hint: {hint}</p>
  {/if}
</span>

<style>
  .hint {
    position: absolute;
    font-weight: 600;
    right: 0;
    white-space: nowrap;
  }

  .check {
    border: none;
    padding: 6px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width: 30px;
    height: 30px;

    border: 1px solid rgb(181, 181, 181);
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
