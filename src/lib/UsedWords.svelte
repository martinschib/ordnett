<script type="ts">
  import { retriveData } from "../api/localstorage";

  import { calculateWordPoints } from "../api/api";

  import { game, gameTag } from "../stores/gameScore";
  const scoreColors = ["green", "blue", "red", "yellow", "orange", "purple"];

  let activeSort = 0;

  let open = false;

  const sortWords = (type: 0 | 1 | 2) => {
    switch (type) {
      case 0:
        game.update({ words: retriveData("my_words") });
        activeSort = 0;
        return;
      case 1:
        game.update({ words: $game.words.sort() });
        activeSort = 1;
        return;
      case 2:
        game.update({ words: $game.words.sort((a, b) => b.length - a.length) });
        activeSort = 2;
        return;
    }
  };
</script>

<div class="container">
  {#if !open}
    <div class="closed">
      <h3 class="title">
        {$game.words.length} av {$game.solutions.length} ord
      </h3>
      <div class="dropdown">
        <div class="words">
          {#if $game.words.length === 0}
            <p style="margin: 0;"></p>
          {/if}
          {#each $game.words.length > 4 ? [...$game.words] : $game.words as word}
            <div class="word">
              {word.toUpperCase()} &nbsp;
              <span style="color:{scoreColors[calculateWordPoints(word) % 6]}"
                >+{calculateWordPoints(word)}</span
              >
            </div>
          {/each}
        </div>
        <button class="btn" on:click={() => (open = true)}> <img alt="pil ned" src="arrow_down.svg"></button>
      </div>
    </div>
  {:else}
    <div class="open">
      <div class="dropdown">
        <div class="header">
          <div>
            <h3 class="title">
              {$game.words.length} av {$game.solutions.length} ord
            </h3>
            <div class="sorting">
              <button
                class={activeSort === 0 && "active"}
                on:click={() => sortWords(0)}
              >
                Siste først
              </button>
              <button
                class={activeSort === 1 && "active"}
                on:click={() => sortWords(1)}
              >
                A-Å
              </button>
              <button
                class={activeSort === 2 && "active"}
                on:click={() => sortWords(2)}
              >
                Etter poeng
              </button>
            </div>
          </div>
          <button class="btn" on:click={() => (open = false)}> <img alt="pil opp" src="arrow_up.svg"> </button>
        </div>
        <div class="words">
          {#each $game.words as word}
            <div class="word">
              {word.toUpperCase()} &nbsp;
              <span style="color:{scoreColors[calculateWordPoints(word) % 6]}"
                >+{calculateWordPoints(word)}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="words" />
</div>

<style type="scss">
  .container {
    text-align: left;
    max-width: 350px;
    width: 100%;
    margin: 0px 0px;
    .open {
      .dropdown {
        background-color: #f5f5f5;
        border-radius: 10px;
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .title {
            margin: 0;
            margin-top: 10px;
            margin-left: 15px;
          }
          .btn {
            background-color: #f5f5f5;
            border-left: 4px solid white;
            border-bottom: 4px solid white;
            margin: 0;
            border-radius: 0px 10px 10px 0px;
          }
          .sorting {
      
            margin-left: 10px;
            display: flex;
            gap: 10px;
            margin-top: 10px;
            padding: 3px 5px;
            button {
              background-color: #f5f5f5;
              border: none;
              color: grey;
              padding: 2px 0;
              font-size: 14px;
              

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
        .words {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          overflow: hidden;
          padding: 15px;
          margin-top: 15px;
          gap: 10px;

          .word {
            display: flex;
            background-color: white;
            padding: 10px 16px;
            border-radius: 25px;
            font-size: 14px;
          }
        }
      }
    }

    .closed {
      .title {
        margin-bottom: 5px;
      }
      .dropdown {
        background-color: #f5f5f5;
        min-height: 50px;
        display: flex;
        border-radius: 10px;
        justify-content: space-between;
        .words {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          overflow: hidden;
          padding: 10px;
          
          gap: 10px;

          .word {
            display: flex;
            background-color: white;
            padding: 10px 16px;
            border-radius: 25px;
            font-size: 14px;
          }
        }
        .btn {
          background-color: #f5f5f5;
          border-left: 4px solid white;
          margin: 0;
          border-radius: 0px 10px 10px 0px;
        }
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
