<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { game, gameScorePercentage1, gameTag } from "../stores/gameScore";
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
    <div class="star">
      <Starbtn />
    </div>
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
  .star {
    transform: translate(0, 15px);
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }
  .full {
    flex-grow: 1;
    .progress-text {
      padding: 3px 2px;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;

      p {
        margin: 3px 0px;
        font-family: Product;
      }
    }
  }
  .progress-bar-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    padding-top: 12px;
    max-width: 350px;
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
