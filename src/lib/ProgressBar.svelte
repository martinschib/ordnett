<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { game, gameScorePercentage } from "../stores/gameScore";

  const progress = tweened($game.score, {
    duration: 400,
    easing: cubicOut,
  });

  game.subscribe((v) => {
    progress.set($game.score);
  });
  
</script>

<div class="progress-bar-container">
  <div class="row">
    <span>{$game.score} poeng</span>
    <span>{$game.maxScore} peong</span>
  </div>
  <div class="progress-bar"  style="--progress-width: {$gameScorePercentage}%">
    <span class="progress"></span>
  </div>
  <div class="row">
    <span class="ord">{$game.words.length} ord</span>
    <span class="ord">{$game.maxWords} ord</span>
  </div>
</div>

<style>

  .progress-bar-container {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    padding-top: 24px;
    padding-bottom: 20px;
  }


  @media screen and (max-width: 400px) {
    .progress-bar-container {
      width: 86vw
    }
  }

  .ord {
    color: rgb(111, 111, 111);
    font-weight: 400;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin: 4px;
    font-weight:500;
  }

  .progress-bar {
    position: relative;
    
    height: 12px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);

  }

  .progress {
    display: flex;
    width: var(--progress-width);
    height: 100%;
    background: rgb(112, 255, 96);
    border-radius: 15px;
  }

</style>
