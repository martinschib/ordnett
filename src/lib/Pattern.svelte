<script lang="ts">
  import { pattern } from "../stores/pattern";
  import { ordnett } from "../stores/ordnett";
  import { word } from "../stores/word";
  import { fade } from 'svelte/transition';
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


  function toggleItem(item) {
    const index = $pattern.findIndex((id) => id === item.id);
    // if the circle is in the pattern
    if (index > -1) {
      pattern.set($pattern.splice(0, index));
      word.set($word.splice(0, $word.indexOf($ordnett[item.id])))
      // id the sircle is not in the pattern
    } else {
      getItemBetweenNextItem(item).forEach((newItem) => {
        if (!$pattern.includes(newItem.id)) {
          pattern.add(newItem.id);
          word.add($ordnett[newItem.id])
        }
      });
      if (!$pattern.includes(item.id)) {
        pattern.add(item.id);
        word.add($ordnett[item.id])
      }
    }
  }

  $: isSelected = (item) => $pattern.includes(item.id);

  $: getSirclePosition = (index: number) => {
    let col = index % 3;
    let row = Math.floor(index / 3);
    let boxSideLength = document.getElementById("container").clientWidth
    return { x: (400 / 3) * col + 58 + (boxSideLength!=350 && -col * 12) - col * 18, y: (400 / 3) * row + 58 + (boxSideLength!=350 && - row * 12) - row * 16 };
  };
</script>

<div class="container" id="container">
  <svg class="svg-container">
    {#each $pattern as value, i}
      {#if $pattern.length > 1 && i >= 1}
        <line
          stroke-dasharray="10, 5"
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
        <button
          class="sircle"
          class:on={isSelected(item)}
          on:click={() => toggleItem(item)}>{$ordnett[item.id]}</button
        >
      </div>
    {/each}
  </div>

		  
</div>

<style>

  .svg-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  .lines {
    stroke:rgb(36, 38, 97);
    stroke-width:10;
    stroke-width: 6px;
  } 

  .container {
    position: relative;
    align-content: center;
    display: inline-block;

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
      width: 86vw;
      height: 86vw;
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
  }

  .sircle.on {
    color: white;
    background-color: rgb(139, 205, 89);
    border: 1px solid rgb(194, 194, 194);
  }

  .sircle {
    z-index: 100;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    border: 1px solid rgb(232, 232, 232);
    font-size: x-large;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    touch-action: manipulation;


    font-weight: bold;

    box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
  }

  .sircle:hover {
    border: 2px dashed black;
  }
</style>
