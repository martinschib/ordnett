<script lang="ts">
  import { ordnett } from "../stores/ordnett";
  import { word } from "../stores/word";

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());
</script>

<p>
  {#each $word as letter, i}
    <span class="letter" class:in={isLetterInNett(letter)}>{letter}</span>
  {/each}

  {#if $word.length == 0}
    <span class="marker" />
    Lag så mange ord du klarer..
  {/if}
</p>

<style type="scss">
  p {
    text-align: center;
    font-weight: 700;
    font-size: 1.3em;
    margin-top: 40px;
    margin-bottom: 30px;
    padding: 15px 0px;
    word-break: break-all;
  

    color: grey;
    max-width: 500px;
    min-width: 300px;

    display: block;
    margin-left: auto;
    margin-right: auto;

    border-bottom: 2px solid black;

    @media screen and (max-width: 820px) {
      width: 100%;
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
    font-size: 1em;
  }

  .letter.in {
    color: rgb(0, 0, 0);
    background-color: #bfe069;
    color: white;

    margin: 0 4px;
    padding: 6px 12px;
    border-radius: 7px;
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
