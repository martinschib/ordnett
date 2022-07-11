<script lang="ts">
  import Check from "./lib/check.svelte";
  import CurrentWord from "./lib/CurrentWord.svelte";
  import Pattern from "./lib/Pattern.svelte";
  import Placement from "./lib/placement.svelte";
  import ProgressBar from "./lib/ProgressBar.svelte";
  import Remove from "./lib/Remove.svelte";
  import Reset from "./lib/Reset.svelte";
  import Share from "./lib/Share.svelte";
  import Test from "./lib/Test.svelte";
  import Message from "./lib/message.svelte";

  import { getStartUpData } from "./api/api";
  import { game } from "./stores/gameScore";
  import { ordnett } from "./stores/ordnett";
  import { gameMessage } from "./stores/gameMessage";
import UsedWords from "./lib/UsedWords.svelte";

  (async function () {
    let startUpdata = await getStartUpData();

    if (!startUpdata) {
      return;
    }

    ordnett.set(startUpdata.ordnett.toUpperCase());

    if (!startUpdata.score) {
      game.update({
        maxWords: startUpdata.max_solutions,
        maxScore: startUpdata.max_points,
        leaderboard: startUpdata.leaderBoard,
        numPlayers: startUpdata.num_players,
      });
      return;
    }
    game.update({
      score: startUpdata.score,
      words: startUpdata.submitted_words,
      maxWords: startUpdata.max_solutions,
      maxScore: startUpdata.max_points,
      leaderboard: startUpdata.leaderBoard,
      numPlayers: startUpdata.num_players,
    });
    gameMessage.newMessage(startUpdata.message, "blue");
    return;
  })();
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
    type="text/css"
  />
</svelte:head>
<main>
  <h1 style="margin: 0;">Ordnettet</h1>

  <div>
    <ProgressBar />
    <Message />
    <CurrentWord />
  </div>
  <Test />
  <Pattern />
  <div>
    <Remove />
    <Reset />
    <Check />
  </div>
  <div>
    <Placement />
    <UsedWords />
    <Share />
  </div>
  <div class="info">
    <h3>🕹 Spill med venner</h3>
    <p>
      Klarer noen å slå rekorden din? Kopier lenken til spillet og send dem en
      utfordring. <a href="#">#ordnett</a>
    </p>
    <h3>ℹ️ Ordnettet</h3>
    <p>
      Ordnettet er et helt nytt spill laget av Aftenposten. Har du inspill eller
      tilbakemeldinger på spillet, send gjerne en mail til <a
        href="mailto:martin.clementz@schibsted.com">oss</a
      >! 📬
    </p>
    <p>Info</p>
    <ul>
      <li>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >Spillets regler
        </a>
      </li>
      <li>
        Problemer med dagens ordnett? <br />Send mail eller bruk emneknaggen
        #ordnett på sosiale medier. 📣
      </li>
    </ul>
    <h3>📣 Nytt</h3>
    <p>
      Ordnettet er helt nytt! Vi jobber stadig med forbedringer.
    </p>
  </div>
  <br />
  <br />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f6;
  }

  .info {
    line-height: 26px;
    text-align: left;
    max-width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
