<script lang="ts">
  import { pattern } from "../stores/pattern";
  import { ordnett } from "../stores/ordnett";
  import { newWord } from "../stores/word";
  import { fade } from "svelte/transition";

  let items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

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
  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());


  function toggleItem(item) {
    if ($pattern.includes(item.id)) {
      if ($pattern[$pattern.length - 1] === item.id && $pattern.filter(i => item.id === i).length === 1) {
        pattern.add(item.id);
        newWord.add({letter: $ordnett[item.id], typed: true});
      } else {
        const lastPattern = $pattern.indexOf(item.id)
        pattern.set([...$pattern.splice(0, lastPattern)])
        const lastWord = $newWord.map(v => v.letter).indexOf($ordnett[item.id])
        newWord.set([...$newWord.splice(0, lastWord)])
       
        if ($newWord.length > 0 && isLetterInNett($newWord.map(v=> v.letter)[$newWord.length - 1]) && $newWord.map(v=> !v.typed)[$newWord.length - 1]) {
          pattern.removeLast();
          newWord.removeLast();
        }
      }
    } else {
      getItemBetweenNextItem(item).forEach((newItem) => {
        if (item.id !== newItem.id && !$pattern.includes(newItem.id)) {
          pattern.add(newItem.id);
          newWord.add({letter: $ordnett[newItem.id], typed: false});
        }
      });
      pattern.add(item.id);
      newWord.add({letter: $ordnett[item.id], typed: true});
    }
  }

  $: isSelected = (item) => $pattern.includes(item.id);

  $: isMultiple = (item) => $pattern.filter(i => i === item.id).length > 1

  $: isTyped = (letter) => !!$newWord.filter(item => item.letter == letter)[0] ? $newWord.filter(item => item.letter == letter)[0].typed : true
  

  $: getSirclePosition = (index: number) => {
    let col = index % 3;
    let row = Math.floor(index / 3);
    let boxSideLength = document.getElementById("container").clientWidth;
    return {
      x:
        (400 / 3) * col +
        58 +
        (boxSideLength != 350 && -1 * col * 16 - 8) -
        col * 18,
      y:
        (400 / 3) * row +
        58 +
        (boxSideLength != 350 && -1 * row * 16 - 8) -
        row * 16,
    };
  };
</script>

<div class="container" id="container">
  <svg class="svg-container">
    {#each $pattern as value, i}
      {#if $pattern.length > 1 && i >= 1}
        <line
          x1={getSirclePosition($pattern[i - 1]).x}
          y1={getSirclePosition($pattern[i - 1]).y}
          x2={getSirclePosition($pattern[i]).x}
          y2={getSirclePosition($pattern[i]).y}
          class="lines"
          out:fade={{ duration: 70 }}
        />
      {/if}
    {/each}
  </svg>
  <div class="items">
    {#each items as item}
      <div class="item">
        {#if isMultiple(item) }
        <div class="outer">
        </div>
        {/if}
        <button
          class="sircle"
          class:on={isSelected(item)}
          class:not={!isTyped($ordnett[item.id])}
          on:click={() => toggleItem(item)}>{$ordnett[item.id]}</button
        >
      </div>
    {/each}
  </div>
</div>

<style type="scss">
  .svg-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  
  }

  .lines {
    stroke: #bfe069;
    stroke-width: 4px;

  }

  .container {
    position: relative;
    align-content: center;
    display: inline-block;
    width: 350px;
  }
  .items {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);

    width: 350px;
    height: 350px;
  }

  @media screen and (max-width: 400px) {
    .container {
      width: 300px;
      height: 300px;
    }
    .items {
      width: 100%;
      height: 100%;
    }
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    .outer {
      background-color: white;
      border: #bfe069 solid 4px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      position: absolute;
      z-index: 0;
    }
  }

  .sircle.on {
    border: 4px solid #bfe069;
  }

  .sircle.not {
    border: 4px solid #74A2F8;
    z-index: -1;
  }

  .sircle {
    z-index: 3;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    border: 1px solid rgb(232, 232, 232);
    font-size: x-large;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 40px;
    touch-action: manipulation;
    color: black;
    font-family: Graphik;
    font-weight: 600;


    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }

  .sircle:hover {
    border: 2px solid brgb(70, 147, 136);
  }
</style>
