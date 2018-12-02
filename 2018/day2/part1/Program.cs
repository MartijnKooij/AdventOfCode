using System;
using System.Collections.Generic;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputs = new List<string> { "bvhfawknyoqsudzrpgslecmtkj", "bpufawcnyoqxldzrpgsleimtkj", "bvhfawcnyoqxqdzrplsleimtkf", "bvhoagcnyoqxudzrpgsleixtkj", "bxvfgwcnyoqxudzrpgsleimtkj", "bvqfawcngoqxudzrpgsleiktkj", "bvhfawcnmoqxuyzrpgsleimtkp", "bvheawcnyomxsdzrpgsleimtkj", "bcdfawcnyoqxudzrpgsyeimtkj", "bvhpawcnyoqxudzrpgsteimtkz", "bxhfawcnyozxudzrpgsleimtoj", "bvhfdwcnyozxudzrposleimtkj", "bvpfawcnyotxudzrpgsleimtkq", "bvhfpwccyoqxudzrpgslkimtkj", "bvhfawcnyoqxudirpgsreimtsj", "bvhfawcnyoqxudzppgbleemtkj", "bvhzawcnyoqxudqrpgslvimtkj", "bvhfawclyoqxudirpgsleimtka", "bvhgawfnyoqxudzrpguleimtkj", "bvhfazcnytqxudzrpgslvimtkj", "bvhfawcnygxxudzrpgjleimtkj", "bxhfawcnyoqxudzipgsleimtxj", "bvhptwcnyoqxudzrpgsleimtmj", "bzhfawcgyooxudzrpgsleimtkj", "bvhjlwcnyokxudzrpgsleimtkj", "bvhfawcnyoqxudbrmgslesmtkj", "bvhfawcnysixudzwpgsleimtkj", "bvhflwcnymqxxdzrpgsleimtkj", "bvifawcnyoyxudzrpgsleimtvj", "bvhfawcnyofxudlrpgsheimtkj", "bvhbawcmyoqxudzrpggleimtkj", "bhhxgwcnyoqxudzrpgsleimtkj", "bvhfawgnyoqxbdzrpgsleimfkj", "bvhfawcnyoqxudcrngsleimykj", "bvhfawcnyofxudzrpgslebgtkj", "bvhfaocnybqxudzapgsleimtkj", "bvhxawcnyodxudzrpfsleimtkj", "bchfawcnyoqxudrrtgsleimtkj", "bvhfawcqyoqxudzdpgsltimtkj", "bvhfawknyoqxudzrpnsleimtbj", "cihfawcnyoqxudirpgsleimtkj", "bvlfawpnyoqxudzrpgslgimtkj", "bulfawcnyoqbudzrpgsleimtkj", "bvhfajcnyoqkudzrpgsoeimtkj", "bvhrakcnyoqxudzrpgsleimjkj", "bvbftwcnyoqxuvzrpgsleimtkj", "bvhfhwcnyoqxudzrpgslelmtbj", "bvhyawcntoqxudzrpgsleimtuj", "xvhuawcnyoqxuqzrpgsleimtkj", "pvhfawcnyoqxudzdpglleimtkj", "bvhfawsnyoqxudzrpgvlefmtkj", "bvhfawcnyoqxudzrpgepeiwtkj", "bvhfawcnyoqxudzrphsleittkr", "dvhfawcnyoqxudzrpkslzimtkj", "bvhfawpnyoqxudzrpgmlcimtkj", "bvhsawcnyzqxudzrpgsaeimtkj", "bdhfawcnyoqxudzrpasleiwtkj", "bvhfawbnyoqxpdbrpgsleimtkj", "mvhfawwnyoqxujzrpgsleimtkj", "bvafawcnyoyxudzrpgsleidtkj", "bvhyawcnyoqxudztpgzleimtkj", "besfawcnyoqxudzrpgsleimdkj", "bvhfawcnyoqxudrrpgsjeimjkj", "xvhfkwcnyoqxudzcpgsleimtkj", "bvhfawcnyeqdudzrpgzleimtkj", "bvhfuwcnybqxudzrpgsleimttj", "lvhfawcnyoqhudzdpgsleimtkj", "bvhfawcnyoqxudzrpgslevwtnj", "bvhfadcnzoqxxdzrpgsleimtkj", "bvsfawcnyoqxpdzrpgileimtkj", "bzhfaycnyoqxudzrpgsxeimtkj", "bwhfdwcnyoqxudzrpgsleimtkz", "bvhfawcnyoqxudzrpgsjlimtkm", "bvhfawcnyoqxudsrwgsleimtlj", "bbhfalynyoqxudzrpgsleimtkj", "bvhfawcnyeqxudzrpglleimtkr", "bvhfawnnboqxurzrpgsleimtkj", "yvhfawcnyoqxudzrpgslzimtpj", "bvhfjwcnyoqxqdxrpgsleimtkj", "bthfawcnyoqfudzrpgslhimtkj", "bvhfawchuoqxudzqpgsleimtkj", "bvhfawcndoqxudzrugsleimrkj", "bvhfawcnnoqxjdzrpgsleidtkj", "bvhpawcnyoqkudzrpgsleimtzj", "bvhfaiinyoqxudzopgsleimtkj", "bvhfawcnyxqxuizrigsleimtkj", "bvnfawcnyoqxudzqpgsleimbkj", "bvnfawcnyoeyudzrpgsleimtkj", "bvhfawcnyoqxudarpgsieimtoj", "bthcawcnyoqxudlrpgsleimtkj", "bvhfnwcnyozxudzrpgsleomtkj", "bpwfawcnyoqxudzrpgskeimtkj", "bvhfapcnyoqxudnrpgsxeimtkj", "bvhfdwcnyoqxubzrxgsleimtkj", "fvhfawcnyoqxjdzrpgsleirtkj", "bvhfawcneoqxudzrvzsleimtkj", "bvhaawcnyoqxudzrpgsleimtex", "bvhfawcnyojxudvrpgsleimckj", "bvlfawcnyoqxddzrpgsleimtko", "bvhfawclfoqxudzrpgsleiktkj", "bvhfawciyobxudzrpgkleimtkj", "bvhfpwcnyoqxudzrpgsqeimtkd", "bvhyawcnyyqxudzrkgsleimtkj", "bvhfawcncoqxudzrphsaeimtkj", "bvhfawmnyoqxudzrpgifeimtkj", "bvhfawcjyoqxudzjpgszeimtkj", "bohfawcnwoqxudzrpgsleimwkj", "bvhfaucnyoqxudzrpgfluimtkj", "bvhfawlnyoqgudzrpgwleimtkj", "bmhfawcnyoqxndzrpgsleymtkj", "bvhfawcngoqxudzrpzxleimtkj", "bihfawcnyoqxudrrpgsleimokj", "lvhfawcnylqxudzrpgsleintkj", "bvhfawcnyoqvugzrqgsleimtkj", "bvhfawcnyoqxudzgpgslqimtij", "bvhfawcnyoqludzrpgslnimtcj", "hvhfawcnyolxudzrpgsmeimtkj", "nvhfawcdkoqxudzrpgsleimtkj", "bvhfawcnyoqxkdzrggsneimtkj", "bvhfawnnyoqxudzrpgqleibtkj", "bvhfawyuyoqxudzrhgsleimtkj", "wvhfbwcnyoqxtdzrpgsleimtkj", "bvhfawcnyoqxedzzpgoleimtkj", "bvhfawcnioqxunzrpgsleimtnj", "bvhfawctyoqxudzrpgsldkmtkj", "bvhfawcnyonxudzrpgsleitpkj", "bvefawcnyoqaudzhpgsleimtkj", "bvhfawcnyxqxudzrpgslelmbkj", "bvhfamrnyoqxudzrpgsleimgkj", "bvhfaqcnyoqxudzrpgsaeimekj", "bvhfawcnyoqcidzrpgsleimvkj", "bvhfawcnnorxudzrpgsmeimtkj", "bvroawcnyoqxudzrpgsleiwtkj", "bvhfwwcnyoqxudzrpaslewmtkj", "bvsfawcnyoqxudzcpgszeimtkj", "bkhfmwcnyoqjudzrpgsleimtkj", "bvtfawcnyoqxudzrcgslecmtkj", "bvhfawcnypzxudzrpgsleimtkv", "bvhfawcnyoqzudzrfgtleimtkj", "bvhpawcnyoqxudhrpgsleimtko", "tvhfawcnyoqxudzxpfsleimtkj", "bvhfawccyofxudzrpqsleimtkj", "bvnfawtnyoqxuzzrpgsleimtkj", "bvhfamcnuwqxudzrpgsleimtkj", "bvhfawcfyoqxudjrpgsleimrkj", "bvhpalcnyoqxudzrpgslexmtkj", "bvhfawcnjsqxudzlpgsleimtkj", "bvhfafcnioqxydzrpgsleimtkj", "bvzfawcnyxqxudzgpgsleimtkj", "bvhzawcnyoqxudzrpgslewctkj", "bvhiawcnhoqrudzrpgsleimtkj", "bvhfawcnyoqxuszrggslenmtkj", "bvhfowcnyoqxudzrptseeimtkj", "behfawfnyoqxudzrpgsleimlkj", "lvhfawcnyoqxudsrpgvleimtkj", "bvhfawnnyaqxudzrpgsqeimtkj", "lvhfawcnfoqxvdzrpgsleimtkj", "svhxawcnyoqxudzrpqsleimtkj", "bvhfawqnfoqxudzrpgsleimkkj", "bvhfafcnyoqcudzrpgsleimtcj", "bvhfyfcntoqxudzrpgsleimtkj", "bvhfpwcnyoqxudzrpgsleimumj", "bvhfawccyoqxudzrqgrleimtkj", "bvhfawqnyoqxudzbpgsleimkkj", "bvhflwcnyoqxudzrpxsleemtkj", "bvhfawcnyoqxuezrpgslehrtkj", "bvhfawceyoqxudzrpgsleimswj", "bvhfawcncohgudzrpgsleimtkj", "bahfawcnyoqxgdzrpgsleamtkj", "yvhfawcnyoqxudzrppslrimtkj", "fvhfawcmyoqxudzrpgskeimtkj", "bvylawsnyoqxudzrpgsleimtkj", "bvhfswcnyyqxedzrpgsleimtkj", "fvrfawcnyoqxudzrpgzleimtkj", "bvhfawcnyoqxuvzrpgslermtks", "bvhkawccyoqxudzcpgsleimtkj", "bvhfaobnyoqxudzrprsleimtkj", "bvbfawcnyoqxudirpgsleimhkj", "bvhfawcnyoqxudzvpgsueimtgj", "bvhxawcnyoqxudzrpgsleimtgi", "svhfawcjyoqxuszrpgsleimtkj", "bvnfawcnyoeyudzrpgsldimtkj", "bvhfawcnyoqxuhzrpgsleimcki", "bvhfvwcnyoqxudzizgsleimtkj", "bvhfapznyohxudzrpgsleimtkj", "bvhfaelnyosxudzrpgsleimtkj", "xvhfawcnmoqxuhzrpgsleimtkj", "bjhfawcnyaqxutzrpgsleimtkj", "bvhfawcnyohxudzrpgslgnmtkj", "bvhfawcnyoqxudzrppsreimtkx", "fvhfapcnyoqyudzrpgsleimtkj", "qvhfafcnyoqxudorpgsleimtkj", "bvhfawcnyoqxedzrwgsleimtvj", "bvhfawgnyoqxudzupgqleimtkj", "bvhfowctyoqxudzrpgbleimtkj", "bvhwawcnyoqxudzapgslvimtkj", "bvhfadcnyoqxudzrugsleimtuj", "bvhfawcnyosxudzlpgsleamtkj", "bvhfawcnywqxuqzrpgsloimtkj", "bvhfawcnyoqxumzrpgvlfimtkj", "bvhfawcgyoqxbdzrpgsleomtkj", "bvhfahcnyoqwudzrfgsleimtkj", "gvbfawcnyrqxudzrpgsleimtkj", "svhfawcnyoqxudlrpgsleimtkx", "avhfafcnyoqxuhzrpgsleimtkj", "bvhfawcsyoqxuazrpgsleimtej", "bvofawcnyoqxudzrpgsteimtkf", "bvhfajcnyoqxudzqpgszeimtkj", "bvhfawcsyoqxudzrmgsleiktkj", "mvhfawcnyoqxudzrpgkluimtkj", "bvhfawcnhoqxudzrpgslwhmtkj", "bmhaawsnyoqxudzrpgsleimtkj", "bvhfawcnyoqxudzhpgsleimhyj", "bvhfxwcnyoqxsdzypgsleimtkj", "bvhpawcyyoqxuczrpgsleimtkj", "bvomawcnyovxudzrpgsleimtkj", "bvhfawcnjvqxudzrpgsleimtkt", "nvhfawcnyqqxudzrpgsleittkj", "bvhiawcnyzqxudzrpysleimtkj", "bvhdawcnyoqxukzrpgsleimtuj", "bvhfawcnyyxxudzrpgslzimtkj", "hvhfawcnyoqxudzupgslemmtkj", "byhfawknyoqxudzrpgsleimtkb", "bvhfawcnyoqxudzrpasleihakj", "bvafahcnyaqxudzrpgsleimtkj", "bkhfawcnyoqxudzrpgllepmtkj", "bghfawcnycqxuzzrpgsleimtkj", "bvhfawcnyoqxudzrbgeleimtkl", "bvhfascnyoqgudzrpgsveimtkj", "bvhfawnnyoqxudzrpgsleimtdl", "bvhqawcnyoqxudzrpgsleimgrj", "bvhsawdwyoqxudzrpgsleimtkj", "bvhfawcnyoqxudzrpgaleipttj", "bvhfawcnrlqxudzrbgsleimtkj", "bvhfdwcnyoqxudzqpcsleimtkj", "bvhfawcnyoqxudzopgslexmokj", "bvhfawcoyoqxudzrpghlewmtkj", "bvhfozcnykqxudzrpgsleimtkj", "bvhfawcnyoqxuvzrpgslrimtkr", "bvhfrncnyoqrudzrpgsleimtkj", "bvhfawcnyocxuizrpgslefmtkj", "bvhfawywyoqxudzrpgsleimxkj", "bvhfawcnyoqxugzrpgslrimtij", "bvtfawcnyoqxudzcpgsleimtfj", "bvhfawcnyoqxuzzspgsleimtkz", "bvhfawcnzoqxvdzrpgslsimtkj", "bvhfzwcnyoqxudzrpgslenmhkj", "bvhfkccnyoqxudzrpgzleimtkj", "bvhfawcnyoqzudzrpgslhimwkj", "bzhfawvnyooxudzrpgsleimtkj" };

            var setsOfTwoCount = 0;
            var setsOfThreeCount = 0;

            foreach (var input in inputs)
            {
                GetCountsForInput(input, ref setsOfTwoCount, ref setsOfThreeCount);
            }

            Console.WriteLine($"The answer is {setsOfTwoCount} * {setsOfThreeCount} = {setsOfTwoCount * setsOfThreeCount}");
        }

        private static void GetCountsForInput(string input, ref int setsOfTwoCount, ref int setsOfThreeCount)
        {
            var hasCountedTwo = false;
            var hasCountedThree = false;

            foreach (var character in input.Distinct())
            {
                var characterCount = input.Count(x => x == character);

                if (characterCount == 2)
                {
                    if (hasCountedTwo)
                    {
                        continue;
                    }
                    setsOfTwoCount++;
                    hasCountedTwo = true;
                }

                if (characterCount == 3)
                {
                    if (hasCountedThree)
                    {
                        continue;
                    }
                    setsOfThreeCount++;
                    hasCountedThree = true;
                }
            }
        }
    }
}
