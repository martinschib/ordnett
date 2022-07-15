<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import {
    game,
    gameScorePercentage1,
    gameTag,
    pointFunction,
  } from "../stores/gameScore";

  const progress = tweened($game.score, {
    duration: 400,
    easing: cubicOut,
  });

  game.subscribe((data) => {
    progress.set(data.score);
  });
</script>

<div class="progress-bar-container">
  <div name="text" class="subgoaltext">
    <p class="subgoal one">{pointFunction(0.15, $game.maxScore)}</p>
    <p class="subgoal two">{pointFunction(0.4, $game.maxScore)}</p>
    <p class="subgoal three">{pointFunction(0.6, $game.maxScore)}</p>
    <p class="subgoal four">{pointFunction(0.8, $game.maxScore)}</p>
  </div>
  <div class="progress-bar" style="--progress-width: {$gameScorePercentage1}%;">
    <span class="progress" style="background-color: {$gameTag.color};" />
    <span
      class="subgoal"
      style="top: 80%; display: {pointFunction(0.15, $game.maxScore) >
      $game.score
        ? 'block'
        : 'none'};"
    />
    <span
      class="subgoal"
      style="top: 57%; display: {pointFunction(0.4, $game.maxScore) >
      $game.score
        ? 'block'
        : 'none'};"
    />
    <span
      class="subgoal"
      style="top: 35%; display: {pointFunction(0.6, $game.maxScore) >
      $game.score
        ? 'block'
        : 'none'};"
    />
    <span
      class="subgoal"
      style="top: 15%; display: {pointFunction(0.8, $game.maxScore) >
      $game.score
        ? 'block'
        : 'none'};"
    />
    <span class="maxScore"><p>{$game.maxScore}</p></span>
  </div>
  {#if $gameScorePercentage1 > 15}
    <div class="grade" style="--progress: {$gameScorePercentage1 - 8}%;">
      <p class="title" style="background-color:{$gameTag.color} ;">
        {$gameTag.tag}
      </p>
    </div>
  {/if}

  <p class="points">{$game.score} av {$game.maxScore} poeng!</p>
</div>

<style type="scss">
  .progress-bar-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .points {
      font-weight: 600;
      font-size: 14px;
    }

    .subgoaltext {
      .subgoal {
        position: absolute;
        left: 12px;

        font-size: 15px;
        color: grey;
        &.one {
          top: 69%;
        }
        &.two {
          top: 48%;
        }
        &.three {
          top: 28%;
        }
        &.four {
          top: 10%;
        }
      }
    }
    .grade {
      bottom: var(--progress);
      position: absolute;
      left: 55px;
      .title {
        background-color: #b4da55;
        padding: 5px 30px 5px 20px;
        border-radius: 5px;
        font-weight: 600;
        font-family: Product;
        letter-spacing: 1.5px;
        font-size: 20px;
        white-space: nowrap;
      }
    }
  }
  .progress-bar {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 12px;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);

    .subgoal {
      position: absolute;
      left: -40%;
      height: 22px;
      width: 22px;
      background-color: rgb(240, 240, 240);
      border-radius: 25px;
    }
    .maxScore {
      position: absolute;
      border-radius: 25px;
      top: -40px;
      left: -18px;
      width: 45px;
      height: 45px;
      font-weight: bold;
      background-color: rgb(240, 240, 240);
      border: 2px solid white;

      p {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
      }
    }
    .progress {
      display: flex;
      width: 12px;
      height: var(--progress-width);
      background: #b4da55;
      border-radius: 15px;
    }
  }
</style>
