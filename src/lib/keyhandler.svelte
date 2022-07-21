<script lang="ts">
  import { calculateWordPoints, isValidWord } from "../api/api";
  import { retriveData, storeData } from "../api/localstorage";

  import { gameMessage } from "../stores/gameMessage";
  import { game } from "../stores/gameScore";

  import { ordnett } from "../stores/ordnett";
  import { pattern } from "../stores/pattern";
  import { newWord, word } from "../stores/word";

  export async function handleCheck() {
    if ($newWord.length <= 1) {
      gameMessage.newMessage("Trykk på bokstavene for å lage ord", "blue");
      return;
    }

    for (const letter of $newWord) {
      if (!$ordnett.includes(letter.letter)) {
        gameMessage.newMessage(
          "Ordet inneholder bokstaver som ikke er i nettet",
          "red"
        );
        return;
      }
    }

    if ($newWord.length <= 3) {
      gameMessage.newMessage("Ordet er for kort", "red");
      return;
    }

    let isValid = await isValidWord($newWord.map(v => v.letter).join("").toLowerCase());
    if (!isValid) {
      pattern.reset();
      newWord.reset();
      return;
    }

    game.update({
      score: $game.score + calculateWordPoints($newWord.map(v => v.letter).join("")),
      words: [$newWord.map(v => v.letter).join("").toLowerCase(), ...$game.words],
    });
    storeData("my_words", [
      $newWord.map(v => v.letter).join("").toLowerCase(),
      ...retriveData("my_words"),
    ]);

    gameMessage.newMessage(
      `Bra jobba +${calculateWordPoints($newWord.map(v => v.letter).join(""))} poeng!`,
      "green"
    );

    newWord.reset();
    pattern.reset();

    parent.postMessage(`numWords:${$game.words.length}`, "*");
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
    if (event.keyCode == 8 && $newWord.length - 1 > -1) {
      if (isLetterInNett($newWord.map(v => v.letter)[$newWord.length - 1])) {
        pattern.removeLast();
        newWord.removeLast();

        if ($newWord.length > 0 && isLetterInNett($newWord.map(v=> v.letter)[$newWord.length - 1]) && $newWord.map(v=> !v.typed)[$newWord.length - 1]) {
          pattern.removeLast();
          newWord.removeLast();
        }
      } else {
        newWord.removeLast();
      }
    } else if (event.keyCode == 13) {
      handleCheck();
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.keyCode === 186 ||
      event.keyCode === 222 ||
      event.keyCode === 219
    ) {

      if (isLetterInNett(event.key) && $newWord.map(v => v.letter).filter(i => event.key.toUpperCase() === i).length  < 2) {
        let letterIndex = $ordnett.split("").indexOf(event.key.toUpperCase());

        if ($pattern.includes(letterIndex)) {
          if ($pattern[$pattern.length - 1] === letterIndex) {
            pattern.add(letterIndex);
            newWord.add({letter: $ordnett[letterIndex], typed: true});
          } 
        } else {
          getItemBetweenNextItem({ id: letterIndex }).forEach((newItem) => {
            if (letterIndex !== newItem.id && !$pattern.includes(newItem.id)) {
              pattern.add(newItem.id);
              newWord.add({letter: $ordnett[newItem.id], typed: false });
            }
          });
          pattern.add(letterIndex);
          newWord.add({letter: $ordnett[letterIndex], typed: true});
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
