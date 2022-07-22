<script type="ts">
  import { gameMessage } from "../../stores/gameMessage";
  import { fly } from "svelte/transition";
  import { game } from "../../stores/gameScore";

  let hint = "";

  const getHint = () => {
    let unusedWords = $game.solutions.filter((a) => !$game.words.includes(a));
    let word = unusedWords[Math.floor(Math.random() * unusedWords.length)];

    if (typeof word == "undefined") {
      gameMessage.newMessage("Du har jo funnet alle ordene ;)", "blue");
      return;
    }
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
    ><img alt="hint" class="img" src="lightbulb.svg" /></button
  >
  {#key hint}
    {#if hint}
      <p in:fly={{ y: -20 }} class="hint">Prøv: <b>{hint.toUpperCase()}</b></p>
    {/if}
  {/key}
</span>

<style>
  .hint {
    right: 0;

    width: 150px;
    padding: 7px 0px;
    border-radius: 5px;
    position: absolute;
    background-color: #f5f5f5;
    transform: translate(-35%, 0);
    left: 0;
  }

  .img {
    height: 22px;
    width: 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .check {
    border: none;
    position: relative;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width: 36px;
    height: 36px;

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
    background-color: yellow;
  }
</style>
