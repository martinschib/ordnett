<script lang="ts">
  import { word } from "../stores/word";

  import { pattern } from "../stores/pattern";
  import { ordnett } from "../stores/ordnett";

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());

  $: isLetterdColored = (letter: string, i: number) => {
    if (!isLetterInNett(letter)) return false;

    let count = $word.filter((value) => value === letter).length;
    if (count === 1) return true;

    let firstIndex = $word.indexOf(letter);
    if (i === firstIndex) return true;

    return false;
  };

  function handleRemove() {
    if (
      isLetterdColored($word[$word.length - 1], $word.length - 1) &&
      $word.length - 1 > -1
    ) {
      pattern.removeLast();
    }
    word.removeLast();
  }
</script>

<button class="check" on:click={() => handleRemove()}>Fjern </button>

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
    touch-action: manipulation;

  }

  .check:active {
    background-color: #c5c3c3;
  }
</style>
