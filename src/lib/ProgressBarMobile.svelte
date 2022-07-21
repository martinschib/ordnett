<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import {
    game,
    gameScorePercentage1,
    gameScorePercentageReal,
    gameTag,
    pointFunction,
  } from "../stores/gameScore";
  import Starbtn from "./starbtn.svelte";

  const progress = tweened($game.score, {
    duration: 400,
    easing: cubicOut,
  });

  game.subscribe((data) => {
    progress.set(data.score);
  });
</script>

<div class="progress-bar-container">
  <div class="row">
    <Starbtn />
    <div class="full">
      <div name="text" class="progress-text">
        <p>{$game.score} poeng</p>
        <p>{$game.maxScore} poeng</p>
      </div>
      <div
        class="progress-bar"
        style="--progress-width: {$gameScorePercentage1}%;"
      >
        <span class="progress" style="background-color: {$gameTag.color};" />
      </div>
    </div>
  </div>
</div>

<style type="scss">
  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }
  .full {
    width: 100%;

    .progress-text {
      padding: 3px 10px;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;

      p {
        margin: 3px 0px;
        font-weight: bold;
      }
    }
  }
  .progress-bar-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    padding-top: 12px;
    max-width: 400px;
  }
  .progress-bar {
    position: relative;
    height: 12px;
    width: 100%;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);

  }

  .progress {
    display: flex;
    width: var(--progress-width);
    height: 100%;
    background: #b4da55;
    border-radius: 15px;
  }
</style>
