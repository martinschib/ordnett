<script lang="ts">
  
  import Check from "./lib/check.svelte";
  import CurrentWord from "./lib/CurrentWord.svelte";
  import Pattern from "./lib/Pattern.svelte";
  import ProgressBarMobile from "./lib/ProgressBarMobile.svelte";
  import Remove from "./lib/Remove.svelte";
  import Reset from "./lib/Reset.svelte";
  import Message from "./lib/message.svelte";

  import { getMaxPoints, retriveStartUpData } from "./api/api";
  import { game } from "./stores/gameScore";
  import { ordnett } from "./stores/ordnett";
  import { gameMessage } from "./stores/gameMessage";
  import UsedWords from "./lib/UsedWords.svelte";
  import ProgressBarPc from "./lib/ProgressBarPC.svelte";
  import Hint from "./lib/buttons/hint.svelte";
  import Keyhandler from "./lib/keyhandler.svelte";

  (async function () {
    const data = await retriveStartUpData();
    if (!data) {
      gameMessage.newMessage("Obs! Noe gikk galt..", "red");
      return null;
    }

    game.update({
      words: data.myWords,
      maxWords: data.maxWords,
      score: getMaxPoints(data.myWords),
      maxScore: data.maxScore,
      solutions: data.solutions,
    });

    ordnett.set(data.wordnett.toUpperCase());
    return;
  })();
</script>

<svelte:head>

  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
    type="text/css"
  />
</svelte:head>
<main>
  <Keyhandler />
  <div class="header">
    <h1 class="title" style="margin: 0;">Ordnettet</h1>
    <a style="text-decoration: none" href="https://www.aftenposten.no/spill">
      <p>
        Alle spill fra Aftenposten <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00065 0.333008L5.82565 1.50801L10.4756 6.16634H0.333984V7.83301H10.4756L5.82565 12.4913L7.00065 13.6663L13.6673 6.99967L7.00065 0.333008Z"
            fill="#7F80E9"
          />
        </svg>
      </p>
    </a>
  </div>
  <div name="content" class="content">
    <div style="display: flex; flex-direction:column; grid-area: pattern;">
      <span class="progressMobile">
        <ProgressBarMobile />
        <CurrentWord />
      </span>
      <Pattern />
      <Reset />
      <Message />
    </div>
    <span class="progressPc" style="grid-area: progress;">
      <ProgressBarPc />
    </span>
    <div class="words" style="grid-area: words;">
      <div>
        <span class="currentWordPC">
          <CurrentWord />
        </span>
        <div>
          <Remove />
          <Hint />
          <Check />
        </div>
      </div>
      <UsedWords />
    </div>
    <div name="howto" class="howto" style="grid-area: rules;">
      <h3>Hvordan spiller jeg?</h3>
      <img alt="Spillets regler" class="image" src="rule_1.png" />
      <img alt="Spillets regler" class="image" src="rule_2.png" />
      <h3>Finn så mange ord du klarer i ordnettet!</h3>
      <p>Let etter ord i ordnettet.</p>
      <p>En bokstav i nettet kan kun brukes en gang.</p>
      <p>Ordene må bestå av fire eller fler bokstaver.</p>
      <p>Ordet må legges i en bane som ikke krysser bokstaver du ikke vil bruke.</p>
      <h3>TIPS:</h3>
      <ul>
        <li>Gjort feil? Bruk <b>fjern</b> knappen.</li>
        <li>Vil du ha hint? Trykk på "💡".</li>
      </ul>

      <p>Har du en tilbakemelding? Send en en mail til <a href="mailto:martin.clementz@schibsted.com">oss</a>.</p>
    </div>
  </div>
</main>

<style type="scss">
  @font-face {
    font-family: Product;
    src: url("./assets/ProduktXXCond-Semibold.woff2") format("woff");
  }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  h1,
  h3 {
    font-family: Product;
    letter-spacing: 1.2px;
  }
  h3 {
    font-size: 32px;
  }
  main {
    text-align: center;
    margin: 0 auto;
    padding: 20px;
    max-width: 1000px;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 3px solid rgb(193, 193, 193);
      padding: 10;
      margin: 30px 10px 15px 10px;

      .title {
        font-size: 45px;
      }
    }
  }

  .content {
    display: grid;
    grid-template-areas:
      "pattern progress words"
      "rules rules words";
    justify-content: space-around;
    padding: 50px 0px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 900px) {
      grid-template-areas:
        "pattern progress"
        "words words"
        "rules rules";
    }

    @media screen and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0px;
    }

    .progressPc {
      display: flex;
      @media screen and (max-width: 600px) {
        display: none;
      }
    }

    .progressMobile {
      display: none;
      margin-bottom: 20px;
      @media screen and (max-width: 600px) {
        display: block;
      }
    }

    .words {
      display: flex;
      flex-direction: column;

      .currentWordPC {
        @media screen and (max-width: 600px) {
          display: none;
        }
      }
    }
  }
  .howto {
    max-width: 500px;
    text-align: left;

    .image {
      height: 150px;
    }
  }
</style>
