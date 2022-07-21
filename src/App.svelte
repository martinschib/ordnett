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
  import Dropdown from "./lib/Dropdown.svelte";

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
        Alle spill fra Aftenposten
        <svg
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
    <UsedWords />
    <ProgressBarMobile />
    <CurrentWord />
    <Pattern />
    <Message />
    <Reset />
    <div style="margin-bottom: 50px;">
      <Remove />
      <Hint />
      <Check />
    </div>
  </div>
  <Dropdown title="Hvordan spiller jeg?">
    <div class="row-img">
      <img alt="Spillets regler" src="rule_1.svg" />
      <img alt="Spillets regler" src="rule_2.svg" />
    </div>

    <p><i>Regler:</i></p>
    <p>Let etter ord i ordnettet.</p>
    <p> Ordene må bestå av fire eller fler bokstaver.</p>
    <p>
      Ordet må legges i en bane som ikke krysser bokstaver du ikke vil bruke.
    </p>
    <p><i>Hjelp:</i></p>
    <ul>
      <li>Gjort feil? Bruk <b>fjern</b> knappen.</li>
      <li>Vil du ha hint? Trykk på "💡".</li>
    </ul>
  </Dropdown>

  <Dropdown title="Fasit på dagens ordnett">
    <p>Her har du alle ordene for dagens ordnett.</p>
    <ul class="list">
      {#each $game.solutions as word}
        <li>{word.toUpperCase()}</li>
      {/each}
    </ul>
  </Dropdown>
  <p>
    Har du en tilbakemelding? Send en en mail til <a
      href="mailto:martin.clementz@schibsted.com">oss</a
    >.
  </p>
</main>

<style type="scss">
  @font-face {
    font-family: Product;
    src: url("./assets/Produkt-Semibold.woff2") format("woff");
  }

  @font-face {
    font-family: Graphik light;
    src: url("./assets/Graphik.woff2") format("woff");
  }
  @font-face {
    font-family: Graphik;
    src: url("./assets/Graphik-Semibold.woff") format("woff");
  }

  :root {
    font-family: Graphik light;
  }

  h1,
  h3 {
    font-family: Product;
    letter-spacing: 1.1px;
  }

  .list {
    line-height: 26px;
  }

  .row-img {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 20px;
    img {
      width: 100%;
      
    }
  }

  h3 {
    font-size: 24px;
    font-weight: bolder;
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
      margin: 10px 10px 0px 10px;
      align-items: flex-end;

      .title {
        font-size: 32px;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 10px;
  }
  .howto {
    max-width: 500px;
    text-align: left;
  }

</style>
