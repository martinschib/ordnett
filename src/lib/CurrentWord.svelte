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

  function getItemBetweenNextItem(item) {
    if ($pattern.length === 0) return [];

    let colTo = item.id % 3;
    let rowTo = Math.floor(item.id / 3);

    let colFrom = $pattern[$pattern.length - 1] % 3;
    let rowFrom = Math.floor($pattern[$pattern.length - 1] / 3);

    if (Math.abs(colFrom - colTo) === 1 || Math.abs(rowFrom - rowTo) === 1)
      return [];

    return [{ id: (item.id + $pattern[$pattern.length - 1]) / 2 }];
  }

  function handleKeydown(event) {
    // backspace
    if (event.keyCode == 8 && $word.length - 1 > -1) {
      if (isLetterdColored($word[$word.length - 1], $word.length - 1)) {
        pattern.removeLast();
        word.removeLast();
      } else {
        word.removeLast();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.keyCode === 186 ||
      event.keyCode === 222 ||
      event.keyCode === 219
    ) {
      if (!isLetterInNett(event.key)) {
        word.add(event.key.toUpperCase());
      }

      if (isLetterInNett(event.key)) {
        let letterIndex = $ordnett
          .split("")
          .map((item, i) => {
            if ($pattern.includes(i)) return "*";
            else return item;
          })
          .indexOf(event.key.toUpperCase());

        if (letterIndex > -1 && !$pattern.includes(letterIndex)) {
          getItemBetweenNextItem({ id: letterIndex }).forEach((newItem) => {
            if (!$pattern.includes(newItem.id)) {
              pattern.add(newItem.id);
              word.add($ordnett[newItem.id]);
            }
          });
          if (!$pattern.includes(letterIndex)) {
            pattern.add(letterIndex);
            word.add($ordnett[letterIndex]);
          }
        } else {
          word.add(event.key.toUpperCase());
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

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

<style>
  p {
    text-align: center;
    font-weight: 700;
    font-size: 1.1em;
    margin-top: 2rem;

    height: 30px;
    padding: 5px;
    color: grey;
    max-width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .marker::before {
    content: "";
    margin-left: 0.1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    border-left: 2px solid rgb(224, 6, 6);
    animation: blink 1s linear infinite;
  }

  .letter {
    text-transform: uppercase;
    color: rgb(68, 68, 68);
    font-size: 1.5em;

  }

  .letter.in {
    color: rgb(56, 152, 58);
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
