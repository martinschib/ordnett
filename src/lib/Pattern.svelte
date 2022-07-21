<script lang="ts">
  import { pattern } from "../stores/pattern";
  import { ordnett } from "../stores/ordnett";
  import { word } from "../stores/word";
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

  function toggleItem(item) {
    if ($pattern.includes(item.id)) {
      if ($pattern[$pattern.length - 1] === item.id && $pattern.filter(i => item.id === i).length === 1) {
        pattern.add(item.id);
        word.add($ordnett[item.id]);
      } else {
        const lastPattern = $pattern.indexOf(item.id)
        pattern.set([...$pattern.splice(0, lastPattern)])
        const lastWord = $word.indexOf($ordnett[item.id])
        word.set([...$word.splice(0, lastWord)])
      }
    } else {
      getItemBetweenNextItem(item).forEach((newItem) => {
        if (item.id !== newItem.id && !$pattern.includes(newItem.id)) {
          pattern.add(newItem.id);
          word.add($ordnett[newItem.id]);
        }
      });
      pattern.add(item.id);
      word.add($ordnett[item.id]);
    }
  }

  $: isSelected = (item) => $pattern.includes(item.id);

  $: isMultiple = (item) => $pattern.filter(i => i === item.id).length > 1

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
          style="border-width: 3px;"
          class="sircle"
          class:on={isSelected(item)}
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
      border: #bfe069 solid 3px;
      width: 85px;
      height: 85px;
      border-radius: 50%;
      position: absolute;
    }
  }

  .sircle.on {
    border: 60px solid #bfe069;
  }

  .sircle {
    z-index: 100;
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


    box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
  }

  .sircle:hover {
    border: 2px solid brgb(70, 147, 136);
  }
</style>
