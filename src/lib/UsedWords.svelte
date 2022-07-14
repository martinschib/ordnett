<script type="ts">
import { retriveData } from "../api/localstorage";

  import { calculateWordPoints } from "../api/api";

  import { game } from "../stores/gameScore";
  const scoreColors = ["green", "blue", "red", "yellow", "orange", "purple"];

  let activeSort = 0

  const sortWords = (type: 0 | 1 | 2) => {

    switch(type) {
      case 0:
        game.update({words: retriveData("my_words")})
        activeSort = 0
        return
      case 1:
        game.update({words: $game.words.sort()})
        activeSort = 1
        return
      case 2:
        game.update({words: $game.words.sort((a, b) => b.length - a.length)})
        activeSort = 2
        return
    }
  }
  
</script>

<div class="container">
  <h3 class="titel">{$game.words.length} av {$game.solutions.length} ord</h3>
  <div class="sorting">
    <button class="{activeSort === 0 && 'active'}" on:click="{() => sortWords(0)}"> Siste først </button>
    <button class="{activeSort === 1 && 'active'}" on:click="{() => sortWords(1)}"> A-Å </button>
    <button class="{activeSort === 2 && 'active'}" on:click="{() => sortWords(2)}"> Etter poeng </button>
  </div>
  <div class="words">
    {#each $game.words as word}
      <div class="word">
        {word.replace(",", "").toLowerCase()}
        <span style="color:{scoreColors[calculateWordPoints(word) % 6]}"
          >+{calculateWordPoints(word)}</span
        >
      </div>
    {/each}
  </div>
</div>

<style type="scss">
  .container {
    text-align: left;
    padding: 40px 10px;
    margin-bottom: 30px;

    .titel {
      margin: 5px 0;
    }
    .sorting {
      display: flex;
      gap: 10px;
      padding: 5px 0;
      margin-bottom: 10px;
      button {
        background-color: white;
        border: none;
        color: grey;
        padding: 2px 0;

        &:hover {
          color: black;
        }
        &.active {
          border-bottom: 1px solid black;
          color: black;
        }
      }
    }
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    background-color: #e0e0e0;
    border-radius: 5px;
  }

  .words {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    max-width: 300px;
    font-size: 14px;
    .word {
      background-color: rgb(235, 235, 235);
      padding: 10px 16px;
      border-radius: 25px;
      .a {
        color: blue;
      }
    }
  }
  .btn {
    border: none;
    padding: 0px 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;

    font-size: 16px;
    margin: 4px 2px;

    cursor: pointer;
  }
</style>
