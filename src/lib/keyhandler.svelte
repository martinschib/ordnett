<script lang="ts">
  import { calculateWordPoints, isValidWord } from "../api/api";
  import { retriveData, storeData } from "../api/localstorage";

  import { gameMessage } from "../stores/gameMessage";
  import { game } from "../stores/gameScore";

  import { ordnett } from "../stores/ordnett";
  import { pattern } from "../stores/pattern";
  import { word } from "../stores/word";

  export async function handleCheck() {
    if ($word.length <= 1) {
      gameMessage.newMessage("Trykk på bokstavene for å lage ord", "blue");
      return;
    }

    for (const letter of $word) {
      if (!$ordnett.includes(letter.letter)) {
        gameMessage.newMessage(
          "Ordet inneholder bokstaver som ikke er i nettet",
          "red"
        );
        return;
      }
    }

    if ($word.length <= 3) {
      gameMessage.newMessage("Ordet er for kort", "red");
      pattern.reset()
      word.reset()
      return;
    }

    let isValid = await isValidWord($word.map(v => v.letter).join("").toLowerCase());
    if (!isValid) {
      pattern.reset();
      word.reset();
      return;
    }

    game.update({
      myScore: $game.myScore + calculateWordPoints($word.map(v => v.letter).join("")),
      myWords: [$word.map(v => v.letter).join("").toLowerCase(), ...$game.myWords],
    });
    storeData("my_words", [
      $word.map(v => v.letter).join("").toLowerCase(),
      ...retriveData("my_words"),
    ]);

    gameMessage.newMessage(
      `Bra jobba +${calculateWordPoints($word.map(v => v.letter).join(""))} poeng!`,
      "green"
    );

    word.reset();
    pattern.reset();

    parent.postMessage(`numWords:${$game.myWords.length}`, "*");
  }

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());

  function getItemBetweenNextItem(item) {
    if ($pattern.length === 0) return [];

    let colTo = item.id % 3;
    let rowTo = Math.floor(item.id / 3);

    let colFrom = $pattern[$pattern.length - 1] % 3;
    let rowFrom = Math.floor($pattern[$pattern.length - 1] / 3);

    if (Math.abs(colFrom - colTo) === 1 || Math.abs(rowFrom - rowTo) === 1)
      return [];

    return [{ id: (item.id + $pattern[$pattern.length - 1]) / 2 }];
  }

  function handleKeydown(event) {
    // backspace
    if (event.keyCode == 8 && $word.length - 1 > -1) {
      if (isLetterInNett($word.map(v => v.letter)[$word.length - 1])) {
        pattern.removeLast();
        word.removeLast();

        if ($word.length > 0 && isLetterInNett($word.map(v=> v.letter)[$word.length - 1]) && $word.map(v=> !v.typed)[$word.length - 1]) {
          pattern.removeLast();
          word.removeLast();
        }
      } else {
        word.removeLast();
      }
    } else if (event.keyCode == 13) {
      handleCheck();
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.keyCode === 186 ||
      event.keyCode === 222 ||
      event.keyCode === 219
    ) {

      if (isLetterInNett(event.key) && $word.map(v => v.letter).filter(i => event.key.toUpperCase() === i).length  < 2) {
        let letterIndex = $ordnett.split("").indexOf(event.key.toUpperCase());

        if ($pattern.includes(letterIndex)) {
          if ($pattern[$pattern.length - 1] === letterIndex) {
            pattern.add(letterIndex);
            word.add({letter: $ordnett[letterIndex], typed: true});
          } 
        } else {
          getItemBetweenNextItem({ id: letterIndex }).forEach((newItem) => {
            if (letterIndex !== newItem.id && !$pattern.includes(newItem.id)) {
              pattern.add(newItem.id);
              word.add({letter: $ordnett[newItem.id], typed: false });
            }
          });
          pattern.add(letterIndex);
          word.add({letter: $ordnett[letterIndex], typed: true});
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
