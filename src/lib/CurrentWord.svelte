<script lang="ts">
  import { ordnett } from "../stores/ordnett";
  import { newWord } from "../stores/word";

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());
</script>

<div class="container">
  <p>
    {#each $newWord as letter, i}
      <span
        class="letter"
        class:not={!letter.typed}
        class:in={isLetterInNett(letter.letter)}>{letter.letter}</span
      >
    {/each}
    <span class="marker" />
    {#if $newWord.length == 0}
      
      Lag ord ved å trykke eller skrive..
    {/if}
  </p>
</div>

<style type="scss">
  .container {
    margin-top: 25px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgb(53, 53, 53);
    min-width: 300px;
    max-width: 450px;
    font-size: large;
      
    p {
      word-break: break-all;
      font-family: Graphik;
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
    color: rgb(0, 0, 0);
    font-size: 1em;
    font-family: Graphik;
  }

  .letter.in {
    color: rgb(0, 0, 0);
    background-color: #bfe069;

    margin: 0 4px;
    padding: 6px 12px;
    border-radius: 7px;
  }

  .letter.not {
    background-color: #ff9900;
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
