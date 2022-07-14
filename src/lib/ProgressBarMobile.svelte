<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { game, gameScorePercentage, gameScorePercentageReal, gameTag } from "../stores/gameScore";

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
    <p class="subgoal one">{Math.round(($game.maxScore / 100) * 15)}</p>
    <p class="subgoal two">{Math.round(($game.maxScore / 100) * 40)}</p>
    <p class="subgoal three">{Math.round(($game.maxScore / 100) * 57)}</p>
    <p class="subgoal four">{Math.round(($game.maxScore / 100) * 80)}</p>
  </div>
  <div class="progress-bar" style="--progress-width: {$gameScorePercentageReal}%;">
    <span class="progress" style="background-color: {$gameTag.color};" />
    <span class="subgoal one" style="left: 15%; display: {15 > $gameScorePercentageReal ? "block": "none"};" />
    <span class="subgoal two" style="left: 35%; display: {35 > $gameScorePercentageReal ? "block": "none"};" />
    <span class="subgoal three" style="left: 57%; display: {57 > $gameScorePercentageReal ? "block": "none"};" />
    <span class="subgoal four" style="left: 80%; display: {80 > $gameScorePercentageReal ? "block": "none"};" />
    <span class="maxScore"><p>{$game.maxScore}</p></span>
  </div>


</div>

<style type="scss">
 
  .progress-bar-container {

    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    padding-top: 12px;
    margin-top: 20px;

    .subgoaltext {
      padding: 10px;
      .subgoal {
        position: absolute;
        top: -36%;
        font-size: 15px;
        color: grey;
        &.one {
          left: 14%;
        }
        &.two {
          left: 31%;
        }
        &.three {
          left: 50%;
        }
        &.four {
          left: 69%;
        }
      }
    }

  }
  .progress-bar {
    position: relative;
    height: 12px;
    width: 87%;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);

    .subgoal {
      position: absolute;
      top: -50%;
      height: 22px;
      width: 22px;
      background-color: rgb(240, 240, 240);
      border-radius: 25px;
      &.one {
        left: 15%;
      }
      &.two {
        left: 35%;
      }
      &.three {
        left: 57%;
      }
      &.four {
        left: 80%;
      }
    }
  }

  .maxScore {
    position: absolute;
    border-radius: 25px;
    transform: translate(40px, -32px);
    right: 0;
    width: 45px;
    height: 45px;
    font-weight: bold;
    background-color: rgb(240, 240, 240);
    border: 2px solid white;
  }
  .maxScore p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
  .progress {
    display: flex;
    width: var(--progress-width);
    height: 100%;
    background: #b4da55;
    border-radius: 15px;

  }
</style>
