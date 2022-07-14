<script lang="ts">
  import { ordnett } from "../stores/ordnett";
  import { pattern } from "../stores/pattern";
  import { word } from "../stores/word";

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

</script>

<p>
  {#each $word as letter, i}
    <span class="letter" class:in={isLetterdColored(letter, i)}>{letter}</span>
  {/each}

  <span class="marker">
    {#if $word.length == 0}
      Lag så mange ord du klarer..
    {/if}
  </span>
</p>

<style type="scss">
  p {
    text-align: center;
    font-weight: 700;
    font-size: 1.1em;
    margin-top: 2rem;
    height: 36px;
    word-break: break-all; 
    padding: 5px;
    color: grey;
    max-width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;

    border-bottom: 2px solid black;

    @media screen and (max-width: 820px) {
      width: 250px;
      margin-top: 5d0px;
    }
  }

  .marker::before {
    content: "";
    margin-left: 0.1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    border-left: 2px solid rgb(0, 0, 0);
    animation: blink 1s linear infinite;
  }

  .letter {
    text-transform: uppercase;
    color: rgb(162, 162, 162);
    font-size: 1.9em;
  }

  .letter.in {
    color: rgb(0, 0, 0);
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.2;
    }
    30% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
</style>
