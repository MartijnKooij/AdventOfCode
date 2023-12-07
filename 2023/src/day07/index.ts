import run from "aocrunner";
import * as fs from 'fs';

const parseInput = (rawInput: string) => rawInput.split('\n');
const handValues: { [key: string]: number } = {
  'Five of a kind': 7,
  'Four of a kind': 6,
  'Full house': 5,
  'Three of a kind': 4,
  'Two pair': 3,
  'One pair': 2,
  'High card': 1
};
const cardRanks: { [key: string]: number } = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  'J': 1
};
type Hand = {
  card: string;
  bid: number;
  type: string;
  points: number;
}

const part1 = (rawInput: string) => {
  let hands = parseInput(rawInput).map(l => l.split(' ')).map(v => ({ card: v[0], bid: Number(v[1]), type: classifyHandPart1(v[0]), points: 0 } as Hand));

  hands.forEach(hand => {
    hand.points = handValues[hand.type];
  });

  hands = sortHands(hands);
  console.log('hands', hands);

  let points = 0;
  for (let p = hands.length - 1; p >= 0; p--) {
    const hand = hands[p];
    points += (hands.length - p) * hand.bid;
    // console.log('point', hands.length - p, hand.bid);
  }

  return points;
};

const part2 = (rawInput: string) => {
  let hands = parseInput(rawInput).map(l => l.split(' ')).map(v => ({ card: v[0], bid: Number(v[1]), type: classifyHandPart2(v[0]), points: 0 } as Hand));

  // fs.writeFileSync('./dump.txt', hands.map(h => h.card).join('\n'));
  hands.forEach(hand => {
    hand.points = handValues[hand.type];
  });

  hands = sortHands(hands);
  console.log('hands', hands);

  let points = 0;
  for (let p = hands.length - 1; p >= 0; p--) {
    const hand = hands[p];
    points += (hands.length - p) * hand.bid;
    // console.log('point', hands.length - p, hand.bid);
  }

  return points;
};

function classifyHandPart1(hand: string): string {
  const counts = new Map<string, number>();
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    counts.set(card, (counts.get(card) || 0) + 1);
  }
  const frequencies = Array.from(counts.values()).sort((a, b) => b - a);
  switch (frequencies.join(',')) {
    case '5':
      return 'Five of a kind';
    case '4,1':
      return 'Four of a kind';
    case '3,2':
      return 'Full house';
    case '3,1,1':
      return 'Three of a kind';
    case '2,2,1':
      return 'Two pair';
    case '2,1,1,1':
      return 'One pair';
    case '1,1,1,1,1':
      return 'High card';
    default:
      return 'Invalid hand';
  }
}

function classifyHandPart2(hand: string): string {
  const counts = new Map<string, number>();
  let jCount = 0;
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (card === 'J') {
      jCount++;
    } else {
      counts.set(card, (counts.get(card) || 0) + 1);
    }
  }

  // If there are 'J' cards, distribute them in the best possible way
  let limit = 0;
  while (jCount > 0) {
    let maxCount = Math.max(...counts.values());
    if (maxCount < 4) {
      // Add 'J' to the group with the most cards
      for (let [card, count] of counts.entries()) {
        if (count === maxCount) {
          counts.set(card, count + 1);
          jCount--;
          break;
        }
      }
    } else {
      // All groups have 4 cards, add 'J' as a separate group
      counts.set('J', (counts.get('J') || 0) + 1);
      jCount--;
    }
    limit++;
    if (limit > 1000) {
      break;
    }
  }

  const frequencies = Array.from(counts.values()).sort((a, b) => b - a);
  switch (frequencies.join(',')) {
    case '5':
      return 'Five of a kind';
    case '4,1':
      return 'Four of a kind';
    case '3,2':
      return 'Full house';
    case '3,1,1':
      return 'Three of a kind';
    case '2,2,1':
      return 'Two pair';
    case '2,1,1,1':
      return 'One pair';
    case '1,1,1,1,1':
      return 'High card';
    default:
      return 'Invalid hand';
  }
}


function sortHands(hands: Hand[]): Hand[] {
  return hands.sort((a, b) => {
    // Compare based on hand type
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    // If hand types are the same, compare based on card ranks
    for (let i = 0; i < a.card.length; i++) {
      const rankA = cardRanks[a.card[i]];
      const rankB = cardRanks[b.card[i]];
      if (rankA !== rankB) {
        return rankB - rankA;
      }
    }

    // If all cards have the same rank, the hands are equal
    return 0;
  });
}

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
