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
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

    border: 1px solid rgb(161, 161, 161);
    margin: 4px 2px;
    cursor: pointer;
    background-color: #ffffff;
    color: black;
    touch-action: manipulation;
    border-radius: 25px;

    font-weight: 600;
  }

  .check:active {
    border: 2px solid black;
  }
</style>
